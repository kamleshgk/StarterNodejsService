/**
 * @fileoverview The Enrichment Validation module.
 * Performs any required validation on the request object sent for enrichment
 * Attaches the extracted parameters to the request object.
 *
 * Usage:
 *   Require the module then use as Express middleware after routes.
 *   var express = require('express');
 *   var app = express();
 *   var routes = require('/routes/routes');
 *   var enrichmentValidator = require('/validation/validation');
 *   app.use(routes);
 *
 * @requires module:common-errors/common-error
 
 * @module validation/validation
 */

var _ = require('lodash');

/**
 * The Enrichment Validation Error.
 *
 * @param {string=} opt_message The optional message.
 * @param {number=} opt_statusCode The optional status code.
 * @constructor
 */
function EnrichmentValidationError(opt_message, opt_statusCode) {
    this.name = "EnrichmentValidationError";
    this.status = opt_statusCode;
    this.message = (opt_message || "Invalid Request");
}
EnrichmentValidationError.prototype = Object.create(Error.prototype);


/** @type {!EnrichmentValidationError} */
EnrichmentValidationError.prototype.constructor = EnrichmentValidationError;

/**
 * Handles parsing request data.
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 * @return {function()}
 */
module.exports = function enrichmentValidatorHandler(req, res, next) {

    console.log('Went to validator');
    
    var headers = req.headers;
    //console.log(headers);
    if (headers == null) return res.send(401);
    
    // TODO : Get token
    /*try {
        var token = tokenHelper.extractTokenFromHeader(headers);
    } catch (err) {
        console.log(err);
        return res.send(401);
    }*/
    
    next();
    
};