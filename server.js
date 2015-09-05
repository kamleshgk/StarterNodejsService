'use strict';

var bodyParser = require('body-parser');
var connectMongo = require('connect-mongo');
var connectSlashes = require('connect-slashes');
var cors = require('cors');
var errorHandler = require('./error/error');
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var routes = require('./routes/routes');
var session = require('express-session');
var successHandler = require('./success/success');
var _ = require('lodash');
var constants = require('./utils/constants');
var dbSetup = require('./db-setup/db-setup');

var app = express();

var corsOptions = { origin: true, credentials: true};

var MongoStore = connectMongo(session);

var busboy = require('connect-busboy');

/*var mongoServer = process.env.MONGO_SERVER || 'localhost';
mongoose.connect('mongodb://' + mongoServer + '/test');*/

dbSetup.exec();


app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(session({
  cookie: { maxAge: constants.COOKIE_MAX_AGE },
  resave: true,
  saveUninitialized: false,
  secret: 'testSecret',
  store: new MongoStore({ mongooseConnection: mongoose.connection })}));
app.use(connectSlashes(false));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());
app.use(busboy());

app.use(routes);
app.use(successHandler);
app.use(errorHandler);

// Listen (start app with node server.js).
app.listen(process.env.PORT || 1337);
console.log('App listening on port 1337 in env ' + process.env.NODE_ENV + '.');
