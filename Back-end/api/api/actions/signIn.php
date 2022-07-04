<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

include_once '../connection.php';

$response_json = file_get_contents("php://input");
$datas = json_decode($response_json, true);

if($datas){

    $sql = "SELECT * FROM users WHERE email = :email AND pass = :pass LIMIT 1";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':email', $datas['email'], PDO::PARAM_STR);
    $stmt->bindParam(':pass', $datas['pass'], PDO::PARAM_STR);

    $stmt->execute();

    if($stmt->rowCount()){
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $response = [
            "status" => 1,
            "messagem" => "OK",
            'id' => $row['id'],
            'name' => $row['name'],
            'points' => $row['points'],
            'email' => $row['email'],
            'type' => $row['type']
        ];
    }else{
        $response = [
            "status" => 0,
            "messagem" => "Usuário não cadastrado no sistema!"
        ];
    }
    
}else{
    $response = [
        "status" => 2,
        "messagem" => "Erro ao fazer login, contate o administrador!"
    ];
}

http_response_code(200);
echo json_encode($response);