/**
 * @fileoverview The Routes module.
 * Governs routes to the server.
 * This module requires the modules {@link module:users/user-service}
 *
 * Usage:
 *   Require the module then use as Express middleware.
 *   var express = require('express');
 *   var app = express();
 *   var routes = require('/routes/routes');
 *   app.use(routes);
 *
 * @requires module:auth/auth
 * @requires module:express
 * @requires module:users/user-service
 * @module routes/routes
 */
var auth = require('../auth/auth');
var userService = require('../users/user-service');
var express = require('express');
var validator = require('../validation/validation');


/**
 * The Express Router.
 * @type {express.Router}
 */
var routes = express.Router();


/**
 * Stories Routes.
 */
//routes.route('/stories').post(validator, storyService.create);


/**
 * User Routes.
 */
routes.route('/create').post(validator, userService.create);
routes.route('/list').get(validator, userService.list);
routes.route('/destroy').post(validator, userService.destroy);
routes.route('/update').post(validator, userService.update);
routes.route('/user/:id').get(validator, userService.fetch);
routes.route('/login').post(validator, userService.login);
/**
 * Up display route.
 */
routes.route('/').get(function(req, res, next) {
  var env = process.env.NODE_ENV || 'Dev';
  res.end('HigherOrder ' + env + ' Server is operational!');
});


/**
 * Export the routes module.
 */
module.exports = routes;
