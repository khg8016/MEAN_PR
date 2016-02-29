/**
 * Created by Aplus on 2016-02-27.
 */
angular.module('articles').factory('Articles', ['$resource', function($resource){
    return $resource('api/articles/:articleId', {
        articleId: '@_id'
    }, {
        update: {
            method : 'PUT'
        }
    });
}]);