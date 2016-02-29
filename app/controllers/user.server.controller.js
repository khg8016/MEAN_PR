/**
 * Created by Aplus on 2016-02-16.
 */
//모든 사용자 관련 연산을 다룰 컨트롤러
'use strict';

var mongoose = require('mongoose'); //미리 정의 되어있는 User 콜렉션
var User = mongoose.model('User');
var passport = require('passport');

var getErrorMessage = function(err){ //err은 mongoose error 객체. singup 페이지에서 가입시 db에 문제 있을 경우 해당 메세지를 flash 객체에 넣어주고 view에 띄워줌
    var message = '';

    if(err.code){
        switch(err.code){//mongodb index error 처리
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    }else{//mongoose 검증 오류 처리
        for (var errName in err.errors){
            if(err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }

    return message;
};

// Create a new controller method that renders the signin page
exports.renderSignin = function(req, res, next) { //로그인하기 창으로
    // If user is not connected render the signin page, otherwise redirect the user back to the main application page
    if (!req.user) {
        res.render('signin', {
            // Set the flash message variable
            messages: req.flash('error') || req.flash('info') //flash 객체에 기록된 에러 메세지를 view에 보내줌  req.flash는 flash객체에 있는 에러메세지를 읽어주는 역할
        });
    } else { //로그인 됐으면
        return res.redirect('/');
    }
        // Use the 'response' object to render the signin
};

// Create a new controller method that renders the signup page
exports.renderSignup = function(req, res, next) {//가입하기 창으로
    // If user is not connected render the signup page, otherwise redirect the user back to the main application page
    if (!req.user) {
        // Use the 'response' object to render the signup page
        res.render('signup', {
            // Set the flash message variable
            messages: req.flash('error')
        });
    } else { //로그인이 됐으면
        return res.redirect('/');
    }
};

// Create a new controller method that creates new 'regular' users
exports.signup = function(req, res, next) { //아이디 만들기 버튼?
    // If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
    if (!req.user) {//로그인 안됐으면
        // Create a new 'User' model instance
        var user = new User(req.body); //post 요청은  json 객체로 req.body에 담긴다(body parser)
        var message = null;

        // Set the user provider property
        user.provider = 'local';

        // Try saving the new user document
        user.save(function(err) {
            // If an error occurs, use flash messages to report the error
            if (err) {
                // Use the error handling method to get the error message
                var message = getErrorMessage(err); //에러 메세지를 읽고 스트링 형태로 리턴

                // Set the flash messages
                req.flash('error', message);//error message를 flash 객체에 기록

                // Redirect the user back to the signup page
                return res.redirect('/signup');
            }

            // If the user was created successfully use the Passport 'login' method to login
            req.login(user, function(err) { //이걸 실행하면 serialze 메서드가 실행되고 serialize에서 사용자 세션(req.user) 생성.passport.authenticate()메서드 사용할 때 자동으로 호출되기도 함.
                // If a login error occurs move to the next middleware
                if (err) return next(err);

                // Redirect the user back to the main application page
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

// Create a new controller method for signing out
exports.signout = function(req, res) {
    // Use the Passport 'logout' method to logout
    console.log("sign out ok");
    req.logout(); //인증된 세션 무효화 req.user 없앰
    // Redirect the user back to the main application page
    res.redirect('/');
};

exports.requiresLogin = function(req, res, next){
    if(!req.isAuthenticated()){ //패스포트 내장 메서드인듯
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    next();
};

/*
exports.create = function(req, res, next){
    var user = new User(req.body); //값을 받아와서 인스턴스를 만들어준다.

    user.save(function(err){ //모델 인스턴스를 통해 연산
        if(err){
            return next(err);
        }else{
            res.json(user);
        }
    });
};*/
