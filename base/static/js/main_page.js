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
	return $resource( 'http://localhost:8000/index/api/v1.0/courses/?format=json');
}]);

app.controller("loginController",["$scope", "userCredentials", "studyResource" , function( $scope, userCredentials, $studyResource) {
	$scope.login = function(){
		console.log($studyResource.get());
	}
}]);
