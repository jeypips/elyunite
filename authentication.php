<?php

session_start();
if (!isset($_SESSION['elyunite_user_id'])) header("location: login.html");

?>