angular.module('app-module',['bootstrap-growl','bootstrap-modal','form-validator','block-ui']).factory('form', function($http,$compile,$timeout,growl,bootstrapModal,validate,bui){

function form(){

	var self = this;
	
	self.data = function(scope){

		scope.mode = null;
		
		scope.views = {};
		scope.views.currentPage = 1;

		scope.views.list = true;
			
		scope.controls = {
			ok: {
				btn: false,
				label: 'Save'
			},
			cancel: {
				btn: false,
				label: 'Cancel'
			},
			btn: {
				add: false,
				edit: false
			},
		};
			
		scope.account = {};
		scope.account.id = 0;

		scope.accounts = []; // list
		
	};
	
	function groups(scope){
		
		$http({
			method: 'POST',
			url: 'api/suggestions/groups.php'
		}).then(function mySucces(response) {
			
			scope.groups = response.data;
			
		},function myError(response) {
			
		});
		
	};
	
	function passwordMeter(scope){
		
		var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
		var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
		scope.label = "";
		
		scope.progress_bar_item_1 = {
			
			"display": "inline-block",
			"height": "100%",
			"width": "32.5%",
			"margin-right": ".8%",
			"border-radius": "5px",
			"float": "left",
			"transition": "background-color .2s, visisility .1s"
			  
		};
		
		scope.progress_bar_item_2 = {
			
			"display": "inline-block",
			"height": "100%",
			"width": "32.5%",
			"margin-right": ".8%",
			"border-radius": "5px",
			"float": "left",
			"transition": "background-color .2s, visisility .1s"
			  
		};
		
		scope.progress_bar_item_3 = {
			
			"display": "inline-block",
			"height": "100%",
			"width": "32.5%",
			"margin-right": ".8%",
			"border-radius": "5px",
			"float": "left",
			"transition": "background-color .2s, visisility .1s"
			  
		};
		
		scope.analyze = function(value) {
		
			if(strongRegex.test(value)) {
				
				scope.progress_bar_item_3["background-color"] = "#2DAF7D"; // green
				
				scope.label = "Strong";
				scope.color = "#2DAF7D";
				
			} else {
				
				scope.label = "Medium";
				scope.color = "#F9AE35";
				
				scope.progress_bar_item_3 = {
			
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
				
				scope.progress_bar_item_2["background-color"] = "#F9AE35"; // yellow
				
			} else {
				
				scope.label = "Weak"
				
				scope.color = "#FF4B47";
				
				scope.progress_bar_item_2 = {
			
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

				scope.progress_bar_item_1["background-color"] = "#FF4B47"; // red
				
			} else if (value==undefined) {
					
				scope.label = "";
				
				scope.progress_bar_item_1 = {
					
					"display": "inline-block",
					"height": "100%",
					"width": "32.5%",
					"margin-right": ".8%",
					"border-radius": "5px",
					"float": "left",
					"transition": "background-color .2s, visisility .1s"
					  
				};
				
				scope.progress_bar_item_2 = {
					
					"display": "inline-block",
					"height": "100%",
					"width": "32.5%",
					"margin-right": ".8%",
					"border-radius": "5px",
					"float": "left",
					"transition": "background-color .2s, visisility .1s"
					  
				};
				
				scope.progress_bar_item_3 = {
					
					"display": "inline-block",
					"height": "100%",
					"width": "32.5%",
					"margin-right": ".8%",
					"border-radius": "5px",
					"float": "left",
					"transition": "background-color .2s, visisility .1s"
					  
				};
				
			}
		
		};
	};
	
	self.list = function(scope) {
			
		bui.show();
		
		if (scope.$id > 2) scope = scope.$parent;	
		
		scope.views.list = true;
		scope.controls.btn.add = false;
		scope.controls.btn.edit = false;
		
		scope.account = {};
		scope.account.id = 0;
		
		scope.currentPage = scope.views.currentPage;
		scope.pageSize = 10;
		scope.maxSize = 5;
		
		$http({
		  method: 'POST',
		  url: 'handlers/accounts/list.php',
		}).then(function mySucces(response) {
			
			scope.accounts = angular.copy(response.data);
			scope.filterData = scope.accounts;
			scope.currentPage = scope.views.currentPage;
			
			bui.hide();
			
		}, function myError(response) {
			 
			bui.hide();
			
		});
		
		$('#x_content').load('lists/accounts.html', function() {
			$timeout(function() { $compile($('#x_content')[0])(scope); },100);								
			// instantiate datable
			$timeout(function() {
				$('#account').DataTable({
					"ordering": true
				});	
			},200);
			
		});				
		
	};
	
	function validate(scope) {
									// change
		var controls = scope.formHolder.account.$$controls;
		
		angular.forEach(controls,function(elem,i) {
			
			if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
								
		});
							 // change
		return scope.formHolder.account.$invalid;
		
	};
	
	function mode(scope,row) {
			
		if (row == null) {
			scope.controls.ok.label = 'Save';
			scope.controls.ok.btn = false;
			scope.controls.cancel.label = 'Cancel';
			scope.controls.cancel.btn = false;
			scope.controls.btn.add = true;
			scope.controls.btn.edit = true;
		} else {
			scope.controls.ok.label = 'Update';
			scope.controls.ok.btn = true;
			scope.controls.cancel.label = 'Close';
			scope.controls.cancel.btn = false;	
			scope.controls.btn.edit = false;			
		}
		
	};
	
	self.addEdit = function(scope,row) {

		bui.show();
		
		passwordMeter(scope);
		
		scope.account = {};
		scope.account.id = 0;
		
		mode(scope,row);
		
		$('#x_content').load('forms/account.html',function() {
			$timeout(function() { $compile($('#x_content')[0])(scope); },200);
		});
		
		if (row != null) {
			
			if (scope.$id > 2) scope = scope.$parent;				
			$http({
			  method: 'POST',
			  url: 'handlers/accounts/view.php',
			  data: {id: row.id}
			}).then(function mySucces(response) {
				
				angular.copy(response.data, scope.account);
				bui.hide();
				
			}, function myError(response) {
				 
				bui.hide();
				
			});					
		};
		
		groups(scope);
		
		bui.hide();
	
	};
	
	self.cancel = function(scope) {

		self.list(scope);

	};
	
	self.edit = function(scope) {
			
		scope.controls.ok.btn = !scope.controls.ok.btn;
		scope.controls.btn.edit = true;
		
	};
		
	self.save = function(scope) {
		
		if (validate(scope)){ 
			growl.show('btn btn-danger notika-btn-danger waves-effect',{from: 'top', amount: 55},' Please complete required fields.');
			return;
		}
		
		$http({
		  method: 'POST',
		  url: 'handlers/accounts/save.php',
		data: {account: scope.account}
		}).then(function mySucces(response) {
			
			if (scope.account.id == 0) {
					scope.account.id = response.data;
					growl.show('btn btn-success notika-btn-success waves-effect',{from: 'top', amount: 55},'Account Information successfully added.');
				}	else{
					growl.show('btn btn-success notika-btn-success waves-effect',{from: 'top', amount: 55},'Account Information successfully updated.');
				}
			mode(scope,scope.account);
			
		}, function myError(response) {
			 
		  // error
			
		});	

		console.log(scope.account.password.length);		
		
	};	
	
	self.delete = function(scope,row) {
			
		var onOk = function() {
			
			if (scope.$id > 2) scope = scope.$parent;			
			
			$http({
			  method: 'POST',
			  url: 'handlers/accounts/delete.php',
			  data: {id: [row.id]}
			}).then(function mySucces(response) {

				self.list(scope);
				
				growl.show('btn btn-danger notika-btn-danger waves-effect',{from: 'top', amount: 55},'Account Information successfully deleted.');
				
			}, function myError(response) {
				 
			  // error
				
			});

		};

		bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
	};
	
	self.inputType = 'password';
		  
	self.hideShowPassword = function(scope){
			
		if (self.inputType == 'password'){
			self.inputType = 'text';
		}else{
			self.inputType = 'password';
		};
	};


};

return new form();

}); 