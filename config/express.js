/**
 * Created by Aplus on 2016-02-14.
 */
var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session');

module.exports = function(){
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    // Use the 'body-parser' and 'method-override' middleware functions
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        saveUninitialized : true,
        resave : true,
        secret : config.sessionSecret
    }));
    app.set('views', './app/views');
    app.set('view engine', 'jade');
    require('../app/routes/index.server.routes')(app);

    app.use(express.static('./public'));
    return app;
}