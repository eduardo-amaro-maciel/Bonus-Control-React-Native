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

export function AdmExcluirUsuario({ navigation }) {

    const [codigoExcluir, setCodigoExcluir] = useState('')

    const validarExclusao = () => {
        if ((codigoExcluir != '')) {
            fetch(`https://bonus-control.herokuapp.com/actions/user/deleteUser.php?id=${codigoExcluir}`, {
                method: 'POST'
            }).then(e => e.json()).then((e) => {
                if (e.status === 1) {
                    Alert.alert(
                        "Sucesso!",
                        e.messagem,
                        [
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
            })
        } else {
            Alert.alert(
                "Erro",
                "Campos devem ser preenchidos para excluir um usuario",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios'? 'padding' : 'height'} keyboardVerticalOffset={50}>
            <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>EXCLUIR</Text>
                <Text style={styles.textLabel}>Código para excluir</Text>
                <TextInput style={styles.inputText} onChangeText={setCodigoExcluir}/>
                <TouchableOpacity style={styles.containerButton} onPress={validarExclusao}>
                    <Text style={styles.textButton}>Excluir</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


