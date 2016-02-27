/**
 * Created by Aplus on 2016-02-27.
 */
angular.module('articles').config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/articles', { //ng-view 만나면 실행. url은 ng-view 기준에서 url
        templateUrl: 'articles/views/list-articles.html'
    }).when('/articles/create', { //ng-view 만나면 실행. url은 ng-view 기준에서 url
        templateUrl: 'articles/views/create-article.client.view.html'
    }).when('/articles/:articleId', { //ng-view 만나면 실행. url은 ng-view 기준에서 url
        templateUrl: 'articles/views/view-article.client.view.html'
    }).when('/articles/:articleId/edit', { //ng-view 만나면 실행. url은 ng-view 기준에서 url
        templateUrl: 'articles/views/edit-article.html'
    });
}
]);