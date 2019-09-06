var app = angular.module('dashboard',['account-module','app-module']);

app.controller('dashboardCtrl',function($scope,form) {

	form.data($scope);
	$scope.form = form;
	
	
});