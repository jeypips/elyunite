<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$offices = $con->getData("SELECT id, office_name, office_description FROM offices");

header("Content-Type: application/json");
echo json_encode($offices);

?>