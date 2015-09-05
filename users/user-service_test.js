/**
 * @fileoverview Tests for the User Service Module.
 * Tets whether the user service correctly calls its corresponding
 *   controller methods.
 *
 * Usage:
 *  Run as part of the test suite with the gulp task: `gulp test`.
 */
var assert = require('assert');
var userController = require('./user-controller');
var userService = require('./user-service');
var sinon = require('sinon');


/**
 * The mock request object.
 * @type {Object)}
 */
var req = Object.create({});


/**
 * The mock response object.
 * @type {Object)}
 */
var res = Object.create({});


/**
 * The callback function.
 * @type {function()}
 */
var next = function() {};


describe('API Services', function() {
  describe('User Endpoints', function() {

    it(
        'should expose a create method that that makes a controller call',
        function() {
          var loginStub = sinon.stub(userController, 'create');
          userService.create(req, res, next);
          assert(loginStub.calledOnce);
          assert(loginStub.alwaysCalledWith(req, res, next));
        });

    it(
        'should expose a update method that that makes a controller call',
        function() {
            var loginStub = sinon.stub(userController, 'update');
            userService.update(req, res, next);
            assert(loginStub.calledOnce);
            assert(loginStub.alwaysCalledWith(req, res, next));
    });
           
   it(
      'should expose a destroy method that that makes a controller call',
      function() {
      var loginStub = sinon.stub(userController, 'destroy');
      userService.destroy(req, res, next);
      assert(loginStub.calledOnce);
      assert(loginStub.alwaysCalledWith(req, res, next));
   });
   
   it(
      'should expose a list method that that makes a controller call',
      function() {
      var loginStub = sinon.stub(userController, 'list');
      userService.list(req, res, next);
      assert(loginStub.calledOnce);
      assert(loginStub.alwaysCalledWith(req, res, next));
    });
           
           
   it(
      'should expose a fetch method that that makes a controller call',
      function() {
      var loginStub = sinon.stub(userController, 'fetch');
      userService.fetch(req, res, next);
      assert(loginStub.calledOnce);
      assert(loginStub.alwaysCalledWith(req, res, next));
    });
   
  });
});
