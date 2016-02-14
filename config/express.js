/**
 * Created by Aplus on 2016-02-14.
 */
var express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

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
    app.set('views', './app/views');
    app.set('view engine', 'jade');
    require('../app/routes/index.server.routes')(app);

    app.use(express.static('./public'));
    return app;
}