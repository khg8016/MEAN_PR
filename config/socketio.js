/**
 * Created by Jun on 2016-02-29.
 */
var config = require('./config'),
    cookieParkser = require('cookie-parser'),
    passport = require('passport');

module.exports = function (server, io, mongoStore) {
    io.use(function(socket, next){ //handshake 과정을 가로챔
       cookieParkser(config.sessionSecret)(socket.request, {}, function(err){ //socket.request는 http handshake를 표현함
           var sessionId = socket.request.signedCookies['connet.sid']; //쿠키파서를 통해 핸드셰이크 요청 쿠키를 해석하고 익스프레스 sessionId 인출

           mongoStore.get(sessionId, function(err, session){//익스프레스 세션id를 통해 이에 맞는 세션정보를 mongodb에서 빼옴(세션을 몽고스토어에 저장하기로 express에서 정의)
              socket.request.session = session;

               passport.initialize()(socket.request, {}, function(){
                   passport.session()(socket.request, {}, function(){ //세션 정보에따라 세션의 user객체를 채움
                       if(socket.request.user){
                           next(null, true); //socket연결을 initialize
                       } else {
                           next(new Error('User is not authenticated'), false);
                       }
                   });
               });
           });
       });
    });

    io.on('connection', function(socket){
        require('../app/controllers/chat.server.controller')(io, socket);
    });
};