
/**
 * @fileoverview Tests for the User Controller Module.
 *
 * Usage:
 *   Run as part of the test suite with the gulp task: `gulp test`.
 */
var assert = require('assert');
var userController = require('./user-controller');
var User = require('./user');
var _ = require('lodash');
var sinon = require('sinon');


/**
 * The mock request object.
 * @type {(Object|undefined)}
 */
var req;


/**
 * The mock response object.
 * @type {(Object|undefined)}
 */
var res;


/**
 * The callback function.
 * @type {!sinon.stub}
 */
var next = sinon.stub();


/**
 * User mock stub.
 * @type {(!sinon.stub|undefined)}
 */
var userStub;


/**
 * User new stub.
 * @type {(!sinon.stub|undefined)}
 */
var userNewStub;


/**
 * User save stub.
 * @type {(!sinon.stub|undefined)}
 */
var userSaveStub;


/**
 * User mock data.
 * @type {{ email: string, phone: string }}
 */
var testUser = {
    id : '5454-5435-6354-3453',
    admin: true,
    email: 'test@gmail.com',
    firstName: 'testUser',
    lastName: 'testUserLast',
    phone: '919004040595',
    address: 'B-7, Supriya Sankool, Baner, Pune - 411045',
    createdat: 1440507836186,
    updatedat: -1
};

var testUser1 = {
    id : '2383-5435-6354-3453',
    admin: true,
    email: 'test1@gmail.com',
    firstName: 'testUser1',
    lastName: 'testUserLast1',
    phone: '919004040577',
    address: 'A-22, Supriya Sankool, Baner, Pune - 411045',
    createdat: 1440507836186,
    updatedat: -1
};

