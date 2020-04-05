var app = angular.module('accounts',['account-module','app-module']);

app.run(function($rootScope) {

	$rootScope.store = {};

});

app.controller('accountsCtrl',function($rootScope,$scope,form) {
	
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
