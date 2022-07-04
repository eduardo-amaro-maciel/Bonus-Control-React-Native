<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");
//<>

include_once '../../connection.php';

$sql = "SELECT * FROM users ORDER BY id ASC";
$stmt = $conn->prepare($sql);
$stmt->execute();

if($stmt->rowCount() > 0){
    while($rows = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($rows);

        $list_users["users"][$id] = [
            'id' => $id,
            'name' => $name,
            'active' => $active,
            'points' => $points,
            'email' => $email,
            'type' => $type
        ];
    }
}


http_response_code(200);
echo json_encode($list_users);