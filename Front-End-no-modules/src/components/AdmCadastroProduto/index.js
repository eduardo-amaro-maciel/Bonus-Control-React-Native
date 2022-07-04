import React, { useState }from 'react'
import styles from "./styles";
import { 
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    PlatformColor,
    Alert
} from 'react-native'

export function AdmCadastroProduto({ navigation }) {

    const [nomeProduto, setNomeProduto] = useState('')
    const [pontuacaoProdutoGanha, setPontuacaoProdutoGanha] = useState('')
    const [pontuacaoRequeridaProduto, setPontuacaoRequeridaProduto] = useState('')
    const [valorProduto, setValorProduto] = useState('')

    //const valorInput = e => setProduto({...produto, nomeProduto, pontuacaoProdutoGanha, pontuacaoRqueridaProduto, valorProduto})

    const validar = () => {

        if ((nomeProduto != '') && (pontuacaoProdutoGanha != '') && (pontuacaoRequeridaProduto != '') && (valorProduto != '') ) {
            const produto = {
                "product":{
                    "name": nomeProduto,
                    "points_earnings": Number(pontuacaoProdutoGanha),
                    "points_required": Number(pontuacaoRequeridaProduto),
                    "value": Number(valorProduto)
                }
            }
            
            fetch('https://bonus-control.herokuapp.com/actions/product/registerProduct.php', {
                method: 'POST',
                body: JSON.stringify(produto)
            }).then(e => e.json()).then(e => {
                Alert.alert(
                    "Sucesso!",
                    "Produto Adicionado",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                console.log(e)
            })

        } else {

            Alert.alert(
                "Erro",
                "Campos devem ser preenchidos",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios'? 'padding' : 'height'} keyboardVerticalOffset={50}>
            <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>CADASTRO DE PRODUTOS</Text>
                <Text style={styles.textLabel}>Nome do Produto</Text>
                <TextInput style={styles.inputText} onChangeText={setNomeProduto}/>
                <Text style={styles.textLabel}>Pontuação Ganha</Text>
                <TextInput style={styles.inputText} onChangeText={setPontuacaoProdutoGanha}/>
                <Text style={styles.textLabel}>Pontuação Requerida</Text>
                <TextInput style={styles.inputText} onChangeText={setPontuacaoRequeridaProduto}/>
                <Text style={styles.textLabel}>Valor em R$</Text>
                <TextInput style={styles.inputText} onChangeText={setValorProduto}/>
                <TouchableOpacity style={styles.containerButton} onPress={validar}>
                    <Text style={styles.textButton}>CADASTRAR</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


