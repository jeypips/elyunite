<?php

// header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("accounts");

$_POST['account']['groups'] = $_POST['account']['groups']['id'];
$_POST['account']['office'] = $_POST['account']['office']['id'];

if ($_POST['account']['id']) {
	
	$account = $con->updateData($_POST['account'],'id');
	
} else {
	
	$account = $con->insertData($_POST['account']);
	echo $con->insertId;

}

?>