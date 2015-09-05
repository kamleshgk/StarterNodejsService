/**
 * @fileoverview The Error module.
 * Formats the error response for delivery to the client.
 *
 * Usage:
 *   Require the module then use as Express middleware after routes.
 *   var express = require('express');
 *   var app = express();
 *   var routes = require('/routes/routes');
 *   var error = require('/error/error');
 *   app.use(routes);
 *   app.use(response);
 *
 * @module response/response
 * @requires module:common-errors/common-error
 */

var commonError = require('../common-errors/common-error');


/**
 * Handles error response formatting response data.
 *
 * @param {Object} err - error objecta
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function
 */
module.exports = function response(err, req, res, next) {
  if (err && err.stack) {
    //in case some errors are not being caught
    console.log(err.stack);
  }
  if (err instanceof commonError.Auth) {
    res.status(401).json(err);
  }
  else if (err instanceof commonError.UserNotFound) {
      res.status(404).json(err);
  }
  else if (err instanceof commonError.NotFound) {
    res.status(404).json(err);
  }
  else if (err instanceof commonError.Forbidden) {
    res.status(403).json(err);
  }
  else if (err instanceof commonError.BadRequest) {
    res.status(400).json(err);
  }
  else if (err instanceof commonError.Conflict) {
    res.status(409).json(err);
  }
  else {
    res.status(400).json(new commonError.BadRequest());
  }
};

