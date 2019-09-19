<?php

session_start();

if (isset($_SESSION['elyunite_user_id'])) unset($_SESSION['elyunite_user_id']);

echo "Logout Successful";

header("location: ../../../login.html");

?>