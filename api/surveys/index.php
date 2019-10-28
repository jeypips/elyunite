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
		
		$surveys[$i]['survey_date'] = date("F j, Y",strtotime($survey['survey_date']));
		$surveys[$i]['checked'] = false;
		
	}

    return $response->withJson($surveys);

});

# add
$app->post('/save', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "surveys";

	$data = $request->getParsedBody();

	$sections = $data['sections'];
	unset($data['sections']);
	
	$section_dels = $data['section_dels'];
	unset($data['section_dels']);
	
	# surveys
	$save_survey = $con->insertData($data);
	$id = $con->insertId;

	# sections
	foreach ($sections as $section) {
		
		$section['survey_id'] = $id;
		$section_items = $section['items'];
		unset($section['items']);
		$section_aspects = $section['aspects'];
		unset($section['aspects']);
		
		$con->table = "surveys_sections";		
		if ($section['id']) {
			
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
			
			$con->table = "sections_items";
			if ($section_item['id']) {
				
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
				
				$con->table = "section_item_values";
				if ($si_value['id']) {
					
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
						
					} else {
						
						unset($vsi['id']);
						$save_vsi = $con->insertData($vsi);
						
					};
					
				};
				
			};
			
		};
		
		# section aspects
		foreach ($section_aspects as $aspect) {
			
			$aspect['section_id'] = $section_id;
			
			$aspect_items = $aspect['items'];
			unset($aspect['items']);
			
			$con->table = "sections_aspects";
			if ($aspect['id']) {
				
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
				
				$con->table = "aspects_items";
				if ($aspect_item['id']) {
					
					$aspect_item_id = $aspect_item['id'];
					
				} else {
					
					unset($aspect_item['id']);
					$save_aspect_item = $con->insertData($aspect_item);
					$aspect_item_id = $con->insertId;
					
				};
				
				# section item values
				foreach ($aspect_item_values as $ai_value) {
					
					$ai_value['aspect_item_id'] = $aspect_item_id;
					
					$value_sub_items = $ai_value['sub_items'];
					unset($ai_value['sub_items']);
					unset($ai_value['show_subitems']);
					
					$con->table = "aspect_item_values";
					if ($ai_value['id']) {
						
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