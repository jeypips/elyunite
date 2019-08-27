<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$accounts = $con->getData("SELECT *, CONCAT(firstname,' ',lastname) fullname FROM accounts");

foreach($accounts as $key => $account){
	
	$groups = $con->getData("SELECT id, name FROM groups WHERE id = ".$account['groups']);
	$accounts[$key]['groups'] = $groups[0];
	
};

header("Content-Type: application/json");
echo json_encode($accounts);

?>