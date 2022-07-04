<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

include_once '../../connection.php';

$response_json = file_get_contents("php://input");
$datas = json_decode($response_json, true);

if($datas){

    $sql = "UPDATE products SET name = :name, points_earnings = :points_earnings, points_required = :points_required, value = :value WHERE id = :id";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':name', $datas['name'], PDO::PARAM_STR);
    $stmt->bindParam(':points_earnings', $datas['points_earnings'], PDO::PARAM_INT);
    $stmt->bindParam(':points_required', $datas['points_required'], PDO::PARAM_INT);
    $stmt->bindParam(':value', $datas['value'], PDO::PARAM_INT);
    $stmt->bindParam(':id', $datas['id'], PDO::PARAM_INT);

    $stmt->execute();

    if($stmt->rowCount()){
        $response = [
            "status" => 1,
            "messagem" => "Produto editado com sucesso!"
        ];
    }else{
        $response = [
            "status" => 0,
            "messagem" => "Erro ao editar o produto!"
        ];
    }
    
}else{
    $response = [
        "status" => 2,
        "messagem" => "Erro ao editar o produto!"
    ];
}

http_response_code(200);
echo json_encode($response);