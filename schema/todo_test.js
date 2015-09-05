/**
 * @fileoverview Tests for the Todo Schema
 *
 * Usage:
 *  Run as part of the test suite with the gulp task: `gulp test`.
 */
var assert = require('assert');
var Todo = require('./todo.js');
var User = require('./user.js');
//var sinon = require('sinon');

describe('Todo Object', function() {

    var testUser1 = {
         admin: true,
         email: 'test@gmail.com',
         firstName: 'testUser',
         lastName: 'testUserLast',
         phone: '919004040595',
         address: 'B-7, Supriya Sankool, Baner, Pune - 411045',
         createdat: 1440507836186,
         updatedat: -1
      };
         
     var testUser2 = {
         admin: true,
         email: 'pest@gmail.com',
         firstName: 'pestUser',
         lastName: 'pestUserLast',
         phone: '917004040595',
         address: 'B-21, Wuthering Heights, Pashan, Pune - 411021',
         createdat: 1440507836186,
         updatedat: -1
     };
         
    var testTodo = {
         todoid: 'WERWE-324DF-WERWE-324DF',
         complete: false,
         todoSubject: 'Clean the room',
         notes: 'This room needs to be cleaned',
         createdat: 1440507836186,
         updatedat: 1440507855
    };

  var users = [];

  before(function() {

    var user = new User(testUser1);
    var user1 = new User(testUser2);
    users.push(user);
    users.push(user1);
         
    testTodo.users = users;
  });

  it('should adhere to the Todo Schema', function() {

    assert.equal(testTodo.complete, false);
    assert.equal(testTodo.todoid, 'WERWE-324DF-WERWE-324DF');
    assert.equal(testTodo.todoSubject, 'Clean the room');
    assert.equal(testTodo.notes, 'This room needs to be cleaned');

    assert.equal(testTodo.users.length, 2);
  });
});

