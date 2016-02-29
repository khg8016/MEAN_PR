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
    flash = require('connect-flash'), //connect-flash 모듈은 session 객체 영역에 임시 메세지를 저장하게 만드는 노드 모듈
    http = require('http'),
    socketio = require('socket.io'),
    MongoStore = require('connect-mongo')(session); // express 세션과 연계해 동작하게 socketio 세션을구성하려면 socketio 와 express 사이에서 세션정보를 공유하는 수단이 있어야함. 몽고db에 세션정보를 저장하기 위함
 //socketio는 단독형 모듈이라서 익스프레스 세션정보를 소켓연결에서 사용할 수 없음

module.exports = function(db){
    var app = express();
    var server= http.createServer(app);
    var io = socketio.listen(server);

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

    var mongoStore = new MongoStore({
        db : db.connection.db
    });

    app.use(session({
        saveUninitialized : true,
        resave : true,
        secret : config.sessionSecret,
        store : mongoStore
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
    require('./socketio')(server, io, mongoStore);
    return server;
};