/**
 * Created by Jun on 2016-02-29.
 */

angular.module('chat').controller('ChatController', ['$scope', 'Socket', function($scope, Socket){
    $scope.message = [];

    Socket.on('chatMessage', function(message){
       $scope.message.push(message);
    });

    $scope.sendMessage = function(){
        var message = {
            text: this.messageText //this.messageText는 ng model임
        };
        Socket.emit('chatMessage', message);

        this.messageText = '';
    };

    $scope.$on('$destroy', function(){
        Socket.removeListener('chatMessage');
    });

}]);