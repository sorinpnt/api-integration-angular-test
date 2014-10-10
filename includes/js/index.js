var app = angular.module("studies",[ /*'ui.router'] ,*/ 'ngResource']);

app.factory("userCredentials",[ function() {
	return {
		user : '',
		pass : '',
		securityToken : '',
		loginAttemptFailed : false,
	}
}]);

app.factory("studyResource", [ "$resource", function( $resource ) {
	return $resource( 'http://dev1core-1.h4cloud.com/v1/users/login.json');
}]);

app.controller("loginController",["$scope", "userCredentials", "studyResource" , function( $scope, userCredentials, $studyResource) {
	$scope.login = function(){
		userCredentials.loginAttemptFailed = true;
	}
}]);
