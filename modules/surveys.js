angular.module('app-module',['ui.bootstrap','ngSanitize','checklist-model','bootstrap-growl','bootstrap-modal','form-validator','block-ui']).factory('form', function($http,$compile,$timeout,growl,bootstrapModal,validate,bui){

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
			}
		};
			
		scope.survey = {};
		scope.survey.id = 0;

		scope.surveys = []; // list
		
		scope.pagination = {};
		scope.pagination.surveys = {};
		scope.pagination.currentPages = {};
		scope.pagination.currentPages.surveys = 1;
		
		scope.search = {};
		
		scope.checks = {};
		scope.checks.items = [];

		scope.demographics_items = [];
		demographics_items(scope);
		
		scope.add = {};
		scope.add.demographic = {};

	};
	
	self.chkSelected = function(scope) {
		
		if (scope.$id>2) scope = scope.$parent;
		console.log(scope.checks);
		
	};
	
	self.list = function(scope,view=true) {
			
		bui.show();
		
		if (scope.$id > 2) scope = scope.$parent;	
		
		scope.pagination.surveys.currentPage = scope.pagination.currentPages.surveys;
		scope.pagination.surveys.pageSize = 10;
		scope.pagination.surveys.maxSize = 3;
		
		scope.survey = {};
		scope.survey.id = 0;
		
		$http({
		  method: 'GET',
		  url: 'api/surveys/list',
		}).then(function mySucces(response) {

			scope.surveys = angular.copy(response.data);	

			scope.pagination.surveys.filterData = scope.surveys;
			scope.pagination.surveys.currentPage = scope.pagination.currentPages.surveys;

			bui.hide();
			
		}, function myError(response) {
			 
			bui.hide();
			
		});
		
		if (view) {
		
			$('#x_content').load('lists/surveys.html', function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },500);
			});
			
		};
		
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
		} else {
			scope.controls.ok.label = 'Update';
			scope.controls.ok.btn = true;
			scope.controls.cancel.label = 'Close';
			scope.controls.cancel.btn = false;			
		}
		
	};
	
	self.add = function(scope) {
		
		bui.show();
		
		$('#survey-main').load('forms/survey.html', function() {
			$compile($('#survey-main')[0])(scope);			
			$timeout(function() {
				$('#select-demo').selectpicker();
			},500);
		});		
		
		bui.hide();
		
	};
	
	function demographics_items(scope) {

		$http({
			url: 'api/surveys/demographics/items',
			method: 'GET'
		}).then(function success(response) {

			scope.demographics_items = response.data;

		}, function error(response) {

		});

	};

	self.edit = function(scope) {		
		
		if (scope.checks.items.length==0) {
			
			growl.show('btn btn-danger notika-btn-danger waves-effect',{from: 'top', amount: 55},' Please select a survey');
			return;
			
		};
		
		if (scope.checks.items.length>1) {
			
			growl.show('btn btn-danger notika-btn-danger waves-effect',{from: 'top', amount: 55},' Please select only one survey');
			return;
			
		};

		
		
	};	
	
	self.addEdit = function(scope,row) {

		bui.show();
		
		scope.survey = {};
		scope.survey.id = 0;
		
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
		
		if (scope.checks.items.length==0) {
			
			growl.show('btn btn-danger notika-btn-danger waves-effect',{from: 'top', amount: 55},' Please select a survey');
			return;
			
		};	
		
		var onOk = function() {
			
			if (scope.$id > 2) scope = scope.$parent;			
			
			scope.pagination.currentPages.surveys = scope.pagination.surveys.currentPage;
			
			$http({
			  method: 'POST',
			  url: 'api/surveys/delete',
			  data: {id: scope.checks.items}
			}).then(function mySucces(response) {

				self.list(scope);
				
				growl.show('btn btn-danger notika-btn-danger waves-effect',{from: 'top', amount: 55},'Survey(s) successfully deleted.');
				
			}, function myError(response) {
				 
			  // error
				
			});

		};

		bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this survey?',onOk,function() {});
			
	};


};

return new form();

}); 