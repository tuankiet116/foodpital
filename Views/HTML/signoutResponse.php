<?php
    session_start();
    session_destroy();
    $response_array['status'] = 'success';
    header('Content-type: application/json');
    echo json_encode($response_array);
?>