<?php
require_once("./utils/config.php");
switch (basename($_SERVER['REQUEST_URI'], '.php')) {
        case 'allCriminals':
            include('pages/allCriminals.php');
            break;
        case 'view':
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
