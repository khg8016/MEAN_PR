/**
 * Created by Jun on 2016-02-29.
 */

angular.module('chat').config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/chat', {
        templateUrl: 'chat/views/chat.client.view.html'
    });
}]);