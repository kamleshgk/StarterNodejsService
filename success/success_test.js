/**
 * @fileoverview Tests for the Success Connect Middleware Module.
 * Tets whether the middleware properly handles a success response.
 *
 * Usage:
 *  Run as part of the test suite with the gulp task: `gulp test`.
 */
var assert = require('assert');
var successHandler = require('./success');
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
 * The mock res.sendStatus stub.
 * @type {!sinon.stub}
 */
var sendStatusStub = sinon.stub();


/**
 * The mock request object.
 * @type {!Object)}
 */
var req = Object.create({});


/**
 * The mock response object.
 * @type {{ status: sinon.stub, sendStatus: sinon.stub, data:? (Object) }}
 */
var res = { status: statusStub, sendStatus: sendStatusStub, data: null };


/**
 * The callback function.
 * @type {!sinon.stub}
 */
var next = sinon.stub();

describe('Connect Middleware', function() {
  describe('Module Success', function() {

    beforeEach(function(done) {
      res.data = null;
      res.locals = null;
      jsonStub.reset();
      statusStub.reset();
      sendStatusStub.reset();
      done();
    });

    it('should send a 200 response with response body content', function() {
      res.data = {};
      successHandler(req, res, next);
      assert(statusStub.calledWith(200));
      assert(jsonStub.calledWith(res.data));
    });

    it('should send a 204 response with no response body content', function() {
      res.locals = {};
      res.locals.ok = true;
      successHandler(req, res, next);
      assert(sendStatusStub.calledWith(204));
      assert.equal(statusStub.calledOnce, false);
      assert.equal(jsonStub.calledOnce, false);
    });

    it('should produce a not found error if res.locals.ok is falsy',
        function() {
         res.locals = {};
         successHandler(req, res, next);
         assert.equal(sendStatusStub.calledOnce, false);
         assert.equal(statusStub.calledOnce, false);
         assert.equal(jsonStub.calledOnce, false);
         assert.equal(next.calledOnce, true);
       });

  });
});
