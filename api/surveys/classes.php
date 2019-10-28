<?php

class survey {

	var $con;
	var $id;
	var $survey;

	function __construct($con,$id) {
		
		$this->con = $con;
		$this->id = $id;
		
		$survey = $this->info();
		
		$this->survey = $survey;		
		
	}
	
	private function info() {
		
		$survey = $this->con->getData("SELECT id, name, description FROM surveys WHERE id = ".$this->id);
		
		$survey = $survey[0];
		$survey['sections'] = $this->sections($this->id);
		$survey['section_dels'] = [];
		
		return $survey;
		
	}
	
	private function sections($id) {
		
		$sections = $this->con->getData("SELECT id, survey_id, section_name FROM surveys_sections WHERE survey_id = $id");		
		
		foreach ($sections as $i => $section) {
			
			$sections[$i]['items'] = $this->section_items($section['id']);
			$sections[$i]['aspects'] = $this->section_aspects($section['id']);			
			
		};
		
		return $sections;
		
	}
	
	private function section_items($id) {
		
		$items = $this->con->getData("SELECT id, section_id, item_name, item_type FROM sections_items WHERE section_id = $id");
		
		foreach ($items as $i => $item) {
			
			$items[$i]['values'] = $this->section_item_values($item['id']);
			
		}
		
		return $items;
		
	}
	
	private function section_aspects($id) {
		
		$aspects = $this->con->getData("SELECT id, section_id, aspect_name FROM sections_aspects WHERE section_id = $id");
		
		foreach ($aspects as $i => $aspect) {
			
			$aspects[$i]['items'] = $this->aspect_items($aspect['id']);
			
		}
		
		return $aspects;
		
	}
	
	private function aspect_items($id) {
		
		$items = $this->con->getData("SELECT id, aspect_id, item_name, item_type FROM aspects_items WHERE aspect_id = $id");
		
		foreach ($items as $i => $item) {
			
			$items[$i]['values'] = $this->aspect_item_values($item['id']);
			
		}
		
		return $items;
		
	}		
	
	private function section_item_values($id) {
		
		$item_values = $this->con->getData("SELECT id, section_item_id, display, siv_value, siv_min, siv_max, data_type, row_type FROM section_item_values WHERE section_item_id = $id");
		
		foreach ($item_values as $i => $item_value) {
			
			$sub_items = $this->siv_sub_items($item_value['id']);
			$item_values[$i]['show_subitems'] = (count($sub_items))?true:false;
			$item_values[$i]['sub_items'] = $sub_items;
			
		}
		
		return $item_values;
		
	}
	
	private function aspect_item_values($id) {
		
		$item_values = $this->con->getData("SELECT id, aspect_item_id, display, siv_value, siv_min, siv_max, data_type, row_type FROM aspect_item_values WHERE aspect_item_id = $id");
		
		foreach ($item_values as $i => $item_value) {
			
			$sub_items = $this->aiv_sub_items($item_value['id']);
			$item_values[$i]['show_subitems'] = (count($sub_items))?true:false;
			$item_values[$i]['sub_items'] = $sub_items;
			
		}
		
		return $item_values;
		
	}	
	
	private function siv_sub_items($id) {
		
		$sub_items = $this->con->getData("SELECT id, vsi_id, display, vsi_value, vsi_min, vsi_max, data_type FROM siv_sub_items WHERE vsi_id = $id");
		
		return $sub_items;
		
	}
	
	private function aiv_sub_items($id) {
		
		$sub_items = $this->con->getData("SELECT id, vsi_id, display, vsi_value, vsi_min, vsi_max, data_type FROM aiv_sub_items WHERE vsi_id = $id");
		
		return $sub_items;
		
	}	
	
	function get() {
		
		return $this->survey;
		
	}
	
}

?>