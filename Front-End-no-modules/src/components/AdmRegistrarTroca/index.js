import React, { useState } from 'react'
import styles from "./styles";
import { 
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Alert
} from 'react-native'

export function AdmRegistrarTroca({ navigation }) {

    const [codUsuario, setcodUsuario] = useState('')
    const [codProduto, setcodProduto] = useState('')

    const validarEdicao = () => {
        if ((codUsuario != '') && (codProduto != '')) {
            const novaCompra = {
                "shopping": {
                    "user_id": Number(codUsuario),
                    "product_id": Number(codProduto)
                }
            }
            fetch('https://bonus-control.herokuapp.com/actions/shopping/registerBuy.php', {
                method: 'POST',
                body: JSON.stringify(novaCompra)

            }).then(e => e.json()).then(e => {
                Alert.alert(
                    "Sucesso!",
                    "Troca feita com sucesso!",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                console.log(e)
            })
        } else {
            Alert.alert(
                "Erro!",
                "Preencha os Campos",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios'? 'padding' : 'height'} keyboardVerticalOffset={50}>
            <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>EDITAR USUÁRIO</Text>

                <Text style={styles.textLabel}>Código do Usuario</Text>
                <TextInput style={styles.inputText} onChangeText={setcodUsuario}/>

                <Text style={styles.textLabel}>Código do Produto</Text>
                <TextInput style={styles.inputText} onChangeText={setcodProduto}/>

                <TouchableOpacity style={styles.containerButton} onPress={validarEdicao}>
                    <Text style={styles.textButton}>TROCAR</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


