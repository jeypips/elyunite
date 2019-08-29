var app = angular.module('profileSettings',['account-module','app-module']);

app.controller('profileSettingsCtrl',function($scope,form) {
	
	$scope.formHolder = {};

	form.data($scope);
	$scope.form = form;
	
});
