/**
 * @fileoverview Tests for the User Schema
 * Tets various methods exposed by User
 *
 * Usage:
 *  Run as part of the test suite with the gulp task: `gulp test`.
 */
var assert = require('assert');
var User = require('./user');
//var sinon = require('sinon');


describe('When trying obfuscate user credentials', function() {
         
         var user;
         before(function() {
                user = new User();
                });
         
         it('should hash a user\'s password', function() {
            var hash = user.generateHash('password');
            assert.notEqual(hash, 'password');
         });
         
         
         it('should validate a user\'s password', function() {
                var hash = user.generateHash('password');
                assert.notEqual(hash, 'password');
                user.passwordHash = hash;
                var result = user.validPassword('password');
                assert.equal(result, true);
         });
});

describe('User Object', function() {

  var user;
  var testDate = new Date('October 13, 2015 11:13:00');

  before(function() {

    var testUser = {
      admin: true,
      email: 'test@gmail.com',
      firstName: 'testUser',
      lastName: 'testUserLast',
      passwordHash: '$2a$08$C.reP7hiv6d1cJAK8ezSmejujZBk7mw64MnJ7pRY4RFgiO9nQVA4q',         
      phone: '919004040595',
      address: 'B-7, Supriya Sankool, Baner, Pune - 411045',
      createdat: 1440507836186,
      updatedat: -1
    };

    user = new User(testUser);
  });

  it('should adhere to the User Schema', function() {

    assert.equal(user.admin, true);
    assert.equal(user.email, 'test@gmail.com');
    assert.equal(user.firstName, 'testUser');
    assert.equal(user.lastName, 'testUserLast');
    assert.equal(user.phone, '919004040595');
    assert.equal(user.address, 'B-7, Supriya Sankool, Baner, Pune - 411045');
    assert.equal(user.createdat, 1440507836186);
   });
});


