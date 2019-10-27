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

	require_once 'classes.php';	

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
				
				$con->table = "section_item_values";
				if ($si_value['id']) {
					
					$si_value_id = $si_value['id'];
					
				} else {
					
					unset($si_value['id']);
					$save_si_value = $con->insertData($si_value);
					$si_value_id = $con->insertId;
					
				};
				
				# section item value sub items
				foreach ($value_sub_items as $vsi) {
					
				};
				
			};
			
		};
		
	};

});

# update
$app->put('/update', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "users";

	$data = $request->getParsedBody();
	$user = $data['user'];
	$privileges = $data['privileges'];	

	require_once '../../classes.php';

	$arrayHex = new ArrayHex();
	$user['privileges'] = $arrayHex->toHex(json_encode($privileges));

	$con->updateObj($user,'id');

});

# view
$app->get('/view/{id}', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "users";

	$user = $con->get(array("id"=>$args['id']));
	
	$group_id = ($user[0]['group_id'])?$user[0]['group_id']:0;

	$group = $con->getData("SELECT id, group_name FROM groups WHERE id = $group_id");

	$user[0]['group_id'] = ($user[0]['group_id'])?$group[0]:array("id"=>0,"group_name"=>"");

	$div_id = ($user[0]['div_id'])?$user[0]['div_id']:0;

	$office = $con->getData("SELECT id, office FROM offices WHERE id = $div_id");

	$user[0]['div_id'] = ($office)?$office[0]:array("id"=>0,"office"=>"");

    return $response->withJson($user[0]);

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