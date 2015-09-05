/**
 * @fileoverview The Success module.
 * Formats the success response for delivery to the client.
 *
 * Usage:
 *   Require the module then use as Express middleware after routes.
 *   var express = require('express');
 *   var app = express();
 *   var routes = require('/routes/routes');
 *   var success = require('/success/success');
 *   app.use(routes);
 *   app.use(success);
 *
 * @module success/success
 * @requires module:common-errors/common-error
 */

var commonError = require('../common-errors/common-error');


/**
 * Handles success formatting response data.
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next function
 */
module.exports = function successHandler(req, res, next) {
  if (res && res.data) {
    res.status(200).json(res.data);
  }
  //set res.locals.ok = true if no content, this distinguishes a 404 API reque
  // st.
  else if (res && res.locals && res.locals.ok) {
    // Success with no body content.
    res.sendStatus(204);
  }
  else {
    next(new commonError.NotFound());
  }
};
