<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$account = $con->getData("SELECT * FROM accounts WHERE id = $_POST[id]");

$groups = $con->getData("SELECT id, name FROM groups WHERE id = ".$account[0]['groups']);
$account[0]['groups'] = (count($groups))?$groups[0]:array("id"=>0,"name"=>"");

$office = $con->getData("SELECT id, office_name FROM offices WHERE id = ".$account[0]['office']);
$account[0]['office'] = (count($office))?$office[0]:array("id"=>0,"office_name"=>"");

header("Content-Type: application/json");
echo json_encode($account[0]);

?>