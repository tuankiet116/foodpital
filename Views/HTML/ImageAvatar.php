<?php
$imageName = $_FILES["file"]["name"];
$imageTmp = $_FILES["file"]["tmp_name"];
$nameExp = explode('.', $imageName);
$ext = end($nameExp);
$newName = rand(100,999) . '.' . $ext;

move_uploaded_file($imageTmp, "../../Assets/AvatarUser/$newName");
header('Content-type: application/json');
echo "../../Assets/AvatarUser/$newName";
?>


