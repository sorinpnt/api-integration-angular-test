var app = angular.module("studies",[ 'ui.router' , 'ngResource']);

/* ui-router routes config */
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

/* factory services declaration */
app.factory("userCredentials",[ function() {
	return {
		user : '',
		pass : '',
		securityToken : '',
		loginAttemptFailed : false,
	}
}]);

app.service("loginResource" , function(){
	this.user = '';
	this.pass = '';
	this.validCredentials = false;
	this.checkCredentials = function () {
		securityToken = '';
		if ( ( this.user.localeCompare('Manager') == 0 ) && ( this.pass.localeCompare('headware4') == 0 ) ) {
			securityToken = 'verb43dSDGreagtykhmpo4354g42qvfREGeqrg34ew78';
			this.validCredentials = true;
		}
		return securityToken;
	}
	this.setCredentials = function( user, pass ) {
		this.user = user;
		this.pass = pass;
	}
	this.loggedIn = function () {
		return this.validCredentials;
	}
});

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

/* controllers declaration */
app.controller("loginController",["$scope", "loginResource", "userCredentials", "$state", function( $scope, loginResource, userCredentials, $state ) {
	$scope.userCredentials = userCredentials;
	$scope.login = function() {
		loginResource.setCredentials($scope.userCredentials.user, $scope.userCredentials.pass);
		token = loginResource.checkCredentials();
		if ( token.localeCompare('') != 0 ) {
			$scope.userCredentials.loginAttemptFailed = false;
			$state.go('display-list');
		} else {
			$scope.userCredentials.loginAttemptFailed = true;
		}
	}
}]);

app.controller("coursesController",["$scope", "loginResource", "studyResource" ,"userCredentials", "$state", function( $scope, loginResource, $studyResource,userCredentials, $state) {
	if ( !loginResource.loggedIn() ) {
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

