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

export function AdmEditarUsuario({ navigation }) {

    const [nomeUsuario, setNomeUsuario] = useState('')
    const [activeUsuario, setActiveUsuario] = useState('')
    const [pontosUsuario, setPontosUsuario] = useState('')
    const [codigoUsuario, setCodigoUsuario] = useState('')

    const validarEdicao = () => {
        if ((nomeUsuario != '') && (activeUsuario != '') && (pontosUsuario != '') && (codigoUsuario != '')) {
            const usuarioEditado = {
                "name": nomeUsuario,
                "active": activeUsuario,
                "points": Number(pontosUsuario),
                "id": Number(codigoUsuario),
            }
            fetch('https://bonus-control.herokuapp.com/actions/user/updateUser.php', {
                method: 'POST',
                body: JSON.stringify(usuarioEditado)

            }).then(e => e.json()).then(e => {
                Alert.alert(
                    "Sucesso!",
                    "Usuario Editado",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                console.log(e)
            })
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios'? 'padding' : 'height'} keyboardVerticalOffset={50}>
            <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>EDITAR USUÁRIO</Text>

                <Text style={styles.textLabel}>Código do Usuario</Text>
                <TextInput style={styles.inputText} onChangeText={setCodigoUsuario}/>

                <Text style={styles.textLabel}>Nome</Text>
                <TextInput style={styles.inputText} onChangeText={setNomeUsuario}/>

                <Text style={styles.textLabel}>Pontos</Text>
                <TextInput style={styles.inputText} onChangeText={setPontosUsuario}/>

                <Text style={styles.textLabel}>Usuario Ativo?</Text>
                <TextInput style={styles.inputText} onChangeText={setActiveUsuario}/>

                <TouchableOpacity style={styles.containerButton} onPress={validarEdicao}>
                    <Text style={styles.textButton}>EDITAR</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


