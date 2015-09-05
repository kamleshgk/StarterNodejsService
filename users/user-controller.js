/**
 * @fileoverview The User Controller.
 * Implements all business logic for User operations.
 *
 * Usage:
 *   This file should be required to gain access to User logic.
 *   var userController = require('users/user-controller');
 *
 * @requires module:async
 * @requires module:users/user
 * @requires module:common-errors/common-error
 * @module users/user-controller
 */

var async = require('async');
var User = require('./user');
var _ = require('lodash');
var constants = require('../utils/constants');
var commonError = require('../common-errors/common-error');



/**
 * The User Controller.
 * @constructor
 */
function UserController() {}


/**
 * Logic for signing the user up or creating a new user
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function
 * @return {function()}
 */
UserController.prototype.create = function(req, res, next) {
  var user = new User();

  if (!req.body.email || !req.body.phone) {
    return next(new commonError.MissingRequiredAttributes());
  }
    
  var uts = new Date().getTime();

  user.admin = req.body.admin;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.address = req.body.address;
  user.createdat = uts;
  user.updatedat = uts;

  User.findOne({ email: user.email }, function(userFetchError, foundUser) {

    // `userFetchError` is passed when user is not found by lookup.
    // Purposefully ignored because we do not want the user to exist on signup.

    if (foundUser) {
      next(new commonError.UserExists());
    } else {
      user.save(function(userSaveError) {
        if (userSaveError) {
          next(new commonError.UserSave());
        } else {
          res.data = user;
          next();
        }
      });
    }
  });
};


/**
 * Logic for updating user details
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function
 * @return {function()}
 */
UserController.prototype.update = function(req, res, next) {
    if (!req.body._id || !req.body.email || !req.body.phone) {
        return next(new commonError.MissingRequiredAttributes());
    }
    
    var id = req.body._id;
    User.findById(id, function(userNotFoundError, user) {
                  
       if (userNotFoundError) {
            return next(new commonError.UserNotFound());
       }
     
       var uts = new Date().getTime();

       _.extend(user, req.body);
       user.updatedat = uts;
                  
       user.save(function(userSaveError) {
          if (userSaveError) {
               return next(new commonError.UserSave());
          }
          res.data = user;
          next();
        });
    });
};


/**
 * Logic for listing users
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 */
UserController.prototype.list = function(req, res, next) {
    User.find().populate('users').exec(
            function(userListError, data) {
               if (userListError) {
                  return next(new commonError.UserList());
               }
            res.data = data;
            next();
        });
};


/**
 * Fetches an individual user.
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 */
UserController.prototype.fetch = function(req, res, next) {
    
    if (!req.params.id) {
        return next(new commonError.MissingRequiredAttributes());
    }
    
    var id = req.params.id;
    User.findOne({ _id: id })
    .populate('users').exec(
                  function(userFetchError, data) {
                       if (userFetchError) {
                            return next(new commonError.UserFetch());
                       }
                  res.data = data;
                  next();
            });
};


/**
 * Logic for destroying a user
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 */
UserController.prototype.destroy = function(req, res, next) {
    
    if (!req.body.id) {
        return next(new commonError.MissingRequiredAttributes());
    }
    
    var id = req.body.id;
    console.log(id);
    
    User.findOneAndRemove({_id: id},
           function(userFetchError, user) {
           if (userFetchError) {
                return next(new commonError.UserFetch());
           }
           if (!user) {
                return next(new commonError.UserNotFound());
           }
           res.data = user;
           next();
       });
};


/**
 * Exports the UserController.
 * @type {!UserController}
 */
module.exports = new UserController();
