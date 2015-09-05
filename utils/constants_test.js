/**
 * @fileoverview Test for Constants file.
 *
 * Usage:
 *  Run as part of the test suite with the gulp task: `gulp test`.
 */


var constants = require('./constants');
var _ = require('lodash');
var assert = require('assert');

describe('Constants', function() {

  it('should not able to be modified',
     function() {
       var maxAge = _.clone(constants.COOKIE_MAX_AGE);
       delete constants.COOKIE_MAX_AGE;
       assert.notEqual(constants.COOKIE_MAX_AGE, undefined);
       assert.equal(constants.COOKIE_MAX_AGE, maxAge);
     });

});
