/**
 * @fileoverview The Todo Model.
 *
 * Usage:
 *   The Todo governs everything about the Todo model.
 *   This file should be required to gain access to the schema.
 *   var Todo = require ('schema/todo');
 *
 * @requires module:mongoose
 * @requires module:mongoose-timestamp
 * @module company-clouds/company-cloud
 */
var mongoose = require('mongoose');
var mongooseTimestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;


/**
 * The Todo schema.
 * @type {Schema}
 */
var TodoSchema = new Schema({
  todoid: {type:String},
  complete: { type: Boolean, default: false },
  todoSubject: String,
  notes: String,
  users: [{
    type: Schema.Types.ObjectId, ref: 'User' }],         //Array of UserId
  createdat : {type:Number},
  updatedat : {type:Number}
});



/**
 * Compound indexes.
 * companyCloud, id: used in user update and user destroy lookups.
 *
 */
TodoSchema.index({ _id: 1 });


TodoSchema.plugin(mongooseTimestamps);


/**
 * Exports the Todo Schema.
 * @type {!Object}
 */
module.exports = mongoose.model('Todo', TodoSchema);
