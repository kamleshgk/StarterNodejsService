/**
 * @fileoverview  Local database setup config file
 *
 * Usage:
 *   var config = require ('db-setup/db-setup-config');
 *
 * @module db-setup/db-setup-config
 */


/**
 * The DB Config object.
 * @type {{
 *   username: string,
 *   password: string,
 *   database: string,
 *   customerName:string,
 *   subdomain: string, admin: boolean
 * }}
 */
var config = {
  username: 'admin',
  password: 'password',
  database: 'higherorder',
  customerName: '',
  subdomain: '',
  admin: true
};


/**
 * Exports the DB Config object.
 * @type {{
 *   username: string,
 *   password: string,
 *   database: string,
 *   customerName: string,
 *   subdomain: string,
 *   admin: boolean
 * }}
 */
module.exports = config;
