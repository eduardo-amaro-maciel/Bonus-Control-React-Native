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

export function AdmCadastroUsuario({ navigation }) {

    const [nomeUsuario, setNomeUsuario] = useState('')
    const [pontosUsuario, setPontosUsuario] = useState('')
    const [emailUsuario, setEmailUsuario] = useState('')
    const [senhaUsuario, setSenhaUsuario] = useState('')
    const [tipoUsuario, setTipoUsuario] = useState('')

    const validar = () => {

        if ((nomeUsuario != '') && (pontosUsuario != '') && (emailUsuario != '') && (senhaUsuario != '') && (tipoUsuario != '')) {
            const usuarioNovo = {
                "user":{
                    "name": nomeUsuario,
                    "points": Number(pontosUsuario),
                    "email": emailUsuario,
                    "pass": senhaUsuario,
                    "type": Number(tipoUsuario)
                }
            }
            
            fetch('https://bonus-control.herokuapp.com/actions/user/registerUser.php', {
                method: 'POST',
                body: JSON.stringify(usuarioNovo)

            }).then(e => e.json()).then(e => {
                Alert.alert(
                    "Sucesso!",
                    "Usuario Adicionado",
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
                <Text style={styles.title}>CADASTRO DE USUÁRIO</Text>

                <Text style={styles.textLabel}>Nome</Text>
                <TextInput style={styles.inputText} onChangeText={setNomeUsuario}/>

                <Text style={styles.textLabel}>Pontos</Text>
                <TextInput style={styles.inputText} onChangeText={setPontosUsuario}/>

                <Text style={styles.textLabel}>E-mail</Text>
                <TextInput style={styles.inputText} onChangeText={setEmailUsuario}/>

                <Text style={styles.textLabel}>Senha</Text>
                <TextInput style={styles.inputText} onChangeText={setSenhaUsuario}/>

                <Text style={styles.textLabel}>Tipo de Usuario</Text>
                <TextInput style={styles.inputText} onChangeText={setTipoUsuario}/>

                <TouchableOpacity style={styles.containerButton} onPress={validar}>
                    <Text style={styles.textButton}>CADASTRAR</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


