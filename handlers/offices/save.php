<?php

// header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("offices");

if ($_POST['office']['id']) {
	
	$office = $con->updateObj($_POST['office'],'id');
	
} else {
	
	$office = $con->insertObj($_POST['office']);
	echo $con->insertId;

}

?>