angular.module('app-module',['ui.bootstrap','ngSanitize','checklist-model','bootstrap-growl','bootstrap-modal','form-validator','form-validator-dialog','block-ui']).factory('form', function($http,$filter,$compile,$timeout,growl,bootstrapModal,validate,validateDialog,bui){

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
				description: 'Table'
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
				id: 1,
				description: 'Number',
			}			
		];
		
		scope.text_input_type_selected = function(value) {
			let selected = $filter('filter')(scope.text_input_types, {id: value});
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
					name: '',
					items: [
						{
							id: 0,
							name: '',
							type: 1,
							values: [
								{
									id: 0,
									display: '',
									min: 0,
									max: 0,
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
									type: 1,
									values: [
										{
											id: 0,
											display: '',
											min: 0,
											max: 0
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
		scope.survey.dels = [];

		scope.surveys = []; // list
		
		scope.pagination = {};
		scope.pagination.surveys = {};
		scope.pagination.currentPages = {};
		scope.pagination.currentPages.surveys = 1;
		
		scope.search = {};
		
		scope.checks = {};
		scope.checks.items = [];

		scope.demographics_items = [];
		// demographics_items(scope);
		
		scope.demographics_types = [];
		demographics_types(scope);
		
		scope.demographics_text_types = [];
		demographics_text_types(scope);

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
		
		scope.survey = {};
		scope.survey.id = 0;
		scope.survey.sections = [];
		scope.survey.dels = [];		
		
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
	
	function demographics_types(scope) {

		$http({
			url: 'api/surveys/demographics/types',
			method: 'GET'
		}).then(function success(response) {

			scope.demographics_types = response.data;

		}, function error(response) {

		});

	};
	
	function demographics_text_types(scope) {

		$http({
			url: 'api/surveys/demographics/text/types',
			method: 'GET'
		}).then(function success(response) {

			scope.demographics_text_types = response.data;

		}, function error(response) {

		});

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
			
			console.log(scope.survey.sections);
			
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
				values: []
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
	
	self.survey = {
		
		init: function() {
			
			self.survey.form = {};	
			self.survey.bracket = [];		
			self.survey.bracket_dels = [];		
			self.survey.checkbox = [];
			self.survey.checkbox_dels = [];
			self.survey.text = {};	
			self.survey.radio = [];
			self.survey.radio_dels = [];	
			self.survey.selection = [];
			self.survey.selection_dels = [];
			
		},
		
		form: {},
		
		bracket: [],
		bracket_dels: [],
		
		checkbox: [],
		checkbox_dels: [],
		
		text: {},
		
		radio: [],
		radio_dels: [],
		
		selection: [],
		selection_dels: [],
		
		demographics: function(scope) {			
			
			self.survey.init();
			
			self.survey.form.type = {id:"0", description:"Select type"};			
			
			let title = 'Add Demographic Item';
			
			let onLoad = function() {
				
				$('#select-demo').selectpicker();
				
			};
			
			let onOk = function() {
				
				return self.survey.add(scope);				
				
			};
			
			bootstrapModal.box3(scope,title,'dialogs/survey-demographics.html',onLoad,onOk,120);
			
		},
		
		edit: function(scope,d) {		
			
			self.survey.init();	
			
			let title = 'Update Demographic Info';
			
			let onLoad = function() {
				
				switch (d.type) {
					
					case 1:					

						// let index = scope.survey.demographics.indexOf(d);
						self.survey.form.name = d.name;
						self.survey.form.type = {id:d.type, description:d.description};
						self.survey.bracket = d.data;
						self.survey.bracket_dels = d.dels;
						scope.$apply();		
						self.survey.selected(scope);						
						$timeout(function() {
							scope.$apply();						
						}, 100);
					
					break;
					
				};
				
				$('#select-demo').selectpicker();
				
			};
			
			let onOk = function() {
				
				return self.survey.update(scope,d);				
				
			};			
			
			bootstrapModal.box3(scope,title,'dialogs/survey-demographics.html',onLoad,onOk,120);
		
		},
		
		selected: function(scope) {			
			
			$('#demographics-items').html('');			
			
			switch (self.survey.form.type.id) {
				
				case 1:
				
					$('#demographics-items').load('forms/demographics-bracket.html',function() {
						$compile($('#demographics-items')[0])(scope);
					});
				
				break;
				
				case 2:
				
					$('#demographics-items').load('forms/demographics-checkbox.html',function() {
						$compile($('#demographics-items')[0])(scope);
					});					
				
				break;

				case 3:
				
					$('#demographics-items').load('forms/demographics-text.html',function() {
						$compile($('#demographics-items')[0])(scope);
						self.survey.text.data_type = {id:"0", description:"Select type"};						
						$timeout(function() {
							$('#select-text-type').selectpicker();
						}, 100);
					});			
				
				break;				
				
				case 4:
				
					$('#demographics-items').load('forms/demographics-radio.html',function() {
						$compile($('#demographics-items')[0])(scope);
					});				
				
				break;

				case 5:
				
					$('#demographics-items').load('forms/demographics-select.html',function() {
						$compile($('#demographics-items')[0])(scope);
					});				
				
				break;				
				
			};
			
		},
		
		brackets: {
			
			add: function(scope) {
				
				self.survey.bracket.push({
					id: 0
				});

			},
			
			delete: function(scope,row) {				
				
				if (row.id > 0) {
					self.survey.bracket_dels.push(row.id);
				};
				
				let brackets = self.survey.bracket;
				let index = self.survey.bracket.indexOf(row);
				self.survey.bracket = [];

				angular.forEach(brackets, function(d,i) {
					
					if (index != i) {
						
						delete d['$$hashKey'];
						self.survey.bracket.push(d);
						
					};
					
				});
				
			}
			
		},
		
		checkboxes: {
			
			add: function(scope) {

				self.survey.checkbox.push({
					id: 0
				});

			},

			delete: function(scope,row) {
				
				if (row.id > 0) {
					self.survey.checkbox_dels.push(row.id);
				};
				
				let checkboxes = self.survey.checkbox;
				let index = self.survey.checkbox.indexOf(row);
				self.survey.checkbox = [];	
				
				angular.forEach(checkboxes, function(d,i) {
					
					if (index != i) {
						
						delete d['$$hashKey'];
						self.survey.checkbox.push(d);
						
					};
					
				});				
				
			}			
			
		},
		
		radios: {
			
			add: function(scope) {

				self.survey.radio.push({
					id: 0
				});

			},

			delete: function(scope,row) {
				
				if (row.id > 0) {
					self.survey.radio_dels.push(row.id);
				};
				
				let radios = self.survey.radio;
				let index = self.survey.radio.indexOf(row);
				self.survey.radio = [];	
				
				angular.forEach(radios, function(d,i) {
					
					if (index != i) {
						
						delete d['$$hashKey'];
						self.survey.radio.push(d);
						
					};
					
				});				
				
			}			
			
		},		
		
		selections: {
			
			add: function(scope) {

				self.survey.selection.push({
					id: 0
				});

			},

			delete: function(scope,row) {
				
				if (row.id > 0) {
					self.survey.selection_dels.push(row.id);
				};
				
				let selections = self.survey.selection;
				let index = self.survey.selection.indexOf(row);
				self.survey.selection = [];
				
				angular.forEach(selections, function(d,i) {
					
					if (index != i) {
						
						delete d['$$hashKey'];
						self.survey.selection.push(d);
						
					};
					
				});				
				
			}			
			
		},		
		
		add: function(scope) {		
			
			if (validateDialog.form(scope,'demographics')) {

				growl.show('btn btn-danger notika-btn-danger waves-effect',{from: 'top', amount: 55},' Please complete all fields that are highlighted with red');
				return false;

			};			
			
			switch (self.survey.form.type.id) {
				
				case 1:								
				
					scope.survey.demographics.push({
						id: 0,
						name: self.survey.form.name,
						type: self.survey.form.type.id,
						description: self.survey.form.type.description,
						data: self.survey.bracket,
						dels: self.survey.bracket_dels
					});
				
				break;
				
				case 2:
				
					scope.survey.demographics.push({
						id: 0,
						name: self.survey.form.name,						
						type: self.survey.form.type.id,
						description: self.survey.form.type.description,						
						data: self.survey.checkbox,
						dels: self.survey.checkbox_dels						
					});
				
				break;

				case 3:
				
					if (self.survey.text.data_type.id == 0) {
						
						growl.show('btn btn-danger notika-btn-danger waves-effect',{from: 'top', amount: 55},' Please select type');
						return false;						
						
					};
				
					scope.survey.demographics.push({
						id: 0,
						name: self.survey.form.name,						
						type: self.survey.form.type.id,
						description: self.survey.form.type.description,						
						data: self.survey.checkbox,
						dels: self.survey.checkbox_dels						
					});	
				
				break;
				
				case 4:
				
					scope.survey.demographics.push({
						id: 0,
						name: self.survey.form.name,						
						type: self.survey.form.type.id,
						description: self.survey.form.type.description,						
						data: self.survey.radio,
						dels: self.survey.radio_dels						
					});				
				
				break;
				
				case 5:
				
					scope.survey.demographics.push({
						id: 0,
						name: self.survey.form.name,						
						type: self.survey.form.type.id,
						description: self.survey.form.type.description,						
						data: self.survey.selection,
						dels: self.survey.selection_dels						
					});					
				
				break;
			
			};
			
			// console.log(scope.survey);
			scope.$apply();
			
			return true;
		
		},
		
		update: function(scope,d) {

			if (validateDialog.form(scope,'demographics')) {

				growl.show('btn btn-danger notika-btn-danger waves-effect',{from: 'top', amount: 55},' Please complete all fields that are highlighted with red');
				return false;

			};

			let index = scope.survey.demographics.indexOf(d);

			switch (d.type) {
				
				case 1:

					scope.survey.demographics[index]['name'] = self.survey.form.name;
					scope.survey.demographics[index]['type'] = self.survey.form.type.id;
					scope.survey.demographics[index]['description'] = self.survey.form.type.description;
					scope.survey.demographics[index]['data'] = angular.copy(self.survey.bracket);
					scope.survey.demographics[index]['dels'] = self.survey.bracket_dels;

				break;

			};
			
		},
		
		delete: function(scope,row) {

			if (row.id > 0) {
				scope.survey.dels.push(row.id);
			};
			
			let demographics = scope.survey.demographics;
			let index = scope.survey.demographics.indexOf(row);
			scope.survey.demographics = [];
			
			angular.forEach(demographics, function(d,i) {
				
				if (index != i) {
					
					delete d['$$hashKey'];
					scope.survey.demographics.push(d);
					
				};
				
			});				
		
		}
		
	};

};

return new form();

}); 