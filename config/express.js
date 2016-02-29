/**
 * Created by Aplus on 2016-02-14.
 */
'use strict';

var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash'); //connect-flash 모듈은 session 객체 영역에 임시 메세지를 저장하게 만드는 노드 모듈


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

    app.use(flash());
    app.use(passport.initialize()); //passport 모듈을 bootstrap
    app.use(passport.session());

    app.set('views', './app/views');
    app.set('view engine', 'jade');

    require('../app/routes/index.server.routes')(app);
    require('../app/routes/user.server.routes')(app);
    require('../app/routes/articles.server.routes')(app);

    app.use(express.static('./public'));
    return app;
};