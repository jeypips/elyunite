var app = angular.module('surveys',['xeditable','account-module','app-module']);

app.run(function($rootScope,editableOptions) {
  editableOptions.theme = 'bs4';
});

app.controller('surveysCtrl',function($rootScope,$scope,form) {
	
	$rootScope.views = {};
	$rootScope.formHolder = {};
	
	form.data();
	form.list();
	
	$rootScope.form = form;

});

app.filter('pagination', function() {
	  return function(input, currentPage, pageSize) {
	    if(angular.isArray(input)) {
	      var start = (currentPage-1)*pageSize;
	      var end = currentPage*pageSize;
	      return input.slice(start, end);
	    }
	  };
});
