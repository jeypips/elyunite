<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$accounts = $con->getData("SELECT *, CONCAT(firstname,' ',lastname) fullname FROM accounts");

foreach($accounts as $key => $account){
	
	$groups = $con->getData("SELECT id, name FROM groups WHERE id = ".$account['groups']);
	$accounts[$key]['groups'] =(count($groups))?$groups[0]:array("id"=>0,"name"=>"");
	
	$office = $con->getData("SELECT id, office_name FROM offices WHERE id = ".$account['office']);	
	$accounts[$key]['office'] = (count($office))?$office[0]:array("id"=>0,"office_name"=>"");	
	
};

header("Content-Type: application/json");
echo json_encode($accounts);

?>