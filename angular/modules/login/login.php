<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$username = (isset($_POST['username']))?$_POST['username']:"";
$password = (isset($_POST['password']))?$_POST['password']:"";

$con = new pdo_db();
$sql = "SELECT id, office FROM accounts WHERE username = '$username' AND password = '$password'";
$account = $con->getData($sql);
if (($con->rows) > 0) {
	session_start();
	$_SESSION['elyunite_user_id'] = $account[0]['id'];
	$_SESSION['elyunite_user_office'] = $account[0]['office'];
	echo json_encode(array("login"=>true));
} else {
	echo json_encode(array("login"=>false));
}

?>