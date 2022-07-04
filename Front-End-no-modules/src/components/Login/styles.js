import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "rgb(124, 109, 223)",
        padding: 20,
    },

    title: {
        color: '#000',
        fontSize: 38,
        marginBottom: 30,
        width: '100%',
        textAlign: 'center',
    },

    textLabel: {
        fontSize: 18,
        paddingLeft: 5,
        marginTop: 10,
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#012',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 10,
        height: 40,
        borderWidth: 1,
        padding: 10
    },

    containerButton: {
        width: '100%',
        marginTop: 40,
        borderRadius: 5,
        backgroundColor: 'rgb(57, 73, 88)',
        height: 40,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffff',
    },

    sendButton: {
        color: '#fff',
    },

    errInput: {
        padding: 10,
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        color: 'red'
    }
})

export default styles