<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$office = $con->getData("SELECT id, office_name, office_description FROM offices WHERE id = $_POST[id]");

header("Content-Type: application/json");
echo json_encode($office[0]);

?>