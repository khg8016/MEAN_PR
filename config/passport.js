/**
 * Created by Aplus on 2016-02-16.
 */
'use strict';

var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function(){
    var User = mongoose.model('User');

    passport.serializeUser(function(user, done){ //authnticate를 통해 use해 놓은 strategy로 login하고(req.login자동실행) 그다음 login성공할 경우 이 메서드를 통해 사용자 정보를 session에 저장
       //done(null, user.id); //session에 id속성 저장
        done(null, user);
    });

    passport.deserializeUser(function(user, done){ //인증 후(로그인 후) 페이지 접근시 마다 사용자 정보를 session에서 읽어옴
        /*User.findOne({_id : id}, '-password -salt', function(err, user){ //id속성을 통해 user 객체를 가져옴. field속성 의미는 password와 salt값을 가져오지 않겠다는 뜻.
            done(err, user);  //세션에서 읽은 내용 리턴
        });*/
        done(null, user);
    });

    require('./strategies/local')();
};