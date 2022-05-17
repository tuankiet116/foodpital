<?php
    function getCurURL()
    {
        if (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on") {
            $pageURL = "https://";
        } else {
          $pageURL = 'http://';
        }
        if (isset($_SERVER["SERVER_PORT"]) && $_SERVER["SERVER_PORT"] != "80") {
            
            $pageURL .= $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"] . $_SERVER["REQUEST_URI"];
        } else {
            $pageURL .= $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
        }
        return trim($pageURL);
    }

    if(!isset($_SESSION['idUserRunning'])){
        if(getCurURL() != "http://localhost/foodpital/Views/HTML/signin.php"){
            header("Location: http://localhost/foodpital/Views/HTML/signin.php");
            die();
        }
    } else{
        if(getCurURL() == "http://localhost/foodpital/Views/HTML/signin.php"){
            header("Location: http://localhost/foodpital/Views/HTML/newsfeed.php");
            die();
        } 
    }
?>