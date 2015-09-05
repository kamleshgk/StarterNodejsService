/**
 * @fileoverview Tests for the Auth Connect Middleware Module.
 * Tets whether the middleware properly checks whether user is authenticated.
 *
 * Usage:
 *  Run as part of the test suite with the gulp task: `gulp test`.
 */
var admin = require('./auth');
var assert = require('assert');
var sinon = require('sinon');


/**
 * The mock request object.
 * @type {Object|undefined)}
 */
var req;


/**
 * The mock response object.
 * @type {Object|undefined)}
 */
var res;


/**
 * The callback function.
 * @type {function(Object)|undefined)}
 */
var next;


/**
 * The auth error.
 * @type {{name: string, message: string}}
 */
var authError = { name: 'AuthError', message: 'You must login first.' };

describe('Connect Middleware', function() {
  describe('Module Auth', function() {

    beforeEach(function(done) {
      res = Object.create({});
      next = sinon.spy();
      done();
    });

    afterEach(function(done) {
      next.reset();
      done();
    });

    it('should allow authenticated requests', function() {
      req = { session: { authenticated: true } };
      admin(req, res, next);
      assert(next.calledOnce);
      assert.equal(next.args[0].length, 0);
    });

    it('should not allow unauthenticated requests', function() {
      req = { session: { authenticated: false } };
      admin(req, res, next);
      assert(next.calledOnce);
      assert.equal(next.args[0][0].name, authError.name);
      assert.equal(next.args[0][0].message, authError.message);
    });
  });
});
