/**
 * Created by Jun on 2016-02-29.
 */

module.exports = function(io, socket){
    io.emit('chatMessage', { //소켓이 새로 연결되었을 때 chatMessage라는 이벤트로 각 클라이언트에게 전송
        type: 'status',
        text: 'connected',
        created: Date.now(),
        username: socket.request.user.username
    });

    socket.on('chatMessage', function(message){ //소켓클라이언트로부터 chatMessage라는 이벤트가 왔을 때에 대한 핸들러 등록
        message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;

        io.emit('chatMessage', message);
    });

    socket.on('disconnect', function(){
        io.emit('chatMessage', {
            type: 'status',
            text: 'disconnected',
            created: Date.now(),
            username: socket.request.user.username
        });
    });
};