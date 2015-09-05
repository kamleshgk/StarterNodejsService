/**
 * @fileoverview The Gulp file.
 * Provides tasks to run jobs on the codebase.
 * Usage:
 *   'gulp [task]'
 *
 * Available tasks:
 *   gulp
 *   gulp docs
 *   gulp test
 */
var gulp = require('gulp');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown');
var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var tap = require('gulp-tap');
var shell = require('gulp-shell');


var srcFilePaths = [];
var customTags = [
  'requires', 'module', 'api', 'apiName', 'apiGroup', 'apiExample',
  'apiParam', 'apiSuccess', 'apiSuccessExample', 'apiDefine', 'apiUse',
  'apiError'];


/**
 * Converts the outputted js doc documentation to markdown.
 * Documentation:
 *   https://www.npmjs.com/package/gulp-jsdoc-to-markdown
 * @return {function()}
 */
function docsTask() {
  return gulp.src('/server/**/*.js')
      .pipe(gulpJsdoc2md())
      .on('error', function(err) {
        gutil.log('jsdoc2md failed: ', err.message);
      })
      .pipe(gulp.dest('test.md'));
}


/**
 * Generates a list of files from a glob object.
 * @return {function()}
 */
function prepareFileListTask() {
  return gulp.src([
    '!apidoc/**', '!test/**', '!node_modules', '!node_modules/**', './**/*.js',
    '*.js'
  ],
  { read: false }).pipe(tap(function(file) {
    srcFilePaths.push(file.path);
  }));
}


/**
 * Runs the test suite matching the glob pattern *_test.js.
 * Does not run the coverage report.
 */
function testsWithoutCoverageTask() {
  gulp.src([
    '!apidoc/**', '!node_modules', '!node_modules/**', './**/*_test.js'],
  { read: false })
      .pipe(mocha({ reporter: 'nyan' }))
      .once('error', function() {
        process.exit(1);
      })
      .once('end', function() {
        process.exit();
      });
}


/**
 * Runs the test suite matching the glob pattern *_test.js.
 * Runs the coverage report from istanbul.
 */
function testsTask() {
  gulp.src([
    '!apidoc/**', '!node_modules', '!node_modules/**', '!./**/*_test.js',
    './**/*.js'
  ])
      .pipe(istanbul())
      .pipe(istanbul.hookRequire())
      .on('finish', function() {
        gulp.src(['!node_modules', '!node_modules/**', './**/*_test.js'])
            .pipe(mocha({ reporter: 'nyan'}))
            .pipe(istanbul.writeReports({ dir: './test/unit/coverage'}))
            // Enforces a coverage of at least 60%.
            .pipe(istanbul.enforceThresholds({ thresholds: { global: 60 } }))
            .on('error', function() {
              process.exit(1);
            })
            .on('end', function() {
              process.exit();
            });
      });
}


/**
 * Lint JS using Closure Linter.
 * Docs:
 *    https://developers.google.com/closure/utilities/docs/linter_howto
 * @return {function()}
 */
function lintJSTask() {

  var cmd = 'gjslint --strict --custom_jsdoc_tags="' +
            customTags.join(',') + '" ' + srcFilePaths.join(' ');
  return (shell.task([
    cmd
  ]))();
}


/**
 * Fix linted JS using Closure Linter.
 * Docs:
 *    https://developers.google.com/closure/utilities/docs/linter_howto
 * @return {function()}
 */
function fixJSTask() {
  var cmd = 'fixjsstyle --strict ' + srcFilePaths.join(' ');
  return (shell.task([
    cmd
  ]))();
}


/**
 * Starts the server on localhost:1337 or given port.
 * Starts the admin interface on localhost:9000.
 */
function startLocalServerTask() {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
}


/**
 * Sets up DB with test User and CompanyCloud.
 * Makes test User an admin.
 * @return {function()}
 */
function dbSetupTask() {
  var cmd = 'node db-setup/db-setup';
  return (shell.task([
    cmd
  ]))();
}


/**
 * Generate API docs.
 * @return {function()}
 */
function apidocTask() {
  var cmd = 'apidoc -i ./ -o apidoc/ -e node_modules/';
  return (shell.task([
    cmd
  ]))();
}


/**
 * Drops database then sets up DB with test User and CompanyCloud.
 * Makes test User an admin.
 * @return {function()}
 */
function dbSetupCleanTask() {
  var cmd = 'node db-setup/db-setup --clean';
  return (shell.task([
    cmd
  ]))();
}

gulp.task('docs', docsTask);
gulp.task('apidoc', apidocTask);
gulp.task('files', prepareFileListTask);
gulp.task('lint', ['fix'], lintJSTask);
gulp.task('fix', ['files'], fixJSTask);
gulp.task('t', testsWithoutCoverageTask);
gulp.task('test', testsTask);
gulp.task('dbSetup', dbSetupTask);
gulp.task('dbSetupClean', dbSetupCleanTask);
gulp.task('default', startLocalServerTask);


