<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once '../vendor/autoload.php';
require_once '../../db.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$container = new \Slim\Container;
$app = new \Slim\App($container);

$container = $app->getContainer();
$container['con'] = function ($container) {
	$con = new pdo_db();
	return $con;
};

# list surveys
$app->get('/list', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	
	$surveys = $con->getData("SELECT * FROM surveys");
	
	foreach ($surveys as $i => $survey) {
		
		$surveys[$i]['survey_date'] = date("F j, Y",strtotime($survey['system_log']));
		$surveys[$i]['checked'] = false;
		
	}

    return $response->withJson($surveys);

});

# add
$app->post('/save', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "surveys";

	$data = $request->getParsedBody();
	
	// $r = "<pre>".json_encode($data,JSON_PRETTY_PRINT)."</pre>";
    // return $response->write($r);		

	$sections = $data['sections'];
	unset($data['sections']);
	
	$sections_dels = $data['sections_dels'];
	unset($data['sections_dels']);

	# surveys	
	if ($data['id']) {
		
		$save_survey = $con->updateData($data,'id');
		$id = $data['id'];
		
	} else {
		
		$save_survey = $con->insertData($data);
		$id = $con->insertId;		
		
	};

	# delete sections
	if (count($sections_dels)) {
		
		$con->table = "surveys_sections";
		$delete_sections = array("id"=>implode(",",$sections_dels));
		$con->deleteData($delete_sections);
		
	};

	# sections
	foreach ($sections as $section) {
		
		$section['survey_id'] = $id;
		$section_items = $section['items'];
		unset($section['items']);		
		
		$items_dels = $section['items_dels'];
		unset($section['items_dels']);		
		
		$section_aspects = $section['aspects'];
		unset($section['aspects']);
		
		$aspects_dels = $section['aspects_dels'];
		unset($section['aspects_dels']);		
		
		# delete items
		if (count($items_dels)) {
			
			$con->table = "sections_items";
			$delete_items = array("id"=>implode(",",$items_dels));
			$con->deleteData($delete_items);			
			
		};		
		
		$con->table = "surveys_sections";		
		if ($section['id']) {
			
			$save_section = $con->updateData($section,'id');
			$section_id = $section['id'];
			
		} else {
			
			unset($section['id']);
			$save_section = $con->insertData($section);
			$section_id = $con->insertId;
			
		}
		
		# section items
		foreach ($section_items as $section_item) {
			
			$section_item['section_id'] = $section_id;			
			
			$section_item_values = $section_item['values'];
			unset($section_item['values']);

			$values_dels = $section_item['values_dels'];
			unset($section_item['values_dels']);		
			
			# delete item values
			if (count($values_dels)) {
				
				$con->table = "section_item_values";
				$delete_values = array("id"=>implode(",",$values_dels));
				$con->deleteData($delete_values);					
				
			};

			$con->table = "sections_items";
			if ($section_item['id']) {
				
				$save_section_item = $con->updateData($section_item,'id');
				$section_item_id = $section_item['id'];
				
			} else {
				
				unset($section_item['id']);
				$save_section_item = $con->insertData($section_item);
				$section_item_id = $con->insertId;
				
			};
			
			# section item values
			foreach ($section_item_values as $si_value) {
				
				$si_value['section_item_id'] = $section_item_id;
				
				$value_sub_items = $si_value['sub_items'];
				unset($si_value['sub_items']);
				unset($si_value['show_subitems']);
				
				$sub_items_dels = $si_value['sub_items_dels'];
				unset($si_value['sub_items_dels']);
				
				# delete sub items
				if ($sub_items_dels) {
					
					$con->table = "siv_sub_items";
					$delete_sub_items = array("id"=>implode(",",$sub_items_dels));
					$con->deleteData($delete_sub_items);						
					
				};
				
				$con->table = "section_item_values";
				if ($si_value['id']) {
					
					$save_si_value = $con->updateData($si_value,'id');
					$vsi_id = $si_value['id'];
					
				} else {
					
					unset($si_value['id']);
					$save_si_value = $con->insertData($si_value);
					$vsi_id = $con->insertId;
					
				};
				
				# section item value sub items
				foreach ($value_sub_items as $vsi) {
					
					$vsi['vsi_id'] = $vsi_id;
				
					$con->table = "siv_sub_items";
					if ($vsi['id']) {
						
						$save_vsi = $con->updateData($vsi,'id');
						
					} else {
						
						unset($vsi['id']);
						$save_vsi = $con->insertData($vsi);
						
					};
					
				};
				
			};
			
		};
		
		# delete aspects
		if (count($aspects_dels)) {
			
			$con->table = "sections_aspects";
			$delete_aspects = array("id"=>implode(",",$aspects_dels));
			$con->deleteData($delete_aspects);			
			
		};			
		
		# section aspects
		foreach ($section_aspects as $aspect) {
			
			$aspect['section_id'] = $section_id;
			
			$aspect_items = $aspect['items'];
			unset($aspect['items']);
			
			$items_dels = $aspect['items_dels'];
			unset($aspect['items_dels']);				
			
			# delete items
			if (count($items_dels)) {
				
				$con->table = "aspects_items";
				$delete_items = array("id"=>implode(",",$items_dels));
				$con->deleteData($delete_items);		
				
			};
			
			$con->table = "sections_aspects";
			if ($aspect['id']) {
				
				$save_aspect = $con->updateData($aspect,'id');
				$aspect_id = $aspect['id'];
				
			} else {

				unset($aspect['id']);
				$save_aspect = $con->insertData($aspect);
				$aspect_id = $con->insertId;
				
			};
			
			# aspect items
			foreach ($aspect_items as $aspect_item) {
				
				$aspect_item['aspect_id'] = $aspect_id;
				
				$aspect_item_values = $aspect_item['values'];
				unset($aspect_item['values']);
				
				$values_dels = $aspect_item['values_dels'];
				unset($aspect_item['values_dels']);		
				
				# delete item values
				if (count($values_dels)) {
					
					$con->table = "aspect_item_values";
					$delete_values = array("id"=>implode(",",$values_dels));
					$con->deleteData($delete_values);					
					
				};				

				$con->table = "aspects_items";
				if ($aspect_item['id']) {
					
					$save_aspect_item = $con->updateData($aspect_item,'id');
					$aspect_item_id = $aspect_item['id'];
					
				} else {
					
					unset($aspect_item['id']);
					$save_aspect_item = $con->insertData($aspect_item);
					$aspect_item_id = $con->insertId;
					
				};
				
				# aspect item values
				foreach ($aspect_item_values as $ai_value) {
					
					$ai_value['aspect_item_id'] = $aspect_item_id;
					
					$value_sub_items = $ai_value['sub_items'];
					unset($ai_value['sub_items']);
					unset($ai_value['show_subitems']);
					
					$sub_items_dels = $ai_value['sub_items_dels'];
					unset($ai_value['sub_items_dels']);
					
					# delete sub items
					if ($sub_items_dels) {
						
						$con->table = "aiv_sub_items";
						$delete_sub_items = array("id"=>implode(",",$sub_items_dels));
						$con->deleteData($delete_sub_items);						
						
					};			
					
					$con->table = "aspect_item_values";
					if ($ai_value['id']) {
						
						$save_si_value = $con->updateData($ai_value,'id');
						$vsi_id = $ai_value['id'];
						
					} else {
						
						unset($ai_value['id']);
						$save_si_value = $con->insertData($ai_value);
						$vsi_id = $con->insertId;
						
					};			
					
					# aspect item value sub items
					foreach ($value_sub_items as $vsi) {
						
						$vsi['vsi_id'] = $vsi_id;
					
						$con->table = "aiv_sub_items";
						if ($vsi['id']) {						
							
							$save_vsi = $con->updateData($vsi,'id');
							
						} else {
							
							unset($vsi['id']);
							$save_vsi = $con->insertData($vsi);
							
						};
						
					};
					
				};
				
			};
			
		};
		
	};

});

$app->get('/view/{id}', function (Request $request, Response $response, array $args) {

	require_once 'classes.php';
	
	$con = $this->con;
	$con->table = "surveys";

	$id = $args['id'];

	$survey = new survey($con,$id);
	
    return $response->withJson($survey->get());
	
});

$app->get('/get/{id}', function (Request $request, Response $response, array $args) {

	require_once 'classes.php';
	
	$con = $this->con;
	$con->table = "surveys";

	$id = $args['id'];

	$survey = new survey($con,$id);
	
	$r = "<pre>".json_encode($survey->get(),JSON_PRETTY_PRINT)."</pre>";
	return $response->write($r);
	
});

# delete account
$app->post('/delete', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "surveys";

	$data = $request->getParsedBody();

	$delete = array("id"=>implode(",",$data['id']));

	$con->deleteData($delete);

});

$app->run();

?>