<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

include_once '../../connection.php';

$response_json = file_get_contents("php://input");
$datas = json_decode($response_json, true);

if($datas){

    $sql = "UPDATE shopping SET user_id = :user_id, product_id = :product_id WHERE id = :id";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':user_id', $datas['user_id'], PDO::PARAM_INT);
    $stmt->bindParam(':product_id', $datas['product_id'], PDO::PARAM_INT);
    $stmt->bindParam(':id', $datas['id'], PDO::PARAM_INT);

    $stmt->execute();

    if($stmt->rowCount()){
        $response = [
            "status" => 1,
            "messagem" => "Compra editada com sucesso!"
        ];
    }else{
        $response = [
            "status" => 0,
            "messagem" => "Erro ao editar a compra!"
        ];
    }
    
}else{
    $response = [
        "status" => 2,
        "messagem" => "Erro ao editar a compra!"
    ];
}

http_response_code(200);
echo json_encode($response);