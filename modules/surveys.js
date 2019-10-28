angular.module('app-module',['ui.bootstrap','ngAnimate','ngSanitize','checklist-model','bootstrap-growl','bootstrap-modal','form-validator','form-validator-dialog','block-ui']).factory('form', function($http,$filter,$compile,$timeout,growl,bootstrapModal,validate,validateDialog,bui){

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
		
		scope.item_type_selected = function(value) {
			let selected = $filter('filter')(scope.item_types, {id: value});
			return (value && selected.length) ? selected[0].description : 'Not set';			
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

		/* 
		scope.survey = {
			id: 0,
			name: '',
			description: '',
			sections: [
				{
					id: 0,
					section_name: '',
					items: [
						{
							id: 0,
							name: '',
							item_type: 1,
							values: [
								{
									id: 0,
									display: '',
									item_value: '',
									min: 0,
									max: 0,
									sub_items: []
								}
							]
						},
						{
							id: 0,
							name: '',
							item_type: 6,
							values: [
								{
									id: 0,
									display: '',
									item_value: '',
									min: 0,
									max: 0,
									row_type: 1,
									sub_items: []
								}
							]
						},
						{
							id: 0,
							name: '',
							item_type: 7,
							values: [
								{
									id: 0,
									display: '',
									item_value: '',
									min: 0,
									max: 0,
									row_type: 1,
									sub_items: []
								}
							]
						}						
					],
					aspects: [
						{
							id: 0,
							name: '',
							items: [
								{
									id: 0,
									name: '',
									item_type: 1,
									values: [
										{
											id: 0,
											display: '',
											min: 0,
											max: 0
										}									
									]
								},
								{
									id: 0,
									name: '',
									item_type: 6,
									values: [
										{
											id: 0,
											display: '',
											item_value: '',
											min: 0,
											max: 0,
											row_type: 1,
											sub_items: []
										}
									]
								},
								{
									id: 0,
									name: '',
									item_type: 7,
									values: [
										{
											id: 0,
											display: '',
											item_value: '',
											min: 0,
											max: 0,
											row_type: 1,
											sub_items: []
										}
									]
								}								
							]
						}
					],
				}
			]
		};
		 */
		
		scope.survey = {};
		scope.survey.id = 0;
		scope.survey.sections = [];
		scope.survey.section_dels = [];

		scope.surveys = []; // list
		
		scope.pagination = {};
		scope.pagination.surveys = {};
		scope.pagination.currentPages = {};
		scope.pagination.currentPages.surveys = 1;
		
		scope.search = {};
		
		scope.checks = {};
		scope.checks.items = [];

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
		
		scope.survey = {};
		scope.survey.id = 0;
		scope.survey.sections = [];
		scope.survey.section_dels = [];		
		
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
		
		$http({
			method: 'GET',
			url: 'api/surveys/view/'+scope.checks.items[0]
		}).then(function mySucces(response) {
			
			$('#survey-main').load('forms/survey.html', function() {
				$compile($('#survey-main')[0])(scope);
				scope.survey = response.data;
			});
			
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
				aspects: []
			});
			
		},
		
		remove: function(scope,ss) {
		
			if (ss.id > 0) {
				// self.survey.checkbox_dels.push(row.id);
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
				values: []
			});
			
		},
		
		remove: function(scope,ss,ssi) {
		
			// if (row.id > 0) {
				// self.survey.checkbox_dels.push(row.id);
			// };
			
			let ss_index = scope.survey.sections.indexOf(ss);
			let ssi_index = scope.survey.sections[ss_index].items.indexOf(ssi);
			
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
				items: []
			});
			
		},
		
		remove: function(scope,ss,sa) {
		
			// if (row.id > 0) {
				// self.survey.checkbox_dels.push(row.id);
			// };
			
			let ss_index = scope.survey.sections.indexOf(ss);
			let sa_index = scope.survey.sections[ss_index].aspects.indexOf(sa);
			
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
				sub_items: []
			});			
			
		},
		
		remove: function(scope,ss,ssi,v) {
		
			// if (row.id > 0) {
				// self.survey.checkbox_dels.push(row.id);
			// };
			
			let ss_index = scope.survey.sections.indexOf(ss);
			let ssi_index = scope.survey.sections[ss_index].items.indexOf(ssi);
			let v_index = scope.survey.sections[ss_index].items[ssi_index].values.indexOf(v);
			
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
				values: []
			});
			
		},
		
		remove: function(scope,ss,sa,sai) {
		
			// if (row.id > 0) {
				// self.survey.checkbox_dels.push(row.id);
			// };
			
			let ss_index = scope.survey.sections.indexOf(ss);
			let sa_index = scope.survey.sections[ss_index].aspects.indexOf(sa);
			let sai_index = scope.survey.sections[ss_index].aspects[sa_index].items.indexOf(sai);
			
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
				sub_items: []
			});		
			
		},
		
		remove: function(scope,ss,sa,sai,v) {
		
			// if (row.id > 0) {
				// self.survey.checkbox_dels.push(row.id);
			// };
			
			let ss_index = scope.survey.sections.indexOf(ss);
			let sa_index = scope.survey.sections[ss_index].aspects.indexOf(sa);
			let sai_index = scope.survey.sections[ss_index].aspects[sa_index].items.indexOf(sai);
			let v_index = scope.survey.sections[ss_index].aspects[sa_index].items[sai_index].values.indexOf(v);
			
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
		
		remove: function(scope,rows,row) {

			let index = rows.indexOf(row);
			
			rows.splice(index,1);
		
		}
		
	};

};

return new form();

}); 