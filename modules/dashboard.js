angular.module('app-module',['ui.bootstrap','bootstrap-modal','block-ui']).factory('form', function($compile,$timeout,$http,bootstrapModal,bui) {
	
	function form() {

		var self = this;

		self.data = function(scope) { // initialize data

			$http({
				method: 'POST',
				url: 'api/suggestions/dashboard.php'
			}).then(function mySucces(response) {
				
				scope.dashboard = response.data;
				
			},function myError(response) {
				
			});
			
			console.log(scope);
		};

	};
	
	return new form();
	
});