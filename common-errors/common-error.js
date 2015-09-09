/**
 * @fileoverview The common-error module.
 * A factory to generate common server errors.
 *
 * Usage:
 *   var commonError = require('common-errors/common-error')
 *
 *   function (req, res, next){
 *      next(new commonError.Auth('some custom error message'))
 *   }
 *
 *
 *
 * @module common-errors/common-error
 */



/**
 * The common Bad Request Error (400).
 * @param {string=} opt_message The optional message.
 * @extends {Error}
 * @constructor
 *
 */
function BadRequestError(opt_message) {
  this.name = 'BadRequestError';
  this.message = (opt_message || 'Bad Request.');
}
BadRequestError.prototype = Object.create(Error.prototype);


/** @type {!BadRequestError} */
BadRequestError.prototype.constructor = BadRequestError;



/**
 * The common Unauthorized Error (401).
 * @param {string=} opt_message The optional message.
 * @extends {Error}
 * @constructor
 */
function AuthError(opt_message) {
  this.name = 'AuthError';
  this.message = (opt_message || 'You must login first.');
}
AuthError.prototype = Object.create(Error.prototype);


/** @type {!AuthError} */
AuthError.prototype.constructor = AuthError;



/**
 * The common Forbidden Error (403).
 * @param {string=} opt_message The optional message.
 * @extends {Error}
 * @constructor
 */
function ForbiddenError(opt_message) {
  this.name = 'ForbiddenError';
  this.message = (opt_message || 'You do not have the correct permission.');
}
ForbiddenError.prototype = Object.create(Error.prototype);


/** @type {!ForbiddenError} */
ForbiddenError.prototype.constructor = ForbiddenError;



/**
 * The common Not Found Error (404).
 * @param {string=} opt_message The optional message.
 * @extends {Error}
 * @constructor
 */
function NotFoundError(opt_message) {
  this.name = 'NotFoundError';
  this.message = (opt_message || 'Required resource is not found.');
}
NotFoundError.prototype = Object.create(Error.prototype);


/** @type {!NotFoundError} */
NotFoundError.prototype.constructor = NotFoundError;



/**
 * The common Conflict Error (409).
 * @param {string=} opt_message The optional message.
 * @extends {Error}
 * @constructor
 */
function ConflictError(opt_message) {
  this.name = 'ConflictError';
  this.message = (opt_message || 'There is a conflict on server.');
}
ConflictError.prototype = Object.create(Error.prototype);


/** @type {!ConflictError} */
ConflictError.prototype.constructor = ConflictError;



/**
 * The Admin Login Error.
 * @param {string=} opt_message The optional message.
 * @extends {ForbiddenError}
 * @constructor
 */
function AdminError(opt_message) {
  this.name = 'AdminError';
  this.message = (opt_message || 'You must be an admin.');
}
AdminError.prototype = Object.create(ForbiddenError.prototype);


/** @type {!AdminError} */
AdminError.prototype.constructor = AdminError;



/**
 * The User Missing Required Attributes Error.
 * @param {string=} opt_message The optional message.
 * @constructor
 * @extends {BadRequestError}
 */
function MissingRequiredAttributesError(opt_message) {
  this.name = 'MissingRequiredAttributesError';
  this.message = (opt_message || 'Required Attributes are missing.');
}
MissingRequiredAttributesError.prototype = Object.create(
    BadRequestError.prototype);


/** @type {!MissingRequiredAttributesError} */
MissingRequiredAttributesError.prototype.constructor = (
    MissingRequiredAttributesError);


/**
 * The User Not Found Error.
 * @param {string=} opt_message The optional message.
 * @extends {NotFoundError}
 * @constructor
 */
function UserNotFoundError(opt_message) {
    this.name = 'UserNotFoundError';
    this.message = (opt_message || 'User not found.');
}
UserNotFoundError.prototype = Object.create(BadRequestError.prototype);


/** @type {!UserNotFoundError} */
UserNotFoundError.prototype.constructor = UserNotFoundError;


/**
 * The User Save Error.
 * @param {string=} opt_message The optional message.
 * @constructor
 * @extends {BadRequestError}
 */
function UserSaveError(opt_message) {
  this.name = 'UserSaveError';
  this.message = (opt_message || 'Error saving the user.');
}
UserSaveError.prototype = Object.create(BadRequestError.prototype);


/** @type {!UserSaveError} */
UserSaveError.prototype.constructor = UserSaveError;



/**
 * The User Fetch Error.
 * @param {string=} opt_message The optional message.
 * @constructor
 * @extends {BadRequestError}
 */
function UserFetchError(opt_message) {
  this.name = 'UserFetchError';
  this.message = (opt_message || 'Error fetching the user.');
}
UserFetchError.prototype = Object.create(BadRequestError.prototype);


/** @type {!UserFetchError} */
UserFetchError.prototype.constructor = UserFetchError;


/**
 * The User List Error.
 * @param {string=} opt_message The optional message.
 * @constructor
 * @extends {BadRequestError}
 */
function UserListError(opt_message) {
    this.name = 'UserListError';
    this.message = (opt_message || 'Error listing the users.');
}
UserListError.prototype = Object.create(BadRequestError.prototype);


/** @type {!UserListError} */
UserListError.prototype.constructor = UserListError;

/**
 * The User Exists Error.
 * @param {string=} opt_message The optional message.
 * @constructor
 * @extends {ConflictError}
 */
function UserExistsError(opt_message) {
  this.name = 'UserExistsError';
  this.message = (opt_message || 'User already exists.');
}
UserExistsError.prototype = Object.create(ConflictError.prototype);


/** @type {!UserExistsError} */
UserExistsError.prototype.constructor = UserExistsError;


/**
 * Public API
 * @type {Object}
 */
module.exports = {
  Auth: AuthError,
  /**
   * @apiDefine BadRequestError BadRequestError 400
   * @apiError (BadRequestError) {string} name Error name.
   * @apiError (BadRequestError) {string} message Error message.
   */
  BadRequest: BadRequestError,
  Forbidden: ForbiddenError,
  /**
   * @apiDefine NotFoundError NotFoundError 404
   * @apiError (NotFoundError) {string} name Error name.
   * @apiError (NotFoundError) {string} message Error message.
   */
  NotFound: NotFoundError,
  Conflict: ConflictError,

  MissingRequiredAttributes: MissingRequiredAttributesError,
  UserSave: UserSaveError,
  UserFetch: UserFetchError,
  /**
   * @apiDefine UserNotFoundError UserNotFoundError 404
   * @apiError (UserNotFoundError) {string} name Error name.
   * @apiError (UserNotFoundError) {string} message Error message.
   */
  UserNotFound: UserNotFoundError,
  Admin: AdminError,
  UserExists: UserExistsError,
  UserList:UserListError

};



