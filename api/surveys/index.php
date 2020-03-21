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

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

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
			
			if ($section_item['item_type'] != 6) {
				$section_item['item_presentation'] = null;
			};
			
			# delete item values
			if (count($values_dels)) {
				
				$con->table = "section_item_values";
				$delete_values = array("id"=>implode(",",$values_dels));
				$con->deleteData($delete_values);					
				
			};

			$section_item['use_images'] = ((isset($section_item['use_images']))&&($section_item['use_images']))?1:0;

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
				
				switch ($section_item['item_type']) {
					
					case 1: # Bracket
					
						unset($si_value['siv_value']);
						unset($si_value['siv_value_other']);
						// $si_value['siv_min'];
						// $si_value['min_below'];
						// $si_value['siv_max'];
						// $si_value['max_above'];
						unset($si_value['data_type']);
						unset($si_value['row_type']);
						
						$si_value['min_below'] = ((isset($si_value['min_below']))&&($si_value['min_below']))?1:0;
						$si_value['max_above'] = ((isset($si_value['max_above']))&&($si_value['max_above']))?1:0;							
					
					break;
					
					case 2: # Checkbox
					
						// $si_value['siv_value'];
						unset($si_value['siv_value_other']);
						unset($si_value['siv_min']);
						unset($si_value['min_below']);
						unset($si_value['siv_max']);
						unset($si_value['max_above']);
						unset($si_value['data_type']);
						unset($si_value['row_type']);					
					
					break;
					
					case 3: # Text Input
					
						unset($si_value['siv_value']);
						unset($si_value['siv_value_other']);
						unset($si_value['siv_min']);
						unset($si_value['min_below']);
						unset($si_value['siv_max']);
						unset($si_value['max_above']);
						// $si_value['data_type'];
						unset($si_value['row_type']);						
					
					break;
					
					case 4: # Radios
					
						// $si_value['siv_value'];
						// $si_value['siv_value_other'];
						unset($si_value['siv_min']);
						unset($si_value['min_below']);
						unset($si_value['siv_max']);
						unset($si_value['max_above']);
						unset($si_value['data_type']);
						unset($si_value['row_type']);

						$si_value['siv_value_other'] = ((isset($si_value['siv_value_other']))&&($si_value['siv_value_other']))?1:0;						
					
					break;
					
					case 5: # Selections
					
						// $si_value['siv_value'];
						unset($si_value['siv_value_other']);
						unset($si_value['siv_min']);
						unset($si_value['min_below']);
						unset($si_value['siv_max']);
						unset($si_value['max_above']);
						unset($si_value['data_type']);
						unset($si_value['row_type']);					
					
					break;
					
					case 6: # Single Row
					
						// $si_value['siv_value'];
						unset($si_value['siv_value_other']);
						unset($si_value['siv_min']);
						unset($si_value['min_below']);
						unset($si_value['siv_max']);
						unset($si_value['max_above']);
						unset($si_value['data_type']);
						unset($si_value['row_type']);
					
					break;
					
					case 7: # Multi Rows
					
						unset($si_value['siv_value']);
						unset($si_value['siv_value_other']);
						unset($si_value['siv_min']);
						unset($si_value['min_below']);
						unset($si_value['siv_max']);
						unset($si_value['max_above']);
						// $si_value['data_type'];
						unset($si_value['row_type']);						
					
					break;
					
				};
				
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
					
					switch ($section_item['item_type']) {
						
						case 1: # Bracket
						
							unset($vsi['vsi_value']);
							unset($vsi['vsi_value_other']);
							// $vsi['vsi_min'];
							// $vsi['min_below'];
							// $vsi['vsi_max'];
							// $vsi['max_above'];
							unset($vsi['data_type']);
							unset($vsi['row_type']);
							
							$vsi['vsi_min'] = ((isset($vsi['vsi_min']))&&($vsi['vsi_min']))?1:0;
							$vsi['vsi_max'] = ((isset($vsi['vsi_max']))&&($vsi['vsi_max']))?1:0;								
						
						break;
						
						case 2: # Checkbox
						
							// $vsi['vsi_value'];
							unset($vsi['vsi_value_other']);
							unset($vsi['vsi_min']);
							unset($vsi['min_below']);
							unset($vsi['vsi_max']);
							unset($vsi['max_above']);
							unset($vsi['data_type']);
							unset($vsi['row_type']);					
						
						break;
						
						case 3: # Text Input
						
							unset($vsi['vsi_value']);
							unset($vsi['vsi_value_other']);
							unset($vsi['vsi_min']);
							unset($vsi['min_below']);
							unset($vsi['vsi_max']);
							unset($vsi['max_above']);
							// $vsi['data_type'];
							unset($vsi['row_type']);						
						
						break;
						
						case 4: # Radios
						
							// $vsi['vsi_value'];
							// $vsi['vsi_value_other'];
							unset($vsi['vsi_min']);
							unset($vsi['min_below']);
							unset($vsi['vsi_max']);
							unset($vsi['max_above']);
							unset($vsi['data_type']);
							unset($vsi['row_type']);

							$vsi['vsi_value_other'] = ((isset($vsi['vsi_value_other']))&&($vsi['vsi_value_other']))?1:0;							
						
						break;
						
						case 5: # Selections
						
							// $vsi['vsi_value'];
							unset($vsi['vsi_value_other']);
							unset($vsi['vsi_min']);
							unset($vsi['min_below']);
							unset($vsi['vsi_max']);
							unset($vsi['max_above']);
							unset($vsi['data_type']);
							unset($vsi['row_type']);					
						
						break;
						
						case 6: # Single Row
						
							// $vsi['vsi_value'];
							unset($vsi['vsi_value_other']);
							unset($vsi['vsi_min']);
							unset($vsi['min_below']);
							unset($vsi['vsi_max']);
							unset($vsi['max_above']);
							unset($vsi['data_type']);
							unset($vsi['row_type']);					
						
						break;
						
						case 7: # Multi Rows
						
							unset($vsi['vsi_value']);
							unset($vsi['vsi_value_other']);
							unset($vsi['vsi_min']);
							unset($vsi['min_below']);
							unset($vsi['vsi_max']);
							unset($vsi['max_above']);
							// $vsi['data_type'];
							unset($vsi['row_type']);						
						
						break;
						
					};					
					
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
				
				if ($aspect_item['item_type'] != 6) {
					$aspect_item['item_presentation'] = null;
				};
				
				# delete item values
				if (count($values_dels)) {
					
					$con->table = "aspect_item_values";
					$delete_values = array("id"=>implode(",",$values_dels));
					$con->deleteData($delete_values);					
					
				};				

				$aspect_item['use_images'] = ((isset($aspect_item['use_images']))&&($aspect_item['use_images']))?1:0;

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
					
					switch ($aspect_item['item_type']) {
						
						case 1: # Bracket
						
							unset($ai_value['siv_value']);
							unset($ai_value['siv_value_other']);
							// $ai_value['siv_min'];
							// $ai_value['min_below'];
							// $ai_value['siv_max'];
							// $ai_value['max_above'];
							unset($ai_value['data_type']);
							unset($ai_value['row_type']);
							
							$ai_value['min_below'] = ((isset($ai_value['min_below']))&&($ai_value['min_below']))?1:0;
							$ai_value['max_above'] = ((isset($ai_value['max_above']))&&($ai_value['max_above']))?1:0;								
						
						break;
						
						case 2: # Checkbox
						
							// $ai_value['siv_value'];
							unset($ai_value['siv_value_other']);
							unset($ai_value['siv_min']);
							unset($ai_value['min_below']);
							unset($ai_value['siv_max']);
							unset($ai_value['max_above']);
							unset($ai_value['data_type']);
							unset($ai_value['row_type']);					
						
						break;
						
						case 3: # Text Input
						
							unset($ai_value['siv_value']);
							unset($ai_value['siv_value_other']);
							unset($ai_value['siv_min']);
							unset($ai_value['min_below']);
							unset($ai_value['siv_max']);
							unset($ai_value['max_above']);
							// $ai_value['data_type'];
							unset($ai_value['row_type']);						
						
						break;
						
						case 4: # Radios
						
							// $ai_value['siv_value'];
							// $ai_value['siv_value_other'];
							unset($ai_value['siv_min']);
							unset($ai_value['min_below']);
							unset($ai_value['siv_max']);
							unset($ai_value['max_above']);
							unset($ai_value['data_type']);
							unset($ai_value['row_type']);

							$ai_value['siv_value_other'] = ((isset($ai_value['siv_value_other']))&&($ai_value['siv_value_other']))?1:0;											
						
						break;
						
						case 5: # Selections
						
							// $ai_value['siv_value'];
							unset($ai_value['siv_value_other']);
							unset($ai_value['siv_min']);
							unset($ai_value['min_below']);
							unset($ai_value['siv_max']);
							unset($ai_value['max_above']);
							unset($ai_value['data_type']);
							unset($ai_value['row_type']);					
						
						break;
						
						case 6: # Single Row
						
							// $ai_value['siv_value'];
							unset($ai_value['siv_value_other']);
							unset($ai_value['siv_min']);
							unset($ai_value['min_below']);
							unset($ai_value['siv_max']);
							unset($ai_value['max_above']);
							unset($ai_value['data_type']);
							unset($ai_value['row_type']);					
						
						break;
						
						case 7: # Multi Rows
						
							unset($ai_value['siv_value']);
							unset($ai_value['siv_value_other']);
							unset($ai_value['siv_min']);
							unset($ai_value['min_below']);
							unset($ai_value['siv_max']);
							unset($ai_value['max_above']);
							// $ai_value['data_type'];
							unset($ai_value['row_type']);						
						
						break;
						
					};					
					
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
						
						switch ($aspect_item['item_type']) {
							
							case 1: # Bracket
							
								unset($vsi['vsi_value']);
								unset($vsi['vsi_value_other']);
								// $vsi['vsi_min'];
								// $vsi['min_below'];
								// $vsi['vsi_max'];
								// $vsi['max_above'];
								unset($vsi['data_type']);
								unset($vsi['row_type']);
								
								$vsi['vsi_min'] = ((isset($vsi['vsi_min']))&&($vsi['vsi_min']))?1:0;
								$vsi['vsi_max'] = ((isset($vsi['vsi_max']))&&($vsi['vsi_max']))?1:0;								
								
							
							break;
							
							case 2: # Checkbox
							
								// $vsi['vsi_value'];
								unset($vsi['vsi_value_other']);
								unset($vsi['vsi_min']);
								unset($vsi['min_below']);
								unset($vsi['vsi_max']);
								unset($vsi['max_above']);
								unset($vsi['data_type']);
								unset($vsi['row_type']);					
							
							break;
							
							case 3: # Text Input
							
								unset($vsi['vsi_value']);
								unset($vsi['vsi_value_other']);
								unset($vsi['vsi_min']);
								unset($vsi['min_below']);
								unset($vsi['vsi_max']);
								unset($vsi['max_above']);
								// $vsi['data_type'];
								unset($vsi['row_type']);						
							
							break;
							
							case 4: # Radios
							
								// $vsi['vsi_value'];
								// $vsi['vsi_value_other'];
								unset($vsi['vsi_min']);
								unset($vsi['min_below']);
								unset($vsi['vsi_max']);
								unset($vsi['max_above']);
								unset($vsi['data_type']);
								unset($vsi['row_type']);

								$vsi['vsi_value_other'] = ((isset($vsi['vsi_value_other']))&&($vsi['vsi_value_other']))?1:0;								
							
							break;
							
							case 5: # Selections
							
								// $vsi['vsi_value'];
								unset($vsi['vsi_value_other']);
								unset($vsi['vsi_min']);
								unset($vsi['min_below']);
								unset($vsi['vsi_max']);
								unset($vsi['max_above']);
								unset($vsi['data_type']);
								unset($vsi['row_type']);					
							
							break;
							
							case 6: # Single Row
							
								// $vsi['vsi_value'];
								unset($vsi['vsi_value_other']);
								unset($vsi['vsi_min']);
								unset($vsi['min_below']);
								unset($vsi['vsi_max']);
								unset($vsi['max_above']);
								unset($vsi['data_type']);
								unset($vsi['row_type']);					
							
							break;
							
							case 7: # Multi Rows
							
								unset($vsi['vsi_value']);
								unset($vsi['vsi_value_other']);
								unset($vsi['vsi_min']);
								unset($vsi['min_below']);
								unset($vsi['vsi_max']);
								unset($vsi['max_above']);
								// $vsi['data_type'];
								unset($vsi['row_type']);						
							
							break;
							
						};						
						
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

$app->get('/all', function (Request $request, Response $response, array $args) {

	require_once 'classes.php';
	
	$con = $this->con;
	$con->table = "surveys";

	$survey = new survey($con,0);

	return $response->withJson($survey->getAll());

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