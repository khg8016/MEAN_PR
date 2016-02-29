/**
 * Created by Jun on 2016-02-29.
 */

angular.module('chat').service('Socket', ['Authentication', '$location', '$timeout', function(Authentication, $location, $timeout){
    if(Authentication.user){
        this.socket = io(); //이 서비스의 socket 속성 설정
    } else {
        $location.path('/');
    }
    this.on = function(eventName, callback){
        if(this.socket) {
            this.socket.on(eventName, function(data){
                $timeout(function(){
                    callback(data);
                });
            });
        }
    };

    this.emit = function(eventName, data){
        if(this.socket){
            this.socket.emit(eventName, data);
        }
    };

    this.removeListener = function(eventName){
        if(this.socket) {
            this.socket.removeListener(eventName);
        }
    };

}]);