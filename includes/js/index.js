var app = angular.module("studies",[ /*'ui.router'] ,*/ 'ngResource']);

app.factory("user_credentials",[ function() {
	return {
		user : '',
		pass : '',
		security_token : '',
	}
}]);

app.factory("study_resource", [ "$resource", function( $resource ) {
	return $resource( 'http://dev1core-1.h4cloud.com/v1/users/login.json', { 
			user : "@user",
			pass : "@pass"
		}, { 
			login: { 
				method: 'POST', 
				params: { 
					username: '@user',
					password: '@pass'
				}, 
				isArray: false 
			}
			/* , method2: { ... } */
		});
}]);

app.controller("login_controller",["$scope", "user_credentials", "study_resource" , function( $scope, user_credentials, $res) {
	$scope.user_credentials = user_credentials;
	$scope.login = function(){
		console.log("Logging in [" + $scope.user_credentials.user + "," + $scope.user_credentials.pass + "]");
		$res.login({
			username : $scope.user_credentials.user,
			password : $scope.user_credentials.pass
		}, function(value, responseHeaders) {
				// do things when user and pass are ok
		}, function(httpResponse) {
				console.log( httpResponse);
		});
	}
}]);
