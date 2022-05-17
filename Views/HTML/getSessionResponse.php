<?php
    session_start();
    if(isset($_SESSION['idUserRunning'])){
        $response_array['status'] = 'success';
        $response_array['sessionUserID'] = $_SESSION['idUserRunning'];
        if($_SESSION['idUserRunning'] == 2){
            $_SESSION['admin'] = 2;
        }
    }else {
        $response_array['status'] = 'error';
    }
    header('Content-type: application/json');
    echo json_encode($response_array);
?>