import React, { useEffect, useState } from 'react'
import styles from "./styles";
import { Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { LineChart, Grid, YAxis } from 'react-native-svg-charts'

export function UsuarioTelaPrincipal({ navigation, route }) {

    const [loading, setLoading] = useState(true)
    const [dataProducts, setDataProducts] = useState([])
    const [atualizando, setAtualizando] = useState(false)

    const data = [12, 80, 100, 40, 50 ,60]
    const contentInset = { top: 20, bottom: 20 }

    const requetListProducts = () => {
        setLoading(true)

        fetch('https://bonus-control.herokuapp.com/actions/product/listProducts.php', {method: 'GET'})
            .then(e => e.json())
            .then(e => setDataProducts(e.products))

        setLoading(false)
    }

    const atualizar = () => {
        setAtualizando(true)
        setTimeout(() => {
            requetListProducts()
            setAtualizando(false)
        }, 2000)
    }

    useEffect(() => {
        requetListProducts()
    }, [])

    return (
        <ScrollView style={{backgroundColor: '#fff'}} refreshControl={<RefreshControl refreshing={atualizando} onRefresh={atualizar}/>}>
            <View style={styles.menu}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonExit}>Exit</Text>
                </TouchableOpacity>
                <Text style={styles.buttonExit}>{route.params.nome}</Text>
            </View>
            <View >
                <Text style={styles.chartTitle}>Histórico de Pontuação</Text>
                <View style={styles.chartSvg}>
                    <YAxis style={styles.chart} data={data} contentInset={contentInset} svg={{ fill: '#fff', fontSize: 16, paddingTop: 3 }} numberOfTicks={6} formatLabel={(value) => `${value}`} />
                    <LineChart style={{ flex: 1, marginLeft: 5, borderWidth: 2, borderColor: '#fff', padding: 3 }} data={data} svg={{ stroke: '#fff', strokeWidth: 6}} contentInset={contentInset} ></LineChart>
                </View>
                <Text style={styles.pontuacaoAtual}>PONTUAÇÃO ATUAL: {route.params.pontos}</Text>
                <Text style={styles.itensDisponiveis}>ITENS DISPONÍVEIS:</Text>
                <View style={styles.containerProducts}>
                    { 
                        loading ? <Text>loading...</Text> 
                        : 
                        Object.values(dataProducts).map(e => {
                            return (
                                <View key={e.id} style={styles.produtoLista}>
                                    <Text style={styles.itemLista}>Produto: {e.name}</Text>
                                    <Text style={styles.itemLista}>Código de Identificação: {e.id}</Text>
                                    <Text style={styles.itemLista}>Pontos Necéssarios: {e.points_required}</Text>
                                    <Text style={styles.itemLista}>Pontos Ganhos: {e.points_earnings}</Text>
                                    <Text style={styles.itemLista}>Valor: R${e.value}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </ScrollView>
    )
}
