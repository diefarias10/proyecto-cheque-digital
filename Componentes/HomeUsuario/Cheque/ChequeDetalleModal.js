import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity, ScrollView, Alert, SafeAreaView, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import ChequeDetalle from './ChequeDetalle';
import { FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';
import { Contexto } from '../../../Storage/ContextoProvider';
import Boton from '../../../UI/Boton';
import Popup from '../../../UI/Popup';
import GestureFlipView from 'react-native-gesture-flip-card';
import PALETA from '../../../Utilidades/Paleta';
import SERVICIOS from '../../../Utilidades/Servicios';


const ChequeDetalleModal = ({ cheque, visible, cerrarDetalle, tipo }) => {
    const { data, setData, refrescar, setRefrescar } = useContext(Contexto)
    const [popupCodigo, setPopupCodigo] = useState(false)


    const anularCheque = () => {

        fetch(SERVICIOS.AnularCheque + data.bancoID + "," + cheque.cuentaCheque + "," + cheque.bandaCheque,

            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson == true) {
                    Alert.alert('Listo!', 'Cheque anulado con exito!', [{ text: 'Ok' }]);
                }
                else {
                    Alert.alert('Error!', 'No se pudo anular el cheque', [{ text: 'Ok' }]);
                }
                cerrarDetalle()
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

                        {
                            tipo == 'Recibidos' ?
                                <View style={estilos.modalAcciones} /* ACCIONES SI EL CHEQUE ES ENVIADO */>

                                    {
                                        cheque?.estadoCheque == 'PENDIENTE DE ACEPTAR' ?
                                            <View>
                                                <Boton texto='Aceptar cheque' icono='check' tipo='primario' />

                                                <Boton texto='Rechazar cheque' icono='ban' tipo='error' />
                                            </View>
                                            :
                                            <View>
                                                <Boton texto='Depositar online' icono='donate' tipo='primario' />

                                                <Boton texto='Cobrar en caja' icono='qrcode' tipo='primario' onPress={() => { setPopupCodigo(true) }} />
                                            </View>
                                    }



                                </View>
                                :
                                <View style={estilos.modalAcciones} /* ACCIONES SI EL CHEQUE ES ENVIADO */>

                                    <Boton texto='Firmar cheque' icono='signature' tipo='primario' />

                                    <Boton texto='Historia del cheque' icono='history' tipo='secundario' />


                                    {
                                        cheque?.estadoCheque == 'PENDIENTE DE ACEPTAR' ?
                                            <Boton texto='Anular envío' icono='ban' tipo='error' onPress={anularCheque} />
                                            :
                                            <View />
                                    }

                                </View>
                        }
                    </View>
                </SafeAreaView>
            </View>

            <Popup visible={popupCodigo} /* POPUP PARA CODIGO DE DEPOSITO MANUAL */ >
                <TouchableOpacity style={estilos.btnCerrarPopup} onPress={() => { setPopupCodigo(false) }}>
                    <Ionicons name="ios-close-circle-sharp" size={45} color={PALETA.error} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../../assets/QR.png')} style={{ width: 150, height: 150 }} />
                </View>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>Presente el codigo en la caja del banco para realizar el depósito</Text>
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
        shadowColor: PALETA[1],
        shadowOffset: { width: -3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },

    shadowed: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    }
})

export default ChequeDetalleModal