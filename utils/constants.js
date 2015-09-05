/**
 * @fileoverview The Constants file.
 * Provides constants to use in the codebase.
 * Usage:
 *   This file should be required to gain access to query construction logic.
 *   var constants = require('./utils/constants');
 *   var alias = constants.ES_ALIAS;
 */


/**
 * The app constants.
 * @enum {(string|number|boolean)}
 * @const
 */
var CONSTANTS = Object.freeze({
  COOKIE_MAX_AGE: 3600 * 1000,
  REMEMBERME_COOKIE_MAX_AGE: 14 * 24 * 3600 * 1000,
  MAX_NUM_HIGH_PRIORITY_JOBS: 5,
  //max number of results return when bulk set candidates' priority to high
  MAX_NUM_CANDIDATES_BULK_PROPORTY_SET: 9999999,
  SIGNUP_TOKEN_MAX_AGE: 3 * 24 * 3600 * 1000 // 3 days
});


/**
 * Export the constants.
 * @enum {string}
 */
module.exports = CONSTANTS;
