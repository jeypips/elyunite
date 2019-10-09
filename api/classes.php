<?php

class demographics
{

    var $con;

    function __construct($con)
    {
        $this->con = $con;
    }

    function get_items()
    {
		
        $items = $this->con->getData("SELECT demographics_items.id, demographics_items.item_name, demographics_items.item_type, (SELECT demographics_types.description FROM demographics_types WHERE demographics_types.id = demographics_items.item_type) demographic_type, demographics_items.predefinced_values FROM demographics_items");
        return $items;
		
    }
	
	function get_types() {
		
		$get_types = $this->con->getData("SELECT id, description FROM demographics_types");
		
		$types = [];
		$types[] = array("id"=>0,"description"=>"Select type");
		foreach ($get_types as $type) {
			
			$types[] = $type;
			
		};
		
		return $types;
		
	}

}

?>