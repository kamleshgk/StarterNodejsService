/**
 * @fileoverview The Auth module.
 * Governs authentication to route endpoints.
 *
 * Usage:
 *   Require the module then use as Express middleware.
 *   var express = require('express');
 *   var app = express();
 *   var auth = require('/auth/auth');
 *   app.use(auth);
 *
 * @module auth/auth
 * @requires module:common-errors/common-error
 */

var commonError = require('../common-errors/common-error');


/**
 * Checks whether the user is authenticated.
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 */
module.exports = function authenticated(req, res, next) {
  if (req.session && !req.session.authenticated) {
    next(new commonError.Auth());
  } else {
    next();
  }
};
