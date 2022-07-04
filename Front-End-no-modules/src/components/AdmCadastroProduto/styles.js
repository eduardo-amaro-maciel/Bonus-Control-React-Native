import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {    
        width: '100%',
        height: '100%',
        backgroundColor: "#fff",
        padding: 20,
    },
    
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        width: '100%',
        textAlign: 'center'
    },

    textLabel: {
        marginTop: 20
    },

    inputText: {
        borderWidth: 1,
        borderColor: '#012',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 10,
        height: 40,
        borderWidth: 1,
        width: '100%',
        padding: 10
    },

    containerButton: {
        marginTop: 20,
        display: 'flex',
        width: '100%',
        height: 50,
        backgroundColor: '#5DC435',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },

    textButton: {
        fontSize: 16,
        color: '#fff'
    },

    inputTextDescricao: {
        borderWidth: 1,
        borderColor: '#012',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 10,
        height: 90,
        borderWidth: 1,
        width: '100%',
        padding: 10
    },
})

export default styles