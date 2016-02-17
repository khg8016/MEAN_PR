/**
 * Created by Aplus on 2016-02-14.
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');


var db = mongoose();
var app = express();
var passport = passport();

app.listen(3000);
module.exports = app;

console.log("server is running at http://localhost:3000/");