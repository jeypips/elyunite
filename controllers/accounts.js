var app = angular.module('accounts',['account-module','app-module']);

app.controller('accountsCtrl',function($scope,form) {
	
	$scope.views = {};
	$scope.formHolder = {};
	
	form.data($scope);
	form.list($scope);
	
	$scope.form = form;
	
	/* var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
	$scope.label = "";
	
	$scope.progress_bar_item_1 = {
		
		"display": "inline-block",
		"height": "100%",
		"width": "32.5%",
		"margin-right": ".8%",
		"border-radius": "5px",
		"float": "left",
		"transition": "background-color .2s, visisility .1s"
		  
	};
	
	$scope.progress_bar_item_2 = {
		
		"display": "inline-block",
		"height": "100%",
		"width": "32.5%",
		"margin-right": ".8%",
		"border-radius": "5px",
		"float": "left",
		"transition": "background-color .2s, visisility .1s"
		  
	};
	
	$scope.progress_bar_item_3 = {
		
		"display": "inline-block",
		"height": "100%",
		"width": "32.5%",
		"margin-right": ".8%",
		"border-radius": "5px",
		"float": "left",
		"transition": "background-color .2s, visisility .1s"
		  
	};
	
	$scope.analyze = function(value) {
		
		if(strongRegex.test(value)) {
			
			$scope.progress_bar_item_3["background-color"] = "#2DAF7D"; // green
			
			
			
		} else{
			
			$scope.progress_bar_item_3 = {
		
				"display": "inline-block",
				"height": "100%",
				"width": "32.5%",
				"margin-right": ".8%",
				"border-radius": "5px",
				"float": "left",
				"transition": "background-color .2s, visisility .1s"
				  
			};
			
		}
		
		if(mediumRegex.test(value)) {
			
			$scope.progress_bar_item_2["background-color"] = "#F9AE35"; // green
			
			
		} else {
			
			$scope.progress_bar_item_2 = {
		
				"display": "inline-block",
				"height": "100%",
				"width": "32.5%",
				"margin-right": ".8%",
				"border-radius": "5px",
				"float": "left",
				"transition": "background-color .2s, visisility .1s"
				  
			};
			
		}
	
		if(value!=undefined) {
			
			$scope.progress_bar_item_1["background-color"] = "#FF4B47"; // red
			
		} else if (value==undefined) {
			
			$scope.progress_bar_item_1 = {
				
				"display": "inline-block",
				"height": "100%",
				"width": "32.5%",
				"margin-right": ".8%",
				"border-radius": "5px",
				"float": "left",
				"transition": "background-color .2s, visisility .1s"
				  
			};
			
			$scope.progress_bar_item_2 = {
				
				"display": "inline-block",
				"height": "100%",
				"width": "32.5%",
				"margin-right": ".8%",
				"border-radius": "5px",
				"float": "left",
				"transition": "background-color .2s, visisility .1s"
				  
			};
			
			$scope.progress_bar_item_3 = {
				
				"display": "inline-block",
				"height": "100%",
				"width": "32.5%",
				"margin-right": ".8%",
				"border-radius": "5px",
				"float": "left",
				"transition": "background-color .2s, visisility .1s"
				  
			};
			
		} */
		
		/* 
		if(strongRegex.test(value)) {
			
			$scope.progress_bar_item_3["background-color"] = "#2DAF7D"; // green
			
			
		} else if(mediumRegex.test(value)) {
			
			$scope.progress_bar_item_2["background-color"] = "#F9AE35"; // yellow
			
		} else {
			
			$scope.progress_bar_item_1["background-color"] = "#FF4B47"; // red
			
		}
		
		
	}; */

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
