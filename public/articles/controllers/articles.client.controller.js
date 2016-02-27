/**
 * Created by Aplus on 2016-02-27.
 */

angular.module('articles').controller('ArticleController', ['$scope', '$routeParams', '$location', 'Authentication', 'Articles',
    function($scope, $routeParams, $location, Authentication, Articles){
        $scope.authentication = Authentication;

        $scope.create = function(){
            var article = new Articles({ // Articles는 하나의 자원임(/api/articles에 연결된) title과 content를 담음. 그리고 save를 통해 post요청 보내면 이 객체가 json으로 req.body에 담김
                title: this.title,
                content: this.content
            });
                //articleId를 안담아줬기 때문에 그냥 /api/articles에다가 post요청(save니까 post)
            article.$save(function(response){ //route에서 정의한 post요청 되서 article.create되고 디비에 저장됨
                $location.path('/articles/' + response._id); //해당 url로 이동
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.articles = Articles.query(); //query는 api/articles에 get요청을 보내 배열 형태로 전부다 가져옴
        };

        $scope.findOne = function() {
            $scope.article = Articles.get({articleId : $routeParams.articleId}); //$routeParams 는 ngRoute 모듈이 제공하며 현재 url 경로의 매개변수 값을 얻는데 사용 :이거 말하는 것 같음  get은 매개변수를 가지는 url에만 접근해서 가져옴
        };

        $scope.update = function(){
          $scope.article.$update(function(response){ //route에서 정의한 post요청 되서 article.create되고 디비에 저장됨
              $location.path('/articles/' + response._id); //생성된 글을 표현할 라우터 탐색
          }, function(errorResponse){
              $scope.error = errorResponse.data.message;
          });
        };

        $scope.delete = function(article){
            if(article){ // 사용자 목록에서 지움. 지울거 선택할 떄 선택한놈을 파라미터로 넘겨줌
                article.$remove(function(){
                    for(var i in $scope.articles){
                        if($scope.articles[i] === article){
                            $scope.articles.splice(i, 1);
                        }
                    }
                });
            } else { //$scope.article은 특정 article로 들어간거임. 거기서 지우는 거
                $scope.article.$remove(function (){
                    $location.path('articles');
                });
            }
        }
    }]);

