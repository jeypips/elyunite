angular.module('app-module',['bootstrap-growl','bootstrap-modal','form-validator','block-ui']).factory('form', function($rootScope,$http,$compile,$timeout,growl,bootstrapModal,validate,bui){

	function form() {

		var self = this;
		
		self.data = function() {

			$rootScope.mode = null;
			
			$rootScope.views = {};
			$rootScope.views.currentPage = 1;

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
			
			$rootScope.store.office = {};
			$rootScope.store.office.id = 0;
			$rootScope.store.offices = [];
			
		};
		
		self.list = function() {
				
			bui.show();
			
			$rootScope.views.list = true;
			$rootScope.controls.btn.add = false;
			$rootScope.controls.btn.edit = false;
			
			$rootScope.store.office = {};
			$rootScope.store.office.id = 0;
			
			$http({
			  method: 'POST',
			  url: 'handlers/offices/list.php',
			}).then(function mySucces(response) {
				
				$rootScope.store.offices = angular.copy(response.data);	
				bui.hide();
				
			}, function myError(response) {
				 
				bui.hide();
				
			});
			
			$('#x_content').load('lists/offices.html', function() {

				$timeout(function() { $compile($('#x_content')[0])($rootScope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#offices').DataTable({
						"ordering": true
					});	
				},200);

			});				
			
		};
		
		function validate() {

			var controls = $rootScope.formHolder.office.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});
								 // change
			return $rootScope.formHolder.office.$invalid;
			
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
			
			$rootScope.store.office = {};
			$rootScope.store.office.id = 0;
			
			mode(row);
			
			$('#x_content').load('forms/office.html',function() {
				$timeout(function() { $compile($('#x_content')[0])($rootScope); },200);
			});

			if (row != null) {

				$http({
				  method: 'POST',
				  url: 'handlers/offices/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					$rootScope.store.office = angular.copy(response.data);
					bui.hide();
					
				}, function myError(response) {
					 
					bui.hide();
					
				});					
			};
			
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
				url: 'handlers/offices/save.php',
				data: {office: $rootScope.store.office}
			}).then(function mySucces(response) {
				
				if ($rootScope.store.office.id == 0) {
						$rootScope.store.office.id = response.data;
						growl.show('btn btn-success notika-btn-success waves-effect',{from: 'top', amount: 55},'Account Information successfully added.');
				} else {
						growl.show('btn btn-success notika-btn-success waves-effect',{from: 'top', amount: 55},'Account Information successfully updated.');
				}
				mode($rootScope.store.office);
				
			}, function myError(response) {
				 
			  // error
				
			});	
			
		};	
		
		self.delete = function(row) {
				
			var onOk = function() {
				
				$http({
				  method: 'POST',
				  url: 'handlers/offices/delete.php',
				  data: {id: [row.id]}
				}).then(function mySucces(response) {

					self.list();
					
					growl.show('btn btn-danger notika-btn-danger waves-effect',{from: 'top', amount: 55},'Office Information successfully deleted.');
					
				}, function myError(response) {
					 
				  // error
					
				});

			};

			bootstrapModal.confirm($rootScope,'Confirmation','Are you sure you want to delete this office?',onOk,function() {});
				
		};

	};

	return new form();

}); 