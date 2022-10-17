import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import estilos from '../../../Estilos/Estilos';
import ChequeDetalle from './ChequeDetalle';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { CheckBox, withTheme } from 'react-native-elements';
import { Contexto } from '../../../Storage/ContextoProvider';

const ChequeDetalleModal = ({ cheque, visible, cerrarDetalle }) => {



    return (
        <Modal visible={visible} animationType='slide' transparent={true}>
            <View style={estilos.detalleModal}>
                <TouchableOpacity style={{ alignItems: 'center', marginTop: 5 }} onPress={cerrarDetalle}>
                    <FontAwesome5 name="chevron-down" size={35} color="#081D3C" />
                </TouchableOpacity>

                <ChequeDetalle infoCheque={cheque} />

                <View style={estilos.modalAcciones}>{/* BOTONES DEL DETALLE MODAL */}

                    <TouchableOpacity style={estilos.btnModalFirmar}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="signature" size={25} color="white" style={{ marginRight: 20 }} />
                            <Text style={{ color: 'white', fontSize: 20 }}>
                                Firmar cheque
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.btnModal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="history" size={25} color="white" style={{ marginRight: 20 }} />
                            <Text style={{ color: 'white', fontSize: 20 }}>
                                Historia del cheque
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.btnModalAnular}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="ban" size={25} color="white" style={{ marginRight: 20 }} />
                            <Text style={{ color: 'white', fontSize: 20 }}>
                                Anular cheque
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ChequeDetalleModal