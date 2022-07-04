<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

include_once '../../connection.php';

$response_json = file_get_contents("php://input");
$datas = json_decode($response_json, true);

if($datas){

    $sql = "INSERT INTO products (name, points_earnings, points_required, value) VALUES (:name, :points_earnings, :points_required, :value)";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':name', $datas['product']['name'], PDO::PARAM_STR);
    $stmt->bindParam(':points_earnings', $datas['product']['points_earnings'], PDO::PARAM_INT);
    $stmt->bindParam(':points_required', $datas['product']['points_required'], PDO::PARAM_INT);
    $stmt->bindParam(':value', $datas['product']['value'], PDO::PARAM_INT);
    $stmt->execute();

    if($stmt->rowCount()){
        $response = [
            "status" => 1,
            "messagem" => "Produto cadastrado com sucesso!"
        ];
    }else{
        $response = [
            "status" => 0,
            "messagem" => "Erro ao cadastrar o produto!"
        ];
    }
    
}else{
    $response = [
        "status" => 2,
        "messagem" => "Erro ao cadastrar o produto!"
    ];
}

http_response_code(200);
echo json_encode($response);