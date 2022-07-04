import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Button, RefreshControl } from 'react-native'
import styles from "./styles";

export function AdmListagemUsuario({ navigation }) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [atualizando, setAtualizando] = useState(false)

    const requetListUsers = () => {
        setLoading(true)

         fetch('https://bonus-control.herokuapp.com/actions/user/listUsers.php', {method: 'GET'})
            .then((response) => response.json())
            .then((response) => setData(response.users))

        setLoading(false) 
    }

    const atualizar = () => {
        setAtualizando(true)
        setTimeout(() => {
            requetListUsers()
            setAtualizando(false)
        }, 2000)
    }

    useEffect(() => {
        requetListUsers()
    }, [])

    return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={atualizando} onRefresh={atualizar}/>}>
            <Text style={styles.title}>LISTAGEM DE USUARIO</Text>
            <View>
            { 
                loading ? <Text>loading...</Text> 
                : 
                Object.values(data).map(e => {
                    return (
                        <View key={e.id} style={styles.containerDoUsuario}>
                            <Text style={styles.itemLista}>Nome: {e.name}</Text>
                            <Text style={styles.itemLista}>Identificador: {e.id}</Text>
                            <Text style={styles.itemLista}>Usario ativo: {e.active === 1? 'SIM' : 'NÃO'}</Text>
                            <Text style={styles.itemLista}>Ponsto Adquiridos: {e.points}</Text>
                            <Text style={styles.itemLista}>E-mail: {e.email}</Text>
                            <Text style={styles.itemLista}>Tipo de usuario: {e.type === 1? 'Usuario Comum' : 'ADM'}</Text>
                        </View>
                    )
                })
            }
            </View>
        </ScrollView>
    );
}

/*
<ScrollView>
    { loading ? (<Text>loading...</Text>) : (
        
        data.map(e => (
            <View>
                <Text>{e.users}</Text>
                console.log(data)
            </View>
        ))
    )}
</ScrollView>
*/
/*
<View>
{ 
    loading ? <Text>loading...</Text> 
    : 
    Object.values(dataProducts).map((e, i) => {
        return (
            <View>
               
            </View>
        )
    })
}
</View>*/