var mainApplicationModuleNmae = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleNmae, ['example']); //모듈 생성

angular.element(document).ready(function(){ 
	angular.bootstrap(document, [mainApplicationModuleNmae]); //앞서 정의한 모듈로 angular 어플리케이션 시작
});