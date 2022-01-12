<?php
require_once("./utils/config.php");

switch (explode('?', basename($_SERVER['REQUEST_URI'], '.php'))[0]) {
    case 'allCriminals':
        include('pages/allCriminals.php');
        break;
    case 'view.php':
        include('pages/view.php');
        break;

    default:
        if (basename($_SERVER['REQUEST_URI'], '.php') == '' || basename($_SERVER['REQUEST_URI'], '.php') == 'index') {
            include('./pages/home.php');
        } else {
            header('HTTP/1.0 404 Not Found');
            include('./pages/404.php');
        }
        break;
}