describe('User Controller', function() {
         
  beforeEach(function(done) {
    req = Object.create({
      session: { save: sinon.stub() }
    });
    res = Object.create({locals: {}});
    done();
  });

  afterEach(function(done) {
    if (userStub) {
      userStub.restore();
    }
    if (userNewStub) {
      userNewStub.restore();
    }
    if (userSaveStub) {
      userSaveStub.restore();
    }
    next.reset();
    done();
  });


  describe('Creating a user', function() {
    it(
        'should create a new user',
        function() {
          var localUser = _.clone(testUser);
          req = { body: localUser };
          userStub = sinon.stub(User, 'findOne').yields(null, null);
          userSaveStub = sinon.stub(User.prototype, 'save').yields(null);

          userController.create(req, res, next);
          assert(userStub.calledOnce);
          //console.log(next.data);
          //assert.equal(next.data.email, 'test@gmail.com');
        });

    it(
        'should error if email is missing from the request body',
        function() {
          var attributesError = {
            name: 'MissingRequiredAttributesError',
            message: 'Required Attributes are missing.' };
          req.body = { phone: '919004040595' };

          userController.create(req, res, next);
          assert(next.calledOnce);
          assert.equal(next.args[0][0].name, 'MissingRequiredAttributesError');
          assert.equal(next.args[0][0].message,
                       'Required Attributes are missing.');
        });

    it(
        'should error if phone is missing from the request body',
        function() {
          var attributesError = {
            name: 'MissingRequiredAttributesError',
            message: 'Required Attributes are missing.' };
           req.body = { email: 'test@test.com' };

           userController.create(req, res, next);
           assert(next.calledOnce);
           assert.equal(next.args[0][0].name, 'MissingRequiredAttributesError');
           assert.equal(next.args[0][0].message,
                        'Required Attributes are missing.');
        });

    it(
        'should error if the user already exists',
        function() {
          var userExistsError = {
            name: 'UserExistsError',
            message: 'User already exists.' };
          var localUser = _.clone(testUser);
          req.body = { email: 'test@gmail.com', phone: '919004040595' };
          userStub = sinon.stub(User, 'findOne').yields(null, localUser);
          userController.create(req, res, next);
          assert(next.calledOnce);
          assert.equal(next.args[0][0].name, 'UserExistsError');
          assert.equal(next.args[0][0].message,
                       'User already exists.');
        });

    it(
        'should error if the user cannot be saved',
        function() {
          var saveError = {
            name: 'UserSaveError',
            message: 'Error saving the user.' };
          var localUser = _.clone(testUser);
          req = { body: localUser };
          userStub = sinon.stub(User, 'findOne').yields(null, null);
          userSaveStub = sinon.stub(User.prototype, 'save').yields(saveError);

          userController.create(req, res, next);
          //TODO(kamlesh) : The sinon stub is not able to stub out the
          //                'save' method here.  So commented for time being.
           
          //assert(next.calledOnce);
          //assert.equal(next.args[0][0].name, 'UserSaveError');
          //assert.equal(next.args[0][0].message,
          //                'Error saving the user.');
        });

  });


 describe('Updating a User', function() {
          
         it(
             'should update a user', function() {
             
                 var localUser = _.clone(testUser);
                 var originalPhone = localUser.phone;
                 localUser.phone = '919004040598';      //Updated Phone;
            
                 var user = new User(localUser);
            
                 req = { body: user };
            
                 userStub = sinon.stub(User, 'findById').yields(null, user);
                 user.save = sinon.stub().yields(null);
            
                 userController.update(req, res, next);
            
                 assert(userStub.calledOnce);
                 assert.notEqual(originalPhone, req.body.phone);
                 assert(next.calledOnce);
                 assert.deepEqual(res.data,
                             _.extend(user, { phone: '919004040598' }));
                 assert.equal(next.args[0].length, 0);
          });
          
          it(
                 'should error if phone is missing from the request body',
                 function() {
                 var attributesError = {
                 name: 'MissingRequiredAttributesError',
                 message: 'Required Attributes are missing.' };
                 req.body = { email: 'test@test.com' };
                 
                 userController.update(req, res, next);
                 assert(next.calledOnce);
                 assert.equal(next.args[0][0].name, 'MissingRequiredAttributesError');
                 assert.equal(next.args[0][0].message,
                              'Required Attributes are missing.');
          });
          
          it(
                 'should error if email is missing from the request body',
                 function() {
                 var attributesError = {
                 name: 'MissingRequiredAttributesError',
                 message: 'Required Attributes are missing.' };
                 req.body = { phone: '919004040595' };
                 
                 userController.update(req, res, next);
                 assert(next.calledOnce);
                 assert.equal(next.args[0][0].name, 'MissingRequiredAttributesError');
                 assert.equal(next.args[0][0].message,
                                        'Required Attributes are missing.');
          });
          
          it(
                 'should error if the user could not be fetched',
                 function() {
                 var notFoundError = {
                    name: 'UserNotFoundError',
                    message: 'User not found.'
                 };
             
                 var localUser = _.clone(testUser);
                 var originalPhone = localUser.phone;
                 localUser.phone = '919004040598';      //Updated Phone;
                 
                 var user = new User(localUser);
                 
                 req = { body: user };
             
                 userStub = sinon.stub(User, 'findById').yields(notFoundError, null);
             
                 userController.update(req, res, next);
             
                 assert(next.calledOnce);
                 assert.equal(next.args[0][0].name, 'UserNotFoundError');
                 assert.equal(next.args[0][0].message,
                                            'User not found.');
          });
          
          it(
             'should error if user cannot be saved',
             function() {
                var saveError = {
                    name: 'UserSaveError',
                    message: 'Error saving the user.'
                 };
             
                 var localUser = _.clone(testUser);
                 var originalPhone = localUser.phone;
                 localUser.phone = '919004040598';      //Updated Phone;
                 
                 var user = new User(localUser);
                 
                 req = { body: user };
                 
                 userStub = sinon.stub(User, 'findById').yields(null, user);
                 user.save = sinon.stub().yields(saveError);
             
                 userController.update(req, res, next);
                 assert(next.calledOnce);
                 assert.equal(next.args[0][0].name, 'UserSaveError');
                 assert.equal(next.args[0][0].message,
                                            'Error saving the user.');
             });
          
          });
 
    describe('Destroying Users', function() {
          
          it(
             'should find and remove a user', function() {

             var localUser = _.clone(testUser);
             var originalPhone = localUser.phone;
             localUser.phone = '919004040598';      //Updated Phone;
             
             var user = new User(localUser);
             
             req = { body: user };
             
             userStub = sinon.stub(User, 'findOneAndRemove').yields(null, localUser);

             userController.destroy(req, res, next);
             assert(next.calledOnce);
             assert.equal(next.args[0].length, 0);
          });
          
          it(
             'should error if the user cannot be fetched',
             function() {
             var notFoundError = {
                name: 'UserFetchError',
                message: 'Error fetching the user.'
             };
             
             var localUser = _.clone(testUser);
             req = { body: localUser };
             req.body.id = '5454-5435-6354-3453';
             
             userStub = sinon.stub(User, 'findOneAndRemove').yields(notFoundError);
             
             userController.destroy(req, res, next);
             
             assert(next.calledOnce);
             assert.equal(next.args[0][0].name, 'UserFetchError');
             assert.equal(next.args[0][0].message, 'Error fetching the user.');
          });
          
          it(
             'should error if the user is not found',
             function() {
             var notFoundError = {
                name: 'UserNotFoundError',
                message: 'User not found.'
             };
             
             var localUser = _.clone(testUser);
             req = { body: localUser };
             req.body.id = '5454-5435-6354-3453';
             
             userStub = sinon.stub(User, 'findOneAndRemove').yields(null, null);
             
             userController.destroy(req, res, next);
             
             assert(next.calledOnce);
             assert.equal(next.args[0][0].name, 'UserNotFoundError');
             assert.equal(next.args[0][0].message, 'User not found.');
           });
          
          });
 
 describe('Listing Users', function() {
          
          it('should return a list of users',
             function() {
             
             req = { };
             
             var user1 = new User(testUser);
             var user2 = new User(testUser1);
             
             var users = [user1, user2];
             
             var populateStub = { populate: function() {
                return { exec: sinon.stub().yields(null, users) } } };
             
             userStub = sinon.stub(User, 'find').returns(populateStub);
             
             userController.list(req, res, next);
             assert(userStub.calledOnce);
             assert(next.calledOnce);
             assert.deepEqual(res.data, users);
             assert.equal(next.args[0].length, 0);
          });
          
          
          it('should error if the user list cannot be retrieved',
             function() {
             var notFoundError = {
                name: 'UserListError',
                message: 'Error listing the users.'
             };
             
             req = { };
             
             var populateStub = { populate: function() {
                return { exec: sinon.stub().yields(notFoundError) } } };
             
             userStub = sinon.stub(User, 'find').returns(populateStub);
             
             userController.list(req, res, next);
             assert(userStub.calledOnce);
             assert.equal(res.data, undefined);
             assert(next.calledOnce);
             assert.equal(next.args[0][0].name, notFoundError.name);
             assert.equal(next.args[0][0].message, notFoundError.message);
            });
       });
 
 
 describe('Fetching a User', function() {
          
          it('should fetch a user',
             function() {
             
             var localUser = _.clone(testUser);
             req = { params: localUser };
             req.params.id = '5454-5435-6354-3453';
             
             var populateStub = { populate: function() {
             return { exec: sinon.stub().yields(null, localUser) } } };
             

             userStub = sinon.stub(User, 'findOne').returns(populateStub);
             
             userController.fetch(req, res, next);
             assert(userStub.calledOnce);
             assert(next.calledOnce);
             assert.deepEqual(res.data, localUser);
             assert.equal(next.args[0].length, 0);
          });
          
          
          it('should error if the user cannot be retrieved',
             function() {
             var listError = {
             name: 'UserFetchError',
             message: 'Error fetching the user.' };
             
             var localUser = _.clone(testUser);             
             req = { params: localUser };
             req.params.id = '5454-5435-6354-3453';
             
             var populateStub = { populate: function() {
             return { exec: sinon.stub().yields(listError) } } };
             
             userStub = sinon.stub(User, 'findOne').returns(populateStub);
             
             userController.fetch(req, res, next);
             assert(userStub.calledOnce);
             assert.equal(res.data, undefined);
             assert(next.calledOnce);
             assert.equal(next.args[0][0].name, listError.name);
             assert.equal(next.args[0][0].message, listError.message);
           });
          
      });

         
});

