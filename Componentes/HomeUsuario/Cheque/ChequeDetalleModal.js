import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import estilos from '../../../Estilos/Estilos';
import ChequeDetalle from './ChequeDetalle';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { CheckBox, withTheme } from 'react-native-elements';
import { Contexto } from '../../../Storage/ContextoProvider';

const ChequeDetalleModal = ({ cheque, visible, cerrarDetalle }) => {
    const { data, setData,refrescar, setRefrescar } = useContext(Contexto);


    const anularCheque = () => {

        fetch('http://192.168.1.9:8585/CHD_POC/com.echeq.ahttpanulocheque?' + data.bancoID + "," + cheque.cuentaCheque + "," + cheque.bandaCheque,

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
                    cerrarDetalle()
                }
                else {
                    Alert.alert('Error!', 'No se pudo anular el cheque', [{ text: 'Ok' }]);
                    cerrarDetalle()
                }
            })
            setRefrescar(!refrescar)
    }

    return (
        <Modal visible={visible} animationType='slide' transparent={true} >

            <View style={estilos.detalleModal}>
                <TouchableOpacity style={estilos.btnCerrarModal} onPress={cerrarDetalle}>
                    <FontAwesome5 name="chevron-down" size={35} color="white" />
                </TouchableOpacity>

                <View style={{ marginHorizontal: 10 }}>
                    <ChequeDetalle infoCheque={cheque} />
                </View>


                <View style={estilos.modalAcciones}>{/* BOTONES DEL DETALLE MODAL */}
                    <TouchableOpacity style={estilos.btnModalFirmar}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View >
                                <FontAwesome5 name="signature" size={25} color="white" style={{ marginLeft: 20 }} />
                            </View>
                            <Text style={{ color: 'white', fontSize: 20, width: '80%', textAlign: 'center' }}>
                                Firmar cheque
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.btnModal}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View >
                                <FontAwesome5 name="history" size={25} color="white" style={{ marginLeft: 20 }} />
                            </View>
                            <Text style={{ color: 'white', fontSize: 20, width: '80%', textAlign: 'center' }}>
                                Historia del cheque
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.btnModalAnular} onPress={anularCheque}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View >
                                <FontAwesome5 name="ban" size={25} color="white" style={{ marginLeft: 20 }} />
                            </View>
                            <Text style={{ color: 'white', fontSize: 20, width: '80%', textAlign: 'center' }}>
                                Anular envío
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ChequeDetalleModal