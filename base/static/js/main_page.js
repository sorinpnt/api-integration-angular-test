var app = angular.module("studies",[ 'ui.router' , 'ngResource']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('login/');

    $stateProvider
        .state('login', {
            url: '/login/',
            templateUrl: '../static/views/log_in.html',
        	controller : 'loginController', 
        })
        .state('display-list', {
        	url: '/list/',
        	templateUrl: '../static/views/list_display.html',
        	controller : 'coursesController', 
        })
        .state('404', {
        	url: '/404',
        	templateUrl: '../static/views/error.html',
        });
});

app.factory("userCredentials",[ function() {
	return {
		user : '',
		pass : '',
		securityToken : '',
		loginAttemptFailed : false,
	}
}]);

app.factory("studyResource", [ "$resource", function( $resource ) {
	return $resource( 'http://localhost:8000/index/api/v1.0/courses/?format=json',{},{
		getElements : {
			url : 'http://localhost:8000/index/api/v1.0/courses/?format=json',
			method : 'get',
			responseType: 'application/json; charset=UTF-8',
			isArray : false
		}
	});
}]);

app.controller("loginController",["$scope", "userCredentials", "studyResource" ,"$state", function( $scope, userCredentials, $studyResource, $state ) {

	$scope.login = function() {
		console.log(userCredentials.user);
		if (( userCredentials.user === "Manager") && (userCredentials.pass === "headware4")) {
			userCredentials.securityToken = 'ewfw#@sfs32saSdaASfewc32saSAf332greg';
			userCredentials.loginAttemptFailed = false;
			$state.go('display-list');
			console.log("GATU MATII");
		} else {
			userCredentials.loginAttemptFailed = true;console.log("CRISTOSI");
		}
	}

}]);

app.controller("coursesController",["$scope", "userCredentials", "studyResource" ,"$state", function( $scope, userCredentials, $studyResource, $state) {
	if (userCredentials.securityToken === '') {
		$state.go('login');
	}
	$studyResource.getElements(function(data){
		$scope.courses = data.objects;
	});
		
	$scope.edit = function(id) {
		console.log(id);
	}
	$scope.delete = function(id) {
		console.log(id);
	}
}]);

