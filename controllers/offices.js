var app = angular.module('offices',['account-module','app-module']);

app.run(function($rootScope) {

	$rootScope.store = {};

});

app.controller('officesCtrl',function($rootScope,$scope,form) {

	$rootScope.views = {};
	$rootScope.formHolder = {};

	form.data();
	form.list();

	$rootScope.form = form;

});

/* app.filter('pagination', function() {
	  return function(input, currentPage, pageSize) {
	    if(angular.isArray(input)) {
	      var start = (currentPage-1)*pageSize;
	      var end = currentPage*pageSize;
	      return input.slice(start, end);
	    }
	  };
}); */