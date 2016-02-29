/**
 * Created by Jun on 2016-02-24.
 */
angular.module('example').config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', { //ng-view 만나면 실행. url은 ng-view 기준에서 url
          templateUrl: 'example/views/example.client.view.html'
    }).otherwise({
        redirectTo: '/'
    });
}
]);