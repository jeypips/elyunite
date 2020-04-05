angular.module('app-module',['bootstrap-growl','bootstrap-modal','form-validator','block-ui']).factory('form', function($rootScope,$http,$compile,$timeout,growl,bootstrapModal,validate,bui){

function form(){

	var self = this;
	
	self.data = function() {

		$rootScope.mode = null;
		
		$rootScope.views = {};

		$rootScope.views.list = true;
			
		$rootScope.controls = {
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
			
		$rootScope.store.account = {};
		$rootScope.store.account.id = 0;

		$rootScope.store.accounts = [];
		
	};
	
	function groups() {

		$http({
			method: 'POST',
			url: 'api/suggestions/groups.php'
		}).then(function mySucces(response) {
			
			$rootScope.groups = response.data;
			
		},function myError(response) {
			
		});
		
	};
	
	function offices() {

		$http({
			method: 'POST',
			url: 'api/suggestions/offices.php'
		}).then(function mySucces(response) {
			
			$rootScope.offices = response.data;
			
		},function myError(response) {
			
		});
		
	};	
	
	function passwordMeter() {
		
		var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
		var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
		$rootScope.store.label = "";
		
		$rootScope.store.progress_bar_item_1 = {
			
			"display": "inline-block",
			"height": "100%",
			"width": "32.5%",
			"margin-right": ".8%",
			"border-radius": "5px",
			"float": "left",
			"transition": "background-color .2s, visisility .1s"
			  
		};
		
		$rootScope.store.progress_bar_item_2 = {
			
			"display": "inline-block",
			"height": "100%",
			"width": "32.5%",
			"margin-right": ".8%",
			"border-radius": "5px",
			"float": "left",
			"transition": "background-color .2s, visisility .1s"
			  
		};
		
		$rootScope.store.progress_bar_item_3 = {
			
			"display": "inline-block",
			"height": "100%",
			"width": "32.5%",
			"margin-right": ".8%",
			"border-radius": "5px",
			"float": "left",
			"transition": "background-color .2s, visisility .1s"
			  
		};
		
		$rootScope.store.analyze = function(value) {
		
			if(strongRegex.test(value)) {
				
				$rootScope.store.progress_bar_item_3["background-color"] = "#2DAF7D"; // green
				
				$rootScope.store.label = "Strong";
				$rootScope.store.color = "#2DAF7D";
				
			} else {
				
				$rootScope.store.label = "Medium";
				$rootScope.store.color = "#F9AE35";
				
				$rootScope.store.progress_bar_item_3 = {
			
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
				
				$rootScope.store.progress_bar_item_2["background-color"] = "#F9AE35"; // yellow
				
			} else {
				
				$rootScope.store.label = "Weak"
				
				$rootScope.store.color = "#FF4B47";
				
				$rootScope.store.progress_bar_item_2 = {
			
					"display": "inline-block",
					"height": "100%",
					"width": "32.5%",
					"margin-right": ".8%",
					"border-radius": "5px",
					"float": "left",
					"transition": "background-color .2s, visisility .1s"
					  
				};
				
			}
		
			if (value!=undefined) {

				$rootScope.store.progress_bar_item_1["background-color"] = "#FF4B47"; // red
				
			} else if (value==undefined) {
					
				$rootScope.store.label = "";
				
				$rootScope.store.progress_bar_item_1 = {
					
					"display": "inline-block",
					"height": "100%",
					"width": "32.5%",
					"margin-right": ".8%",
					"border-radius": "5px",
					"float": "left",
					"transition": "background-color .2s, visisility .1s"
					  
				};
				
				$rootScope.store.progress_bar_item_2 = {
					
					"display": "inline-block",
					"height": "100%",
					"width": "32.5%",
					"margin-right": ".8%",
					"border-radius": "5px",
					"float": "left",
					"transition": "background-color .2s, visisility .1s"
					  
				};
				
				$rootScope.store.progress_bar_item_3 = {
					
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
	
	self.list = function() {
			
		bui.show();
		
		$rootScope.views.list = true;
		$rootScope.controls.btn.add = false;
		$rootScope.controls.btn.edit = false;
		
		$rootScope.store.account = {};
		$rootScope.store.account.id = 0;
		
		$http({
		  method: 'POST',
		  url: 'handlers/accounts/list.php',
		}).then(function mySucces(response) {
			
			$rootScope.store.accounts = angular.copy(response.data);
			
			bui.hide();
			
		}, function myError(response) {
			 
			bui.hide();
			
		});
		
		$('#x_content').load('lists/accounts.html', function() {
			$timeout(function() { $compile($('#x_content')[0])($rootScope); },100);								
			// instantiate datable
			$timeout(function() {
				$('#account').DataTable({
					"ordering": true
				});	
			},200);
			
		});				
		
	};
	
	function validate() {
									// change
		var controls = $rootScope.formHolder.account.$$controls;
		
		angular.forEach(controls,function(elem,i) {
			
			if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
								
		});
							 // change
		return $rootScope.formHolder.account.$invalid;
		
	};
	
	function mode(row) {
			
		if (row == null) {
			$rootScope.controls.ok.label = 'Save';
			$rootScope.controls.ok.btn = false;
			$rootScope.controls.cancel.label = 'Cancel';
			$rootScope.controls.cancel.btn = false;
			$rootScope.controls.btn.add = true;
			$rootScope.controls.btn.edit = true;
		} else {
			$rootScope.controls.ok.label = 'Update';
			$rootScope.controls.ok.btn = true;
			$rootScope.controls.cancel.label = 'Close';
			$rootScope.controls.cancel.btn = false;	
			$rootScope.controls.btn.edit = false;			
		}
		
	};
	
	self.addEdit = function(row) {

		bui.show();
		
		passwordMeter();
		
		$rootScope.store.account = {};
		$rootScope.store.account.id = 0;
		
		mode(row);
		
		$('#x_content').load('forms/account.html',function() {
			$timeout(function() { $compile($('#x_content')[0])($rootScope); },200);
		});
		
		if (row != null) {

			$http({
			  method: 'POST',
			  url: 'handlers/accounts/view.php',
			  data: {id: row.id}
			}).then(function mySucces(response) {
				
				$rootScope.store.account = angular.copy(response.data);
				bui.hide();
				
			}, function myError(response) {
				 
				bui.hide();
				
			});					
		};
		
		groups();
		offices();
		
		bui.hide();
	
	};
	
	self.cancel = function() {

		self.list();

	};
	
	self.edit = function() {
			
		$rootScope.controls.ok.btn = !$rootScope.controls.ok.btn;
		$rootScope.controls.btn.edit = true;
		
	};
		
	self.save = function() {
		
		if (validate()){ 
			growl.show('btn btn-danger notika-btn-danger waves-effect',{from: 'top', amount: 55},' Please complete required fields.');
			return;
		}
		
		$http({
			method: 'POST',
			url: 'handlers/accounts/save.php',
			data: {account: $rootScope.store.account}
		}).then(function mySucces(response) {
			
			if ($rootScope.store.account.id == 0) {
				$rootScope.store.account.id = response.data;
				growl.show('btn btn-success notika-btn-success waves-effect',{from: 'top', amount: 55},'Account Information successfully added.');
			} else {
				growl.show('btn btn-success notika-btn-success waves-effect',{from: 'top', amount: 55},'Account Information successfully updated.');
			}
			mode($rootScope.store.account);
			
		}, function myError(response) {
			 
		  // error
			
		});	
		
	};	
	
	self.delete = function(row) {
			
		var onOk = function() {						
			
			$http({
			  method: 'POST',
			  url: 'handlers/accounts/delete.php',
			  data: {id: [row.id]}
			}).then(function mySucces(response) {

				self.list();
				
				growl.show('btn btn-danger notika-btn-danger waves-effect',{from: 'top', amount: 55},'Account Information successfully deleted.');
				
			}, function myError(response) {
				 
			  // error
				
			});

		};

		bootstrapModal.confirm($rootScope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
	};
	
	self.inputType = 'password';
		  
	self.hideShowPassword = function() {
			
		if (self.inputType == 'password'){
			self.inputType = 'text';
		}else{
			self.inputType = 'password';
		};
	};


};

return new form();

}); 