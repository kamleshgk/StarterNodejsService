/**
 * @fileoverview Tests for the common-error module.
 *
 * @requires module:common-errors/common-error
 */


var commonError = require('./common-error');

var assert = require('assert');

describe('Common Error Module', function() {
  describe('Not Found Error', function() {
    it('should be a instance of Error.', function() {
      var err = new commonError.NotFound();
      assert(err instanceof Error);
    });
  });

  describe('User Not Found Error', function() {
    it('should be a instance of NotFound Error.', function() {
      var err = new commonError.UserNotFound();
      assert(err instanceof commonError.UserNotFound);
    });
  });

  describe('Auth Error', function() {
    it('should be a instance of Error.', function() {
      var err = new commonError.Auth();
      assert(err instanceof Error);
    });
  });

  describe('Bad Request Error', function() {
    it('should be a instance of Error.', function() {
      var err = new commonError.BadRequest();
      assert(err instanceof Error);
    });
  });
         
});

/*

TODO : kamlesh - write tests for the following errors
 
Forbidden: ForbiddenError,
Conflict: ConflictError,
MissingRequiredAttributes: MissingRequiredAttributesError,
UserSave: UserSaveError,
UserFetch: UserFetchError,
Admin: AdminError,
UserExists: UserExistsError,
InvalidToken: InvalidTokenError

*/