/**
 * @fileoverview Tests for the Error Connect Middleware Module.
 * Tets whether the middleware properly sends an error response.
 *
 * Usage:
 *  Run as part of the test suite with the gulp task: `gulp test`.
 *
 * @requires module:assert
 * @requires module:error/error
 * @requires module:common-errors/common-error
 * @requires module:sinon
 */
var assert = require('assert');
var errorHandler = require('./error');
var commonError = require('../common-errors/common-error');
var sinon = require('sinon');


/**
 * The mock res.status.json stub.
 * @type {!sinon.stub}
 */
var jsonStub = sinon.stub();


/**
 * The mock res.status stub.
 * @type {!sinon.stub}
 */
var statusStub = sinon.stub().returns({ json: jsonStub });


/**
 * The mock request object.
 * @type {!Object)}
 */
var req = Object.create({});


/**
 * The mock response object.
 * @type {{ status: sinon.stub }}
 */
var res = { status: statusStub };


/**
 * The callback function.
 * @type {!sinon.stub}
 */
var next = sinon.stub();


describe('Connect Middleware', function() {
  describe('Module Error', function() {

    beforeEach(function(done) {
      jsonStub.reset();
      statusStub.reset();
      next.reset();
      done();
    });

    it('should send a 401 response when Auth error is present', function() {
      var err = new commonError.Auth();
      errorHandler(err, req, res, next);
      assert(statusStub.calledWith(401));
      assert(jsonStub.calledWith(err));
    });

    it('should send a 404 response when Not found error is present',
        function() {
         var err = new commonError.NotFound();
         errorHandler(err, req, res, next);
         assert(statusStub.calledWith(404));
         assert(jsonStub.calledWith(err));
       });

    it('should send a 404 response when User Not found error is present',
        function() {
         var err = new commonError.UserNotFound();
         errorHandler(err, req, res, next);
         assert(statusStub.calledWith(404));
         assert(jsonStub.calledWith(err));
       });


    it('should send a 400 response when error is null', function() {
      var err = null;
      errorHandler(err, req, res, next);
      assert(statusStub.calledWith(400));
    });


    it('should send a 400 response when error is undefined', function() {
      var err;
      errorHandler(err, req, res, next);
      assert(statusStub.calledWith(400));
    });

    it('should send a 400 response when error is not in common errors',
        function() {
         var err = {};
         errorHandler(err, req, res, next);
         assert(statusStub.calledWith(400));
       });
           
    it('should send a 403 response when Forbidden error is present',
        function() {
         var err = new commonError.Forbidden();
         errorHandler(err, req, res, next);
         assert(statusStub.calledWith(403));
         assert(jsonStub.calledWith(err));
       });
           
   it('should send a 400 response when BadRequest error is present',
              function() {
              var err = new commonError.BadRequest();
              errorHandler(err, req, res, next);
              assert(statusStub.calledWith(400));
              assert(jsonStub.calledWith(err));
       });
           
   it('should send a 409 response when Conflict error is present',
          function() {
          var err = new commonError.Conflict();
          err.stack = 'testStack';
          errorHandler(err, req, res, next);
          assert(statusStub.calledWith(409));
          assert(jsonStub.calledWith(err));
       });
           
  });
});
