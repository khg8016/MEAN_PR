/**
 * Created by Aplus on 2016-02-16.
 */
'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    user = require('mongoose').model('User');

module.exports = function(){ //login할 때 쓰이는 전략
    passport.use(new LocalStrategy(function(username, password, done){ //local strategy의 세팅값을 설정하지 않으면 기본적으로 username과 password라는 필드 사용
        user.findOne({username: username}, function(err, user){
            if(err){
                return done(err);
            }
            if(!user){ //db에 해당 아이디가 조회되지 않는 경우
                return done(null, false, { //메세지는 flash 객체에 저장됨. 이 메세지는 'error' 객체에 저장되어있고 이 객체를 읽으려면 req.flash('error')를 통해 읽음
                    message : 'Unknown user'
                });
            }
            if(!user.authenticate(password)){ //비번 틀릴시에
                return done(null, false, {
                    message : 'invalid password' //flash 객체에 저장?
                });
            }
            console.log("local strategy");
            return done(null, user); //아마도 req.login 메서드가 자동으로 실행되나 봄. login 후에 user의 정보가 http session에 저장된다.

        });
    }));
};

/* passport.use(new LocalStrategy({
 usernameField : 'userid', //html 폼으로 어던 필드를 각각 사용자 id와 password로 읽어들일지 정의하는 옵션
 passwordField : 'password',
 passReqToCallback : true
 }
 ,function(req,userid, password, done) {
 if(userid=='hello' && password=='world'){
 var user = { 'userid':'hello',
 'email':'hello@world.com'};
 return done(null,user);
 }else{
 return done(null,false);
 }
 }
 ));*/