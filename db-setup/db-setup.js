/**
 * @fileoverview  Setting up local database with test data.
 *
 * Usage:
 *   node db-setup/db-setup
 *
 * @requires module:mongoose
 * @requires module:async
 * @requires module:users/user
 * @requires module:db-setup/db-setup-config
 * @requires module:users/user
 * @requires module:company-clouds/company-cloud
 */
var async = require('async');
var config = require('./db-setup-config');
var mongoose = require('mongoose');
var User = require('../users/user');


/**
 * Whether to clean data or not.
 * @type {boolean}
 */
var fromScrath = process.argv.slice(2)[0] === '--clean';



/**
 * DBSetup constructor.
 * @constructor
 */
function DBSetup() {
  this.user = null;
}


/**
 * Run a series of commands to set up db.
 */
DBSetup.prototype.exec = function() {
  var self = this;
  async.waterfall([
    this.startConnection
  ]);
};


/**
 * Start connection to db.
 * @param {function()} next callback function when task finished.
 */
DBSetup.prototype.startConnection = function(next) {
  console.log('starting DB connection!!!');
  var mongoServer = process.env.MONGO_SERVER || 'localhost';
  mongoose.connect('mongodb://' + mongoServer + '/' + config.database, function(err) {
                        if (err)
                         {
                            console.log('Error connecting to DB...');
                            throw err;
                         }
                         else
                         {
                            console.log('Success!! Connected to DB.');
                         }
                     });
};




/**
 * Close connection to db.
 */
DBSetup.prototype.closeConnection = function() {
  process.stdout.write('Shutting down mongodb...');
  mongoose.connection.close(function() {
    console.log('done');
  });
};


/**
 * Exports the DBSetup.
 * @type {!DBSetup}
 */
module.exports = new DBSetup();

