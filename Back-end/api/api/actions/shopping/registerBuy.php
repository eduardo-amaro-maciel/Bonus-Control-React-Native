<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

include_once '../../connection.php';

$response_json = file_get_contents("php://input");
$datas = json_decode($response_json, true);

if($datas){

    $sqlUser = "SELECT points FROM users WHERE id = :user_id";
    $stmtU = $conn->prepare($sqlUser);
    $stmtU->bindParam(':user_id', $datas['shopping']['user_id'], PDO::PARAM_INT);
    $stmtU->execute();

    if($stmtU->rowCount() > 0){
        $row = $stmtU->fetch(PDO::FETCH_ASSOC);
        $pointsUser = $row['points'];

        
        $sqlProduct = "SELECT * FROM products WHERE id = :product_id ";
        $stmtP = $conn->prepare($sqlProduct);
        $stmtP->bindParam(':product_id', $datas['shopping']['product_id'], PDO::PARAM_INT);
        $stmtP->execute();
        if($stmtP->rowCount() > 0){
            $rowP = $stmtP->fetch(PDO::FETCH_ASSOC);
            $pointsEarnings = $rowP['points_earnings'];
            $pointsRequired = $rowP['points_required'];

            if($pointsUser < $pointsRequired){
                $response = [
                    "status" => 0,
                    "messagem" => "O usuário não possui pontos suficientes para esta compra!"
                ];
            }else{
                //compra efetuada
                //Pontos do usuário - Pontos exigidos + Pontos que o produto da com a compra
                $rest = ($pointsUser - $pointsRequired) + $pointsEarnings;
                $sqlUp = "UPDATE users SET points = '".$rest."' WHERE id = '".$datas['shopping']['user_id']."' ";
                $stmtUp = $conn->prepare($sqlUp);
                $stmtUp->execute();
                if($stmtUp->rowCount() > 0){

                    $sql = "INSERT INTO shopping (user_id, product_id) VALUES (:user_id, :product_id)";
                    $stmt = $conn->prepare($sql);

                    $stmt->bindParam(':user_id', $datas['shopping']['user_id'], PDO::PARAM_INT);
                    $stmt->bindParam(':product_id', $datas['shopping']['product_id'], PDO::PARAM_INT);
                    $stmt->execute();

                    if($stmt->rowCount()){
                        $response = [
                            "status" => 1,
                            "messagem" => "Compra efetuada com sucesso!"
                        ];
                    }else{
                        $response = [
                            "status" => 0,
                            "messagem" => "Erro ao efetuar a compra!"
                        ];
                    }
                }
            }
        }
    }
    
}else{
    $response = [
        "status" => 2,
        "messagem" => "Erro ao efetuar a compra!"
    ];
}

http_response_code(200);
echo json_encode($response);