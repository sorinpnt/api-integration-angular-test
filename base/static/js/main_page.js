'use strict';
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
        	cache : false
        })
        .state('edit-course', {
        	url: '/edit/:id',
        	templateUrl: '../static/views/edit_course.html',
        	controller : 'editCourseController', 
        })
        .state('404', {
        	url: '/404/',
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

app.factory("course",[ function() {
	return 	{
	    authorId: 0,
	    authorName: "",
	    created: "",
	    displayOrder: 0,
	    id: 0,
	    liveActivities: 0,
	    liveStatus: 0,
	    modified: "",
	    status: 0,
	    title: "",
	    total_activities: 0,
	    isEditable : false
	}
}]);

app.service("loginResource" , function(){
	this.user = '';
	this.pass = '';
	this.validCredentials = false;
	this.checkCredentials = function () {
		var securityToken = null;
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
	return $resource( 'http://localhost:8000/index/api/v1.0/courses/?format=json',{ },
		{
			getElements : {
				url : 'http://localhost:8000/index/api/v1.0/courses/?format=json',
				method : 'get',
				responseType: 'application/json; charset=UTF-8',
				isArray : false,
				cache : false
			},
			get : {
				url : 'http://localhost:8000/index/api/v1.0/courses/:id/?format=json',
				method : 'get',
				responseType: 'application/json; charset=UTF-8',
				isArray : false,
				params : {
					id : '@id'
				}
			},
			update : {
				url : 'http://localhost:8000/index/api/v1.0/courses/:id/?format=json',
				params : {
					id : '@id'
				},
				method : 'put'
			},
		}
	);
}]);
/* controllers declaration */
app.controller("loginController",["$scope", "loginResource", "userCredentials", "$state", function( $scope, loginResource, userCredentials, $state ) {
	$scope.userCredentials = userCredentials;
	$scope.login = function() {
		loginResource.setCredentials($scope.userCredentials.user, $scope.userCredentials.pass);
		if ( loginResource.checkCredentials() ) {
			$scope.userCredentials.loginAttemptFailed = false;
			$state.go('display-list');
		} else {
			$scope.userCredentials.loginAttemptFailed = true;
		}
	}
}]);

app.controller("coursesController",["$scope", "loginResource", "course", "studyResource" , "$state", function( $scope, loginResource, course, $studyResource, $state) {
	if ( !loginResource.loggedIn() ) {
		$state.go('login');
	}

	course.isEditable = false;

	$studyResource.getElements(function(data){
		$scope.courses = data.objects;
	});
		
	$scope.edit = function(id) {
		course.isEditable = true;
		$state.go('edit-course', {id: id});
	}
	$scope.delete = function(id) {
		console.log(id);
	}
}]);

app.controller("editCourseController",[ "$scope", "course" ,"loginResource", "studyResource" , "$state",  "$stateParams", "$filter", 
							  function( $scope, course, loginResource, $studyResource, $state, $stateParams, $filter) {

	if ( !loginResource.loggedIn() ) {
		$state.go('login');
	}
	$scope.isEditable = !course.isEditable;

	$studyResource.get( { id : $stateParams.id }).$promise
	.then(function(data) {
		$scope.course = data;
	}, function(error) {
	   $state.go('404');
	});

	$scope.saveEdit = function() {
		$studyResource.update({id : $stateParams.id }, $scope.course);console.log($scope.course)
		$state.go('display-list');
	}
	
	$scope.cancelEdit = function() {
		$state.go('display-list');
	}
	
}]);
