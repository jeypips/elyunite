<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$account = $con->getData("SELECT * FROM accounts WHERE id = $_POST[id]");

$groups = $con->getData("SELECT id, name FROM groups WHERE id = ".$account[0]['groups']);
$account[0]['groups'] = $groups[0];

header("Content-Type: application/json");
echo json_encode($account[0]);

?>