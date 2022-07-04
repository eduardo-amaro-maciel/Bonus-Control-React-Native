<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

include_once '../../connection.php';

$id = filter_input(INPUT_GET, "id", FILTER_SANITIZE_NUMBER_INT);

$sql = "DELETE FROM products WHERE id = :id LIMIT 1";
$stmt = $conn->prepare($sql);

$stmt->bindParam(':id', $id, PDO::PARAM_INT);

if($stmt->execute()){
    $response = [
        "status" => 1,
        "messagem" => "Produto excluído com sucesso!"
    ];
}else{
    $response = [
        "status" => 0,
        "messagem" => "Erro ao excluir o produto!"
    ];
}
    
http_response_code(200);
echo json_encode($response);