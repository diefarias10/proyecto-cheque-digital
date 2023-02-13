import React, { useState, useContext, useRef, useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity, Alert, SafeAreaView, Image, FlatList } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet } from 'react-native';
import ChequeDetalle from './ChequeDetalle';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Contexto } from '../../../Storage/ContextoProvider';
import Boton from '../../../UI/Boton';
import Popup from '../../../UI/Popup';
import PopupExito from '../../../UI/PopupExito';
import PopupError from '../../../UI/PopupError';
import PALETA from '../../../Utilidades/Paleta';
import SERVICIOS from '../../../Utilidades/Servicios';
import HistoriaCheque from './HistoriaCheque/HistoriaCheque';


const ChequeDetalleModal = ({ cheque, visible, cerrarDetalle, tipo }) => {
    const { data, setData, refrescar, setRefrescar } = useContext(Contexto)
    const [popupCodigo, setPopupCodigo] = useState(false)
    const [popupDeposito, setPopupDeposito] = useState(false)
    const [popupHistoria, setPopupHistoria] = useState(false)
    const [cuentasUsuario, setCuentasUsuario] = useState([])
    const [cuentaDeposito, setCuentaDeposito] = useState('')
    const [mostrarPopupError, setMostrarPopupError] = useState(true)
    const [mostrarPopupExito, setMostrarPopupExito] = useState(false)
    const [txtError, setTxtError] = useState('')
    const [txtExito, setTxtExito] = useState('')

    useEffect(() => {
        obtengoCuentas(data.bancoID, data.cedula)
    }, [])

    const obtengoCuentas = (bancoId, cedula) => {
        // LLamo servicio de CHD para obtener cuentas de la persona
        fetch(SERVICIOS.CuentasPersona + bancoId + ',' + cedula + "'",
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {

                let listaCuentas = []

                responseJson.forEach((element) => {
                    listaCuentas.push({
                        ctaNumero: element.CuentaNumero,
                        ctaNombre: element.CuentaNombre
                    })
                })
                setCuentasUsuario(listaCuentas)
            })
    }

    const anularCheque = () => {
        // LLamo servicio de CHD para anular un cheque
        fetch(SERVICIOS.AnularCheque + data.bancoID + "," + cheque.cuentaCheque + "," + cheque.bandaCheque,

            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson == true) {
                    Alert.alert('Listo!', 'Cheque #' + cheque.nroCheque + ' anulado con exito!', [{ text: 'OK' }]);
                }
                else {
                    Alert.alert('Error!', 'No se pudo anular el cheque', [{ text: 'OK' }]);
                }
                cerrarDetalle()
            })
    }

    const aceptarCheque = (boolean) => {

        fetch(SERVICIOS.AceptoRechazo + cheque.bandaCheque + "," + data.cedula + "," + boolean,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            .then((response) => {

                /*if (responseJson == true) {
                    Alert.alert('Listo!', 'Cheque aceptado!', [{ text: 'Ok' }]);
                }
                else {
                    Alert.alert('Error!', 'No se pudo aceptar el cheque', [{ text: 'Ok' }]);
                }*/

                cerrarDetalle()
            })

        setRefrescar(!refrescar)
    }

    const depositoOnline = () => {
        console.log('Se va a depositar en la cuenta: ' + cuentaDeposito)

        fetch(SERVICIOS.DepositoOnline + cheque.bandaCheque + "," + data.bancoID + "," + cuentaDeposito + "," + data.usuario,

            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.Exito == true) {

                    Alert.alert('Depósito realizado!', 'Cheque #' + cheque.nroCheque + ' depositado en la cuenta ' + cuentaDeposito, [{ text: 'OK' }]);
                }
                else {
                    Alert.alert('Error!', 'No se pudo depositar el cheque', [{ text: 'OK' }]);
                }

                cerrarDetalle()
                setPopupDeposito(false)

            })
    }


    return (
        <Modal visible={visible} animationType='slide' transparent={false} >
            <View style={{ flex: 1, backgroundColor: PALETA[2] }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={estilos.detalleModal}>
                        <TouchableOpacity style={[estilos.btnCerrarModal, estilos.shadowed]} onPress={cerrarDetalle}>
                            <FontAwesome5 name="chevron-down" size={35} color="white" />
                        </TouchableOpacity>

                        <View style={{ marginHorizontal: 10 }}>
                            <ChequeDetalle infoCheque={cheque} />
                        </View>
                        <View style={estilos.modalAcciones}>
                            {
                                tipo == 'Recibidos' ?
                                    <View  /* ACCIONES SI EL CHEQUE ES RECIBIDO */>

                                        {
                                            cheque?.estadoCheque == 'PENDIENTE DE ACEPTAR' ?
                                                <View>
                                                    <Boton texto='Aceptar cheque' icono='check' tipo='primario' onPress={() => { aceptarCheque(true) }} />

                                                    <Boton texto='Rechazar cheque' icono='ban' tipo='error' onPress={() => { aceptarCheque(false) }} />
                                                </View>
                                                :
                                                <View />
                                        }

                                        {
                                            cheque?.estadoCheque !== 'DEPOSITADO' ?
                                                <View />
                                                :

                                                <View>
                                                    <Boton texto='Depositar online' icono='donate' tipo='primario' onPress={() => { setPopupDeposito(true) }} />

                                                    <Boton texto='Cobrar en caja' icono='qrcode' tipo='primario' onPress={() => { setPopupCodigo(true) }} />
                                                </View>
                                        }

                                    </View>
                                    :
                                    <View /* ACCIONES SI EL CHEQUE ES ENVIADO */>

                                        <Boton texto='Firmar cheque' icono='signature' tipo='primario' />

                                        {
                                            cheque?.estadoCheque == 'PENDIENTE DE ACEPTAR' ?
                                                <Boton texto='Anular envío' icono='ban' tipo='error' onPress={anularCheque} />
                                                :
                                                <View />
                                        }

                                    </View>
                            }

                            <Boton texto='Historia del cheque' icono='history' tipo='secundario' onPress={() => { setPopupHistoria(true) }} />

                        </View>
                    </View>
                </SafeAreaView>
            </View>

            <Popup visible={popupDeposito} /* POPUP PARA DEPOSITO ONLINE */ >
                <TouchableOpacity style={estilos.btnCerrarPopup} onPress={() => { setPopupDeposito(false) }}>
                    <Ionicons name="ios-close-circle-sharp" size={45} color={PALETA.error} />
                </TouchableOpacity>


                <Text style={{ fontSize: 25, fontWeight: 'bold', color: PALETA[1] }}>Depositar cheque</Text>
                <Text style={{ fontSize: 16, marginVertical: 10 }}>Seleccione una cuenta para depositar el cheque</Text>

                <View style={estilos.formInput}>
                    <SelectDropdown
                        data={cuentasUsuario.map((cuenta) => { return cuenta.ctaNumero })}
                        onSelect={(selectedItem, index) => {
                            setCuentaDeposito(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        rowStyle={{ marginHorizontal: 10 }}

                        dropdownStyle={{ borderRadius: 10 }}

                        defaultButtonText='Seleccionar'

                        buttonStyle={estilos.dropdownForm}

                        buttonTextStyle={{ color: 'darkgrey' }}

                        dropdownIconPosition='right'

                        renderDropdownIcon={() => { return <Ionicons name="chevron-down" size={30} color={PALETA[1]} /> }}
                    />
                </View>

                <Boton texto='Depositar' tipo='primario' onPress={depositoOnline} />

            </Popup>

            <Popup visible={popupCodigo} /* POPUP PARA CODIGO DE COBRO EN CAJA */ >
                <TouchableOpacity style={estilos.btnCerrarPopup} onPress={() => { setPopupCodigo(false) }}>
                    <Ionicons name="ios-close-circle-sharp" size={45} color={PALETA.error} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../../assets/QR.png')} style={{ width: 150, height: 150 }} />
                </View>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>Presente el codigo en la caja del banco para realizar el depósito</Text>
            </Popup>

            {
                cheque?.bandaCheque ?
                    <Popup visible={popupHistoria}>
                        <TouchableOpacity style={estilos.btnCerrarPopup} onPress={() => { setPopupHistoria(false) }}>
                            <Ionicons name="ios-close-circle-sharp" size={45} color={PALETA.error} />
                        </TouchableOpacity>
                        <HistoriaCheque banda={cheque.bandaCheque} numero={cheque.nroCheque} />
                    </Popup> : <View />
            }

            <Popup visible={mostrarPopupExito} /* POPUP PARA CODIGO DE COBRO EN CAJA */ >
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../../assets/QR.png')} style={{ width: 150, height: 150 }} />
                </View>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>Deposito hecho</Text>
            </Popup>

        </Modal>
    )
}

const estilos = StyleSheet.create({

    detalleModal: {
        backgroundColor: 'white',
        paddingHorizontal: 0,
        justifyContent: 'space-evenly',
        flex: 1,

    },

    btnCerrarModal: {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: PALETA[2],
        alignItems: 'center',
        paddingVertical: 5,
        position: 'absolute',
        width: '100%',
        top: 0,
        elevation: 4
    },

    modalAcciones: {
        padding: 20,
    },

    btnCerrarPopup: {
        position: 'absolute',
        right: -12,
        top: -12,
        elevation: 4,
    },

    shadowed: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },

    formInput: {
        backgroundColor: '#FFF',
        width: '100%',
        borderWidth: 1,
        borderColor: PALETA[1],
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        fontSize: 18,
        marginBottom: 10
    },

    dropdownForm: {
        borderRadius: 5,
        width: '100%',
        height: 45,
        backgroundColor: '#FFF',
    },
})

export default ChequeDetalleModal