angular.module('app-module',['ui.bootstrap','ngAnimate','ngSanitize','checklist-model','bootstrap-growl','bootstrap-modal','form-validator','form-validator-dialog','block-ui']).directive('addSsiIg',function($timeout) {

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
		
			element.bind('click', function() {


			});

			element.bind('change', function() {

				let indexes = attrs.addSsiIg;
				
				let s_indexes = indexes.split(",");
				let section_index = s_indexes[0];
				let section_item_index = s_indexes[1];

				var file = ($('#upload-ssi-infographic_'+section_item_index)[0].files)[0];

				var type = file.type.split("/");
				
				let valid_files = ["jpeg","png"];				
				if (!valid_files.includes(type[1])) return;
				
				var eid = "#ssi_"+section_item_index;
				// var preview = document.querySelector(eid);
				var reader  = new FileReader();

				reader.addEventListener("load", function () {
					// preview.src = reader.result;
					scope.survey.sections[section_index].items[section_item_index].item_infographic = reader.result;
					scope.$apply();
				}, false);

				if (file) {
					reader.readAsDataURL(file);
				};		

			});
			
		}
	};
		
}).directive('removeSsiIg',function($timeout) {
	
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
		
			element.bind('click', function() {

				let indexes = attrs.removeSsiIg;
				
				let s_indexes = indexes.split(",");
				let section_index = s_indexes[0];
				let section_item_index = s_indexes[1];

				scope.survey.sections[section_index].items[section_item_index].item_infographic = null;
				scope.$apply();
				
			});
			
		}
	};	
	
}).directive('addSaiIg',function($timeout) {

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
		
			element.bind('click', function() {


			});

			element.bind('change', function() {

				let indexes = attrs.addSaiIg;
				
				let s_indexes = indexes.split(",");
				let section_index = s_indexes[0];
				let aspect_index = s_indexes[1];
				let aspect_item_index = s_indexes[2];

				var file = ($('#upload-sai-infographic_'+aspect_item_index)[0].files)[0];

				var type = file.type.split("/");
				
				let valid_files = ["jpeg","png"];				
				if (!valid_files.includes(type[1])) return;
				
				var eid = "#sai_"+aspect_item_index;
				// var preview = document.querySelector(eid);
				var reader  = new FileReader();

				reader.addEventListener("load", function () {
					// preview.src = reader.result;
					scope.survey.sections[section_index].aspects[aspect_index].items[aspect_item_index].item_infographic = reader.result;
					scope.$apply();
				}, false);

				if (file) {
					reader.readAsDataURL(file);
				};		

			});
			
		}
	};
		
}).directive('removeSaiIg',function($timeout) {
	
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
		
			element.bind('click', function() {

				let indexes = attrs.removeSaiIg;
				
				let s_indexes = indexes.split(",");
				let section_index = s_indexes[0];
				let aspect_index = s_indexes[1];
				let aspect_item_index = s_indexes[2];

				scope.survey.sections[section_index].aspects[aspect_index].items[aspect_item_index].item_infographic = null;
				scope.$apply();
				
			});
			
		}
	};	
	
}).factory('form', function($http,$filter,$compile,$timeout,growl,bootstrapModal,validate,validateDialog,bui){

	function form() {

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
			
			scope.item_types = [
				{
					id: 1,
					description: 'Bracket',
				},
				{
					id: 2,
					description: 'Checkbox',
				},
				{
					id: 3,
					description: 'Text Input',
				},
				{
					id: 4,
					description: 'Radios',
				},
				{
					id: 5,
					description: 'Selections',
				},
				{
					id: 6,
					description: 'Single Row'
				},
				{
					id: 7,
					description: 'Multi Rows'
				}				
			];
			
			scope.item_type_selected = function(item_type) {
				let selected = $filter('filter')(scope.item_types, {id: item_type});
				return (item_type && selected.length) ? selected[0].description : 'Not set';			
			};
			
			scope.text_input_types = [
				{
					id: 1,
					description: 'String',
				},
				{
					id: 2,
					description: 'Number',
				}			
			];		
			
			scope.text_input_type_selected = function(value) {
				let selected = $filter('filter')(scope.text_input_types, {id: value});
				return (value && selected.length) ? selected[0].description : 'Not set';			
			};
			
			scope.multi_rows_row_types = [
				{
					id: 1,
					description: 'Headers',
				},
				{
					id: 2,
					description: 'Row',
				}			
			];		

			scope.multi_rows_row_type_selected = function(value) {
				let selected = $filter('filter')(scope.multi_rows_row_types, {id: value});
				return (value && selected.length) ? selected[0].description : 'Not set';			
			};
			
			scope.presentations = [
				{
					id: 1,
					description: 'Table',
				},
				{
					id: 2,
					description: 'Icons',
				}			
			];

			scope.item_presentation_selected = function(value) {
				let selected = $filter('filter')(scope.presentations, {id: value});
				return (value && selected.length) ? selected[0].description : 'Not set';			
			};				
			
			scope.survey = {};
			scope.survey.id = 0;
			scope.survey.sections = [];
			scope.survey.sections_dels = [];

			scope.surveys = []; // list
			
			scope.pagination = {};
			scope.pagination.surveys = {};
			scope.pagination.currentPages = {};
			scope.pagination.currentPages.surveys = 1;
			
			scope.search = {};
			
			scope.checks = {};
			scope.checks.items = [];

		};
		
		function mode(scope,opt) {
			
			switch (opt) {
				
				case 1: // add
				
					scope.controls.ok.btn = false;
					scope.controls.ok.label = 'Save';
					scope.controls.cancel.btn = false;
					scope.controls.cancel.label = 'Cancel';
				
				break;
				
				case 2: // edit

					scope.controls.ok.btn = false;
					scope.controls.ok.label = 'Update';
					scope.controls.cancel.btn = false;
					scope.controls.cancel.label = 'Close';
				
				break;	
			
			};
			
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
		
		self.add = function(scope) {
			
			bui.show();
			
			mode(scope,1);
			
			scope.survey = {};
			scope.survey.id = 0;
			scope.survey.sections = [];
			scope.survey.sections_dels = [];		
			
			$('#survey-main').load('forms/survey.html', function() {
				$compile($('#survey-main')[0])(scope);
			});		
			
			bui.hide();
			
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
			
			mode(scope,2);
			
			$http({
				method: 'GET',
				url: 'api/surveys/view/'+scope.checks.items[0]
			}).then(function mySucces(response) {
				
				$('#survey-main').load('forms/survey.html', function() {
					$compile($('#survey-main')[0])(scope);
					scope.survey = response.data;
				});
				
				scope.checks.items = [];
				
				bui.hide();
				
			}, function myError(response) {
				
				bui.hide();			
				// error
				
			});		
			
		};	
		
		self.cancel = function(scope) {

			self.list(scope);

		};
			
		self.save = function(scope) {

			if (validate.form(scope,'survey')){ 
				growl.show('btn btn-danger notika-btn-danger waves-effect',{from: 'top', amount: 55},' Please complete required fields.');
				return;
			}
			
			bui.show();
			
			$http({
				method: 'POST',
				url: 'api/surveys/save',
				data: scope.survey
			}).then(function mySucces(response) {
				
				bui.hide();
				
				if (scope.survey.id == 0) {
					// scope.survey.id = response.data;
					growl.show('btn btn-success notika-btn-success waves-effect',{from: 'top', amount: 55},'New survey successfully added.');
					self.list(scope);
				} else {
					growl.show('btn btn-success notika-btn-success waves-effect',{from: 'top', amount: 55},'Survey info successfully updated.');
				}
				
			}, function myError(response) {
				
				bui.hide();			
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
		
		self.sections = {
			
			init: function() {
				
			},
			
			add: function(scope) {
				
				scope.survey.sections.push({
					id: 0,
					items: [],
					items_dels: [],
					aspects: [],
					aspects_dels: []
				});
				
			},
			
			remove: function(scope,ss) {
			
				if (ss.id > 0) {
					scope.survey.sections_dels.push(ss.id);
				};
				
				let sections = scope.survey.sections;
				let ss_index = scope.survey.sections.indexOf(ss);
				scope.survey.sections = [];	
				
				angular.forEach(sections, function(d,i) {
					
					if (ss_index != i) {
						
						delete d['$$hashKey'];
						scope.survey.sections.push(d);
						
					};
					
				});		
			
			}
			
		};
		
		self.section_items = {
			
			init: function() {
				
			},
			
			add: function(scope,ss) {
				
				let ss_index = scope.survey.sections.indexOf(ss);

				scope.survey.sections[ss_index].items.push({
					id: 0,
					item_infographic: null,
					values: [],
					values_dels: []
				});
				
			},
			
			remove: function(scope,ss,ssi) {			
				
				let ss_index = scope.survey.sections.indexOf(ss);
				let ssi_index = scope.survey.sections[ss_index].items.indexOf(ssi);
				
				if (ssi.id > 0) {
					scope.survey.sections[ss_index].items_dels.push(ssi.id);
				};			
				
				let section_items = scope.survey.sections[ss_index].items;
				scope.survey.sections[ss_index].items = [];	
				
				angular.forEach(section_items, function(d,i) {
					
					if (ssi_index != i) {
						
						delete d['$$hashKey'];
						scope.survey.sections[ss_index].items.push(d);
						
					};
					
				});		
			
			}		
			
		};
		
		self.section_aspects = {
			
			init: function() {
				
			},
			
			add: function(scope,ss) {
				
				let ss_index = scope.survey.sections.indexOf(ss);

				scope.survey.sections[ss_index].aspects.push({
					id: 0,
					items: [],
					items_dels: []			
				});
				
			},
			
			remove: function(scope,ss,sa) {
				
				let ss_index = scope.survey.sections.indexOf(ss);
				let sa_index = scope.survey.sections[ss_index].aspects.indexOf(sa);
				
				if (sa.id > 0) {
					scope.survey.sections[ss_index].aspects_dels.push(sa.id);
				};			
				
				let section_aspects = scope.survey.sections[ss_index].aspects;
				scope.survey.sections[ss_index].aspects = [];
				
				angular.forEach(section_aspects, function(d,i) {
					
					if (sa_index != i) {
						
						delete d['$$hashKey'];
						scope.survey.sections[ss_index].aspects.push(d);
						
					};
					
				});		
			
			}		
			
		};
		
		self.section_item_values = {
			
			init: function() {
				
			},

			add: function(scope,ss,ssi) {
				
				let ss_index = scope.survey.sections.indexOf(ss);
				let ssi_index = scope.survey.sections[ss_index].items.indexOf(ssi);
				
				scope.survey.sections[ss_index].items[ssi_index].values.push({
					id: 0,
					sub_items: [],
					sub_items_dels: []
				});			
				
			},
			
			remove: function(scope,ss,ssi,v) {
				
				let ss_index = scope.survey.sections.indexOf(ss);
				let ssi_index = scope.survey.sections[ss_index].items.indexOf(ssi);
				let v_index = scope.survey.sections[ss_index].items[ssi_index].values.indexOf(v);
				
				if (v.id > 0) {
					scope.survey.sections[ss_index].items[ssi_index].values_dels.push(v.id);
				};			
				
				let section_item_values = scope.survey.sections[ss_index].items[ssi_index].values;
				scope.survey.sections[ss_index].items[ssi_index].values = [];
				
				angular.forEach(section_item_values, function(d,i) {
					
					if (v_index != i) {
						
						delete d['$$hashKey'];
						scope.survey.sections[ss_index].items[ssi_index].values.push(d);
						
					};
					
				});		
			
			}		
			
		};
		
		self.aspect_items = {
			
			init: function() {
				
			},
			
			add: function(scope,ss,sa) {
				
				let ss_index = scope.survey.sections.indexOf(ss);
				let sa_index = scope.survey.sections[ss_index].aspects.indexOf(sa);
				
				scope.survey.sections[ss_index].aspects[sa_index].items.push({
					id: 0,
					item_infographic: null,					
					values: [],
					values_dels: []
				});
				
			},
			
			remove: function(scope,ss,sa,sai) {
				
				let ss_index = scope.survey.sections.indexOf(ss);
				let sa_index = scope.survey.sections[ss_index].aspects.indexOf(sa);
				let sai_index = scope.survey.sections[ss_index].aspects[sa_index].items.indexOf(sai);
				
				if (sai.id > 0) {
					scope.survey.sections[ss_index].aspects[sa_index].items_dels.push(sai.id);
				};
				
				let aspect_items = scope.survey.sections[ss_index].aspects[sa_index].items;
				scope.survey.sections[ss_index].aspects[sa_index].items = [];
				
				angular.forEach(aspect_items, function(d,i) {
					
					if (sai_index != i) {
						
						delete d['$$hashKey'];
						scope.survey.sections[ss_index].aspects[sa_index].items.push(d);
						
					};
					
				});		
			
			}		
			
		};
		
		self.aspect_item_values = {
			
			init: function() {
				
			},

			add: function(scope,ss,sa,sai) {
				
				let ss_index = scope.survey.sections.indexOf(ss);
				let sa_index = scope.survey.sections[ss_index].aspects.indexOf(sa);
				let sai_index = scope.survey.sections[ss_index].aspects[sa_index].items.indexOf(sai);
				
				scope.survey.sections[ss_index].aspects[sa_index].items[sai_index].values.push({
					id: 0,
					sub_items: [],
					sub_items_dels: []				
				});		
				
			},
			
			remove: function(scope,ss,sa,sai,v) {
				
				let ss_index = scope.survey.sections.indexOf(ss);
				let sa_index = scope.survey.sections[ss_index].aspects.indexOf(sa);
				let sai_index = scope.survey.sections[ss_index].aspects[sa_index].items.indexOf(sai);
				let v_index = scope.survey.sections[ss_index].aspects[sa_index].items[sai_index].values.indexOf(v);
				
				if (v.id > 0) {
					scope.survey.sections[ss_index].aspects[sa_index].items[sai_index].values_dels.push(v.id);
				};			
				
				let aspect_item_values = scope.survey.sections[ss_index].aspects[sa_index].items[sai_index].values;
				scope.survey.sections[ss_index].aspects[sa_index].items[sai_index].values = [];
				
				angular.forEach(aspect_item_values, function(d,i) {
					
					if (v_index != i) {
						
						delete d['$$hashKey'];
						scope.survey.sections[ss_index].aspects[sa_index].items[sai_index].values.push(d);
						
					};
					
				});		
			
			}		
			
		};
		
		self.value_sub_items = {
			
			init: function() {
				
			},

			add: function(scope,rows) {
				
				rows.push({
					id: 0
				});
				
			},
			
			remove: function(scope,v,rows,row) {

				if (row.id > 0) {
					
					v.sub_items_dels.push(row.id);
					
				};

				let index = rows.indexOf(row);
				
				rows.splice(index,1);
			
			}
			
		};
		
		self.addSsiIg = function(scope,i) {
			
			$('#upload-ssi-infographic_'+i)[0].click();
			
		};
		
		self.addSivIg = function(scope,i) {
			
			$('#upload-siv-infographic_'+i)[0].click();
			
		};		
		
		self.addSaiIg = function(scope,i) {
			
			$('#upload-sai-infographic_'+i)[0].click();
			
		};

		self.addSaivIg = function(scope,i) {
			
			$('#upload-saiv-infographic_'+i)[0].click();
			
		};			

	};

	return new form();

}).directive('addSivIg',function($timeout) {

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
		
			element.bind('click', function() {


			});

			element.bind('change', function() {

				let indexes = attrs.addSivIg;
				
				let s_indexes = indexes.split(",");
				let section_index = s_indexes[0];
				let section_item_index = s_indexes[1];
				let siv_index = s_indexes[2];

				var file = ($('#upload-siv-infographic_'+siv_index)[0].files)[0];

				var type = file.type.split("/");
				
				let valid_files = ["jpeg","png"];				
				if (!valid_files.includes(type[1])) return;
				
				var eid = "#siv_"+siv_index;
				// var preview = document.querySelector(eid);
				var reader  = new FileReader();

				reader.addEventListener("load", function () {
					// preview.src = reader.result;
					scope.survey.sections[section_index].items[section_item_index].values[siv_index].siv_infographic = reader.result;
					scope.$apply();
				}, false);

				if (file) {
					reader.readAsDataURL(file);
				};		

			});
			
		}
	};
		
}).directive('removeSivIg',function($timeout) {
	
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
		
			element.bind('click', function() {

				let indexes = attrs.removeSivIg;
				
				let s_indexes = indexes.split(",");
				let section_index = s_indexes[0];
				let section_item_index = s_indexes[1];
				let siv_index = s_indexes[2];

				scope.survey.sections[section_index].items[section_item_index].values[siv_index].siv_infographic = null;
				scope.$apply();
				
			});
			
		}
	};	
	
}).directive('addSaivIg',function($timeout) {

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
		
			element.bind('click', function() {


			});

			element.bind('change', function() {

				let indexes = attrs.addSaivIg;
				
				let s_indexes = indexes.split(",");
				let section_index = s_indexes[0];
				let aspect_index = s_indexes[1];
				let aspect_item_index = s_indexes[2];
				let saiv_index = s_indexes[3];

				var file = ($('#upload-saiv-infographic_'+saiv_index)[0].files)[0];

				var type = file.type.split("/");
				
				let valid_files = ["jpeg","png"];				
				if (!valid_files.includes(type[1])) return;
				
				var eid = "#saiv_"+saiv_index;
				// var preview = document.querySelector(eid);
				var reader  = new FileReader();

				reader.addEventListener("load", function () {
					// preview.src = reader.result;
					scope.survey.sections[section_index].aspects[aspect_index].items[aspect_item_index].values[saiv_index].siv_infographic = reader.result;
					scope.$apply();
				}, false);

				if (file) {
					reader.readAsDataURL(file);
				};		

			});
			
		}
	};
		
}).directive('removeSaivIg',function($timeout) {
	
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
		
			element.bind('click', function() {

				let indexes = attrs.removeSaivIg;
				
				let s_indexes = indexes.split(",");
				let section_index = s_indexes[0];
				let aspect_index = s_indexes[1];
				let aspect_item_index = s_indexes[2];
				let saiv_index = s_indexes[3];

				scope.survey.sections[section_index].aspects[aspect_index].items[aspect_item_index].values[saiv_index].siv_infographic = null;
				scope.$apply();
				
			});
			
		}
	};	
	
});