<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

include_once '../../connection.php';

$response_json = file_get_contents("php://input");
$datas = json_decode($response_json, true);

if($datas){

    $sql = "UPDATE users SET name = :name, active = :active, points = :points WHERE id = :id";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':name', $datas['name'], PDO::PARAM_STR);
    $stmt->bindParam(':active', $datas['active'], PDO::PARAM_INT);
    $stmt->bindParam(':points', $datas['points'], PDO::PARAM_INT);
    $stmt->bindParam(':id', $datas['id'], PDO::PARAM_INT);

    $stmt->execute();

    if($stmt->rowCount()){
        $response = [
            "status" => 1,
            "messagem" => "Usuário editado com sucesso!"
        ];
    }else{
        $response = [
            "status" => 0,
            "messagem" => "Erro ao editar o usuário!"
        ];
    }
    
}else{
    $response = [
        "status" => 2,
        "messagem" => "Erro ao editar o usuário!"
    ];
}

http_response_code(200);
echo json_encode($response);