/**
 * Created by Jun on 2016-02-24.
 */
angular.module('example').config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
          templateUrl: 'example/views/example.client.view.html'
    }).otherwise({
        redirectTo: '/'
    });
}
]);