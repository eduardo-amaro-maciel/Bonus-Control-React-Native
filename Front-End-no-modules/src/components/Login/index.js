import React, { useState } from 'react'
import styles from "./styles";
import { 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity,
    Button,
    ScrollView,
    KeyboardAvoidingView,
    Alert
} from 'react-native'

export function Login({ navigation }) {

    const [inputEmail, setInputEmail ] = useState('')
    const [inputPass, setInputPass ] = useState('')

    const validarLogin = () => {
        if ((inputEmail != '') && (inputPass != '')) {
            
            const loginValidado = {
                "email": inputEmail,
                "pass": inputPass
            }

            fetch('https://bonus-control.herokuapp.com/actions/signIn.php', {
                method: 'POST',
                body: JSON.stringify(loginValidado)
            }).then(e => e.json()).then(e => {

                if (e.status === 1) {
                    
                    if (e.type === 0) {
                        navigation.navigate('Novo Produto')
                    } else (
                        navigation.navigate('Pontuação', {nome: e.name, pontos: e.points})
                    )
                } else {
                    Alert.alert(
                        "Erro",
                        "Usuario ou senha incorretos",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
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
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios'? 'padding' : 'height'} keyboardVerticalOffset={50}>
                <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>management.io</Text>
                    <Text style={styles.textLabel}>E-mail</Text>
                    <TextInput style={styles.textInput} onChangeText={setInputEmail}/>
                    <Text style={styles.textLabel}>Senha</Text>
                    <TextInput secureTextEntry={true} password={true} style={styles.textInput} onChangeText={setInputPass}/>
                    <TouchableOpacity style={styles.containerButton} onPress={validarLogin}>
                        <Text style={styles.sendButton}>ENTRAR</Text>
                    </TouchableOpacity>  
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

//<TouchableOpacity style={styles.containerButton} onPress={() => navigation.navigate('Pontuação')}>
