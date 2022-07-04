import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {    
        width: '100%',
        height: '100%',
        backgroundColor: "#fff",
        paddingLeft: 20,
        paddingRight: 20,
    },

    menu: {
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'rgb(57, 73, 88)',
        paddingLeft: 20,
        paddingBottom: 5,
        paddingRight: 20,
    },

    buttonExit: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },

    pontuacaoAtual: {
        fontWeight: 'bold',
        fontSize: 16,
        width: '100%',
        textAlign: 'center',
        marginBottom: 17,
    },

    itensDisponiveis: {
        fontWeight: 'bold',
        fontSize: 16,
        width: '100%',
        textAlign: 'center'
    },

    chartTitle: {
        width: '100%',
        fontSize: 18,
        backgroundColor : 'rgba(120, 129, 255, 0.746)',
        textAlign: 'center',
        color: '#FFF',
        padding: 10
    },

    chartSvg: {
        height: 200, 
        flexDirection: 'row',
        backgroundColor : 'rgba(120, 129, 255, 0.746)',
        padding: 5,
        marginBottom: 10
    },

    chart: {
        padding: 10
    },

    containerProducts: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10
    },

    produtoLista: {
        width: '100%',
        marginTop: 18,
        borderBottomWidth: 1,
    },

    itemLista: {
        width: '100%',
        fontSize: 18,
    }
})

export default styles