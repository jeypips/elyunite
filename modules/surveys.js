angular.module('app-module',['bootstrap-growl','bootstrap-modal','form-validator','block-ui']).factory('form', function($http,$compile,$timeout,growl,bootstrapModal,validate,bui){

function form(){

	var self = this;
	
	self.data = function(scope) {

		scope.mode = null;
		
		scope.views = {};

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
			
		scope.survey = {};
		scope.survey.id = 0;

		scope.surveys = []; // list
		
	};
	
	self.list = function(scope) {
			
		bui.show();
		
		if (scope.$id > 2) scope = scope.$parent;	
		
		scope.views.list = true;
		scope.controls.btn.add = false;
		scope.controls.btn.edit = false;
		
		scope.survey = {};
		scope.survey.id = 0;
		
		$http({
		  method: 'GET',
		  url: 'api/surveys/list',
		}).then(function mySucces(response) {
			
			scope.surveys = response.data;
			
			bui.hide();
			
		}, function myError(response) {
			 
			bui.hide();
			
		});
		
		$('#x_content').load('lists/surveys.html', function() {
			$timeout(function() { $compile($('#x_content')[0])(scope); },100);								
			// instantiate datable
			/* $timeout(function() {
				$('#surveys').DataTable({
					"ordering": true
				});	
			},200); */
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
		
		scope.account = {};
		scope.account.id = 0;
		
		mode(scope,row);
		
		$('#x_content').load('forms/survey.html',function() {
			$timeout(function() { $compile($('#x_content')[0])(scope); },200);
		});
		
		if (row != null) {
			
			if (scope.$id > 2) scope = scope.$parent;				
			$http({
			  method: 'GET',
			  url: 'api/surveys/get/'+row.id,
			}).then(function mySucces(response) {
				
				scope.survey = response.data;
				bui.hide();
				
			}, function myError(response) {
				 
				bui.hide();
				
			});					
		};
		
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
			} else {
				growl.show('btn btn-success notika-btn-success waves-effect',{from: 'top', amount: 55},'Account Information successfully updated.');
			}
			mode(scope,scope.account);
			
		}, function myError(response) {
			 
		  // error
			
		});
		
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


};

return new form();

}); 