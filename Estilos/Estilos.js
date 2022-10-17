import { StyleSheet } from 'react-native';

const txtChequeGral = {
    fontWeight: 'bold',
    color: '#1E2124'
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#081D3C',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },

    carta: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: 'darkgrey',
        width: '90%',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10
    },

    cheque: {
        backgroundColor: '#d7f0ff',
        borderColor: '#5BB9F1',
        marginTop: 20,
        borderRadius: 5,
        padding: 8,
        elevation: 4,
        width: '100%'
    },

    chequeDiferido: {
        backgroundColor: '#FFE993',
        borderColor: '#FFBD59',
        marginTop: 20,
        borderRadius: 5,
        padding: 8,
        elevation: 4
    },

    textoCheque: {
        ...txtChequeGral,
        fontSize: 16,
        marginVertical: 4
    },

    textoChequeImporte: {
        ...txtChequeGral,
        fontSize: 24,
    },

    textoChequeMoneda: {
        ...txtChequeGral,
        fontSize: 24,
        marginRight: 8
    },

    textoChequeNum: {
        ...txtChequeGral,
        fontSize: 20,
    },

    textoChequeBanda: {
        ...txtChequeGral,
        fontSize: 16,
        fontWeight: 'normal',
        letterSpacing: 1
    },

    textoChequeEstadoOk: {
        backgroundColor: '#28a745',
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 12,
        width: '100%',
        borderWidth: 1,
        borderColor: '#28a745',
        marginVertical: 5,
        textAlign: 'center',
        elevation: 2
    },
    textoChequeEstadoRech: {
        backgroundColor: '#dc3545',
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 12,
        width: '100%',
        borderWidth: 1,
        borderColor: '#dc3545',
        marginVertical: 5,
        textAlign: 'center',
        elevation: 2
    },


    listaCheques: {
        width: '95%',

        flex: 1,
    },

    listaVacia: {
        flex: 1,
        justifyContent: 'center'
    },

    baldoza: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        borderColor: 'darkgrey',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        elevation: 5,
    },

    baldozaNumero: {
        fontWeight: 'bold',
        fontSize: 70,
        color: '#081D3C'
    },

    baldozaTexto: {
        marginVertical: 10,
        fontSize: 20,
        textAlign: 'center',
        color: '#081D3C'
    },

    header: {
        backgroundColor: '#FFF',
        width: '100%',
        flexDirection: 'row',
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        height: 50,
        justifyContent: 'space-around',
        paddingVertical: 35,

    },
    datosHeader: {
        flex: 3,
        justifyContent: 'center',
        marginTop: 10
    },

    tituloHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3,
    },

    logoHeader: {
        flex: 2,
    },

    txtTitulo: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#081D3C',
        alignSelf: 'center'
    },

    txtTituloForm: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
        alignSelf: 'center',
        marginBottom: 10
    },

    txtSubtitulo: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold'
    },

    txtNormal: {

    },

    txtHeader: {
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: '#081D3C'
    },

    btnMenu: {
        backgroundColor: '#081D3C',
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 15,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnMenuSelec: {
        backgroundColor: '#7699D0',
        width: '90%',
        fontWeight: 'bold',
        borderWidth: 0,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        paddingVertical: 14,
    },

    btnMenuDisabled: {
        backgroundColor: '#6c757d',
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        marginVertical: 15,
        paddingVertical: 14,
    },

    btnNormal: {
        backgroundColor: '#081D3C',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        paddingVertical: 8,
        alignItems: 'center',

    },

    loginLabel: {
        marginBottom: 3,
        color: '#081D3C',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#081D3C'
    },

    loginInput: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'darkgrey',
        borderRadius: 5,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 18
    },

    shadow: {
        shadowColor: '#91b3f1',
        shadowOffset: { width: 0, height: 10, },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },

    formContainer: {
        alignItems: 'center',
        flex: 1
    },

    detalleModal: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        flex: 1,
        elevation: 4
    },

    modalAcciones: {
        padding: 20,
    },

    btnModal: {
        backgroundColor: '#081D3C',
        padding: 8,
        marginVertical: 5,
        alignItems: 'center',
        elevation: 4,
        borderRadius: 5
    },

    btnModalFirmar: {
        backgroundColor: '#1EA966',
        padding: 8,
        marginVertical: 5,
        alignItems: 'center',
        elevation: 4,
        borderRadius: 5
    },

    btnModalAnular: {
        backgroundColor: '#ED4337',
        padding: 8,
        marginVertical: 5,
        alignItems: 'center',
        elevation: 4,
        borderRadius: 5
    },

    formInput: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#081D3C',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18
    },

    formLabel: {
        marginBottom: 3,
        color: '#081D3C',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#081D3C'
    },

    btnForm1: {
        backgroundColor: '#91b3f1',
        borderRadius: 50,
        paddingVertical: 20,
        paddingHorizontal: 20,
        fontSize: 20
    },

    btnForm2: {
        backgroundColor: '#ED4337',
        borderRadius: 50,
        paddingVertical: 20,
        paddingHorizontal: 20,
        fontSize: 20
    },
    panelBotonesForm: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10
    },

    checkBoxForm: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },

    dropdownForm: {
        borderRadius: 5,
        width: 100,
        height: 40,
        backgroundColor: '#91b3f1'
    }
});


export default estilos;
