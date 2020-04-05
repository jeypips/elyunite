<?php

session_start();

if (isset($_SESSION['elyunite_user_id'])) unset($_SESSION['elyunite_user_id']);
if (isset($_SESSION['elyunite_user_office'])) unset($_SESSION['elyunite_user_office']);

echo "Logout Successful";

header("location: ../../../login.html");

?>