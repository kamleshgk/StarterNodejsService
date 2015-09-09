/**
 * @fileoverview The User Model.
 *
 * Usage:
 *   The User Model governs everything about the User model.
 *   This file should be required to gain access to the schema.
 *   var User = require ('schema/user');
 *
 * @requires module:mongoose
 * @requires module:mongoose-timestamp
 * @module users/user
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var mongooseTimestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;


/**
 * The User schema.
 * @type {Schema}
 */
var UserSchema = new Schema({
  admin: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  passwordHash: { type: String },                            
  createdat : {type:Number},
  updatedat : {type:Number}
});

/**
 * Compound indexes.
 * companyCloud, id: used in user update and user destroy lookups.
 *
 */
UserSchema.index({ _id: 1 });


/**
 * Generates a password hash.
 * @param {string} password The password.
 * @return {string}
 */
UserSchema.methods.generateHash = function(password) {
    var salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
};


/**
 * Checks the password against the hash.
 * @param {string} password The password.
 * @this {!UserSchema}
 * @return {boolean}
 */
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};




UserSchema.plugin(mongooseTimestamps);


/**
 * Exports the User Schema.
 * @type {!Object}
 */
module.exports = mongoose.model('User', UserSchema);
