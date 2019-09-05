angular.module('app-module',['bootstrap-growl','bootstrap-modal','form-validator','block-ui']).factory('form', function($compile,$timeout,$http,growl,bootstrapModal,validate,bui,$q,$window) {
	
	function form() {
		
		var self = this;
		
		self.data = function(scope) { // initialize data			
			
			scope.formHolder = {};
			
			scope.settings = {};
			scope.settings.btns = {};
			
			scope.settings.btns.info = {
				edit: true,
				
			};			
			
			scope.settings.btns.security = {
				edit: true,
			};
			
			// info
			scope.settings.info = {};
			
			scope.settings.info.alert = {};
			scope.settings.info.alert.show = false;
			scope.settings.info.alert.message = '';
			
			scope.settings.info.not_unique = false;
		
			// security
			scope.settings.security = {};
			
			scope.settings.security.alert = {};
			
			scope.settings.security.alert.opw = {};
			scope.settings.security.alert.opw.show = false;
			scope.settings.security.alert.opw.message = '';
			scope.settings.security.alert.opw.required = false;
			
			scope.settings.security.alert.password = {};
			scope.settings.security.alert.password.show = false;
			scope.settings.security.alert.password.message = '';
			
			scope.settings.security.alert.opw.correct = false;			
			scope.settings.security.alert.password.correct = false;		
			scope.settings.security.alert.password.okMin = false;		
			
			self.info.load(scope);
			
			watchInfo(scope);
			
			watchSecurity(scope);
			
		};
		
		function watchInfo(scope) {
			
			$timeout(function() {
			
				scope.$watch(function(scope) {
					
					return scope.settings.info.username;
					
				},function(newValue, oldValue) {
					
					username_is_unique(scope).then(function(res) {
						
						scope.settings.info.not_unique = res;
						
					}, function(res) {
						
					});

					scope.settings.info.alert.show = false;
					scope.settings.info.alert.message = '';

					if (belowMinChar(newValue,2)) {

						scope.settings.info.alert.show = true;
						scope.settings.info.alert.message = 'Username must be at least 2 characters';
						
					};
					
					if (hasSpace(newValue)) {
						
						scope.settings.info.alert.show = true;
						scope.settings.info.alert.message = 'Space is not allowed';						
						
					};
					
				});

			}, 1000);			
			
		};
		
		function watchSecurity(scope) {			
			
			$timeout(function() {			
			
				scope.$watch(function(scope) {
					
					return scope.settings.security.opw;
					
				},function(newValue, oldValue) {

					scope.settings.security.alert.opw.show = false;
					scope.settings.security.alert.opw.message = '';					
				
					opwIsCorrect(scope).then(function(res) {

						if (!scope.settings.btns.security.edit) {
								
							if (!res) {
								
								scope.settings.security.alert.opw.show = true;
								scope.settings.security.alert.opw.message = 'Old password is incorrect';
								scope.settings.security.alert.opw.correct = false;								
								
							} else {
								
								scope.settings.security.alert.opw.correct = true;
								
							};						
							
						};

					}, function(res) {
						
					});

				});
				
				scope.$watch(function(scope) {
					
					return scope.settings.security.password;
					
				},function(newValue, oldValue) {
					
					pwMatch(scope).then(function(res) {
						
						if (!scope.settings.btns.security.edit) {
						
							if (!res) {
								
								scope.settings.security.alert.password.show = true;
								scope.settings.security.alert.password.message = 'New password does not match';
								scope.settings.security.alert.password.correct = false;
								
							} else {
								
								scope.settings.security.alert.password.show = false;
								scope.settings.security.alert.password.message = '';
								scope.settings.security.alert.password.correct = true;
								
							};
							
						};
						
					}, function(res) {
						
					});
					
				});

				scope.$watch(function(scope) {
					
					return scope.settings.security.rpw;
					
				},function(newValue, oldValue) {
					
					pwMatch(scope).then(function(res) {
						
						if (!scope.settings.btns.security.edit) {
						
							if (!res) {
								
								scope.settings.security.alert.password.show = true;
								scope.settings.security.alert.password.message = 'New password does not match';
								scope.settings.security.alert.password.correct = false;
								
							} else {
								
								scope.settings.security.alert.password.show = false;
								scope.settings.security.alert.password.message = '';
								scope.settings.security.alert.password.correct = true;
								
							};
							
						};
						
					}, function(res) {
						
					});

				});

				scope.$watch(function(scope) {
					
					return scope.settings.security.alert.password.correct;
					
				},function(newValue, oldValue) {
					
					if (scope.settings.security.alert.password.correct) {
						
						if (belowMinChar(scope.settings.security.password,6)) {

							scope.settings.security.alert.password.show = true;
							scope.settings.security.alert.password.message = 'Password must be at least 6 characters';
							scope.settings.security.alert.password.okMin = false;					

						} else {

							scope.settings.security.alert.password.show = false;
							scope.settings.security.alert.password.message = '';
							scope.settings.security.alert.password.okMin = true;					

						};
						
					};

				});				

			}, 1000);			
			
		};
		
		self.editInfo = function(scope) {
			
			if (!scope.settings.btns.info.edit) {
				
				scope.settings.info.alert = {};
				scope.settings.info.alert.show = false;
				scope.settings.info.alert.message = '';
				
				scope.settings.info.not_unique = false;				
				
				self.info.load(scope);
				
			};

			scope.settings.btns.info.edit = !scope.settings.btns.info.edit;
			
		};
		
		self.editSecurity = function(scope) {
			
				if (!scope.settings.btns.security.edit) {
				
				delete scope.settings.security.opw;
				delete scope.settings.security.password;
				delete scope.settings.security.rpw;
				
				scope.formHolder.security.opw.$touched = false;
				scope.formHolder.security.password.$touched = false;
				scope.formHolder.security.rpw.$touched = false;
				
				scope.settings.security.alert.opw.show = false;
				scope.settings.security.alert.opw.message = '';
				scope.settings.security.alert.opw.required = false;
				
				scope.settings.security.alert.password.show = false;
				scope.settings.security.alert.password.message = '';

				scope.settings.security.alert.opw.correct = false;			
				scope.settings.security.alert.password.correct = false;

				scope.settings.security.alert.password.okMin = false;				
				
			};

			scope.settings.btns.security.edit = !scope.settings.btns.security.edit;
			
			
		};
		
		function validate(scope,form) {
			
			var controls = scope.formHolder[form].$$controls;
			
			angular.forEach(controls,function(elem,i) {

				if (elem.$$attr.$attr.required) {
						
					elem.$touched = elem.$invalid;
					
				};
									
			});

			return scope.formHolder[form].$invalid;
			
		};
		
		self.info = {};
		
		self.info.load = function(scope) {

			$http({
				method: 'GET',
				url: 'handlers/profile/info.php',
			}).then(function mySuccess(response) {

				scope.settings.info.username = response.data.username;
	
			}, function myError(response) {

			});			

		};	
		
		self.info.update = function(scope) {

			if (validate(scope,'info')) return;
			
			username_is_unique(scope).then(function(res) {
				
				scope.settings.info.not_unique = res;
				
				if (!scope.settings.info.not_unique) {
					
					bui.show();
					
					$http({
						method: 'POST',
						url: 'handlers/profile/info-update.php',
						data: scope.settings.info
					}).then(function mySuccess(response) {
		
						growl.show('alert alert-success no-border mb-2',{from: 'top', amount: 60},'Your username has been updated.');						
						scope.settings.btns.info.edit = true;
						bui.hide();
			
					}, function myError(response) {

						bui.hide();

					});						
					
				};
				
			}, function(res) {
				
			});
			
		};
		
		self.security = {};		
		
		self.security.load = function(scope) {

			$http({
				method: 'GET',
				url: 'handlers/profile/security.php',
			}).then(function mySuccess(response) {

			}, function myError(response) {



			});			

		};
		
		function username_is_unique(scope) {
			
			return $q(function(resolve,reject) {
				
				$http({
					method: 'POST',
					url: 'handlers/profile/username.php',
					data: scope.settings.info
				}).then(function mySuccess(response) {

					resolve(response.data.status);
		
				}, function myError(response) {

					reject(false);

				});					
				
			});
			
		};
		
		self.security.update = function(scope) {
			
			if (!scope.settings.security.alert.opw.correct) {
				
				scope.settings.security.alert.opw.show = true;
				scope.settings.security.alert.opw.message = 'Old password is incorrect';				
				
			} else {
				
				scope.settings.security.alert.opw.show = false;
				scope.settings.security.alert.opw.message = '';				
				
			};
			
			if (!validate(scope,'security') && scope.settings.security.alert.opw.correct && scope.settings.security.alert.password.correct && scope.settings.security.alert.password.okMin) {
				
				bui.show();
				
				$http({
					method: 'POST',
					url: 'handlers/profile/security-update.php',
					data: scope.settings.security
				}).then(function mySuccess(response) {
	
					growl.show('alert alert-success no-border mb-2',{from: 'top', amount: 60},'Your password has been updated.');						
					scope.settings.btns.security.edit = true;
					
					bui.hide();
					
					var onOk = function() {
				
						$window.location.href = 'angular/modules/login/logout.php';
						
					};
					
					bootstrapModal.confirmChange(scope,'Your password has been changed','Do you want to logout?',onOk,function() {});
					
				}, function myError(response) {

					bui.hide();

				});
				
			};
			
		};
		
		function opwIsCorrect(scope) {
			
			return $q(function(resolve,reject) {
				
				$http({
					method: 'GET',
					url: 'handlers/profile/security.php',
				}).then(function mySuccess(response) {

					resolve(response.data.password===scope.settings.security.opw);
		
				}, function myError(response) {

					reject(false);

				});					
				
			});
			
		};
		
		function pwMatch(scope) {
			
			return $q(function(resolve,reject) {
				
				var match = scope.settings.security.password == scope.settings.security.rpw;
				
				resolve(match);
				if (!match) resolve(false);
				
			});	
			
		};
		
		function belowMinChar(str,min) {
			
			return str.length < min;
			
		};
		
		function hasSpace(str) {
			
			return /\s/.test(str);
			
		};
		
		 // show password
		self.inputType = 'password';
		  
		self.hideShowPassword = function(scope){
				
			if (self.inputType == 'password'){
				self.inputType = 'text';
			}else{
				self.inputType = 'password';
			};
		};
		
		self.alert = function(scope){
			
			alert(1);
			
			
		};
		
	};
	
	return new form();
	
});