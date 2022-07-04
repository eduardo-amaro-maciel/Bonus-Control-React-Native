<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

include_once '../../connection.php';

$sql = "SELECT * FROM shopping ORDER BY id ASC";
$stmt = $conn->prepare($sql);
$stmt->execute();

if($stmt->rowCount() > 0){
    while($rows = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($rows);

        $list_shoppings["shoppings"][$id] = [
            'id' => $id,
            'user_id' => $user_id,
            'product_id' => $product_id
        ];
    }
}


http_response_code(200);
echo json_encode($list_shoppings);