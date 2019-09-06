<?php


$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$accounts = $con->getData("SELECT count(*) accounts FROM accounts");
$groups = $con->getData("SELECT count(*) groups FROM groups");

$dashboard = array (
	
	"accounts" => (count($accounts))?$accounts[0]['accounts']:0,
	"groups" => (count($groups))?$groups[0]['groups']:0,
	
);

header("Content-Type: application/json");
echo json_encode($dashboard);

?>