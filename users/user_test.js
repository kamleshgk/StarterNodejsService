/**
 * @fileoverview Tests for the User Module.
 * Tets whether the user correctly exports the user schema.
 *
 * Usage:
 *  Run as part of the test suite with the gulp task: `gulp test`.
 */
var assert = require('assert');
var User = require('./user');

describe('User', function() {
  it(
      'should export the User Schema',
      function() {
        assert.equal(User.name, 'model');
     
      });
});

