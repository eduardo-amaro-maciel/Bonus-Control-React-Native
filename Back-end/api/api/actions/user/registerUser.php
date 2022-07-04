<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

include_once '../../connection.php';

$response_json = file_get_contents("php://input");
$datas = json_decode($response_json, true);

if($datas){

    $sql = "INSERT INTO users (name, points, email, pass, type) VALUES (:name, :points, :email, :pass, :type)";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':name', $datas['user']['name'], PDO::PARAM_STR);
    $stmt->bindParam(':points', $datas['user']['points'], PDO::PARAM_INT);
    $stmt->bindParam(':email', $datas['user']['email'], PDO::PARAM_STR);
    $stmt->bindParam(':pass', $datas['user']['pass'], PDO::PARAM_STR);
    $stmt->bindParam(':type', $datas['user']['type'], PDO::PARAM_INT);
    $stmt->execute();

    if($stmt->rowCount()){
        $response = [
            "status" => 1,
            "messagem" => "Usuário cadastrado com sucesso!"
        ];
    }else{
        $response = [
            "status" => 0,
            "messagem" => "Erro ao cadastrar o usuário!"
        ];
    }
    
}else{
    $response = [
        "status" => 2,
        "messagem" => "Erro ao cadastrar o usuário!"
    ];
}

http_response_code(200);
echo json_encode($response);