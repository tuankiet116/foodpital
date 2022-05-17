<?php
  // if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  //   $jsonString = file_get_contents("php://input");
  //   echo $jsonString ;
  //   $phpObject = json_decode($jsonString);
  //   echo $phpObject->id_User;
  //   $newJsonString = json_encode($phpObject);
  //   header('Content-Type: application/json');
  //   echo $newJsonString
  //   echo 'post';
  // }
  // else{
  //   echo 'nopost';
  // }
  if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $jsonString = (file_get_contents("php://input"));
    $phpObject = json_decode($jsonString,true);
    session_start();
    $_SESSION['idUserRunning'] = $phpObject["id_User"];
    $response_array['sessionid'] = $_SESSION['idUserRunning'];
    $response_array['status'] = 'success';
  }else {
    $response_array['status'] = 'error';      
  }
  header('Content-type: application/json');
  echo json_encode($response_array);
?>