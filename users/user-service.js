/**
 * @fileoverview The User Service.
 * Exposes User endpoints for consumption by Routes module.
 *
 * Usage:
 *   Require the Service to consume the endpoints.
 *   var express = require('express');
 *   var routes = express.Router();
 *   var userService = require('users/user-service');
 *   routes.route('/login').post(userService.login);
 *
 * @requires module:users/user-controller
 * @module users/user-service
 */

var userController = require('./user-controller');


/**
 * Endpoint to sign the user up or creating a user.
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function
 */
module.exports.create = function(req, res, next) {
  userController.create(req, res, next);
};


/**
 * Endpoint to destroy a user from the system.
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function
 */
module.exports.destroy = function(req, res, next) {
  userController.destroy(req, res, next);
};


/**
 * Endpoint to update a user within the system.
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function
 */
module.exports.update = function(req, res, next) {
  userController.update(req, res, next);
};


/**
 * Endpoint to list users
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 */
module.exports.list = function(req, res, next) {
    userController.list(req, res, next);
};


/**
 * Endpoint to fetch a user
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 */
module.exports.fetch = function(req, res, next) {
    userController.fetch(req, res, next);
};


/**
 * Endpoint to login a user
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 */
module.exports.login = function(req, res, next) {
    userController.login(req, res, next);
};

/**
 * Endpoint to sending forgot password mail.
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 */
module.exports.forgotPassword = function(req, res, next) {
    userController.forgotPassword(req, res, next);
};

/**
 * Endpoint to for confirming a password reset.
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 */
module.exports.passwordReset = function(req, res, next) {
    userController.passwordReset(req, res, next);
};

