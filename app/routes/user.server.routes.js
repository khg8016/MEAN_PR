/**
 * Created by Aplus on 2016-02-16.
 */
'use strict';

var user = require('../controllers/user.server.controller'),
    passport = require('passport');

module.exports = function(app){
    app.route('/signup').
        get(user.renderSignup).
        post(user.signup);

    app.route('/signin').
        get(user.renderSignin).
        post(passport.authenticate('local',{ //lcoal.js에 쓰여있는 local 전략을 쓰겠다
        successRedirect : '/',
        failureRedirect : '/signin',
        failureFlash : true //passport에 flash message를 사용할지 말지 알려줌
    }));
    app.get('/signout', user.signout);
};