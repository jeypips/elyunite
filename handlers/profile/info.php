<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$session_user_id = $_SESSION['id'];	

$user = $con->getData("SELECT username FROM accounts WHERE id = $session_user_id");	
	
header("Content-Type: application/json");
echo json_encode($user[0]);

?>