/**
 * Created by Jun on 2016-02-24.
 */
angular.module('example').controller('ExampleController', ['$scope', 'Authentication', //view에서 ng-controller= ExampleController 만나면 실행
    function($scope, Authentication){
      $scope.name= Authentication.user ? Authentication.user.username : 'Please login';
    }
]);