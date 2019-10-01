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

# add account
$app->post('/add', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "users";

	$data = $request->getParsedBody();
	$user = $data['user'];
	$privileges = $data['privileges'];
	
	require_once '../../classes.php';	
	
	$arrayHex = new ArrayHex();
	$user['privileges'] = $arrayHex->toHex(json_encode($privileges));	
	
	unset($user['id']);
	$con->insertObj($user);

});

# update account
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

# view account
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