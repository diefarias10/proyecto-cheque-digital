import React, { useState } from "react";
import { useEffect } from "react";
import { View, Image, TouchableOpacity, Modal, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import PALETA from "../Utilidades/Paleta";

const Popup = ({ visible, children }) => {
    const [verPopup, setVerPopup] = useState(visible)

    useEffect(() => {
        setVerPopup(visible)
    }, [visible])


    return (

        <Modal transparent visible={verPopup} animationType='fade'>
            <View style={estilos.transparencia}>
                <View style={estilos.popup}>

                    {children}

                </View>
            </View>
        </Modal>
    )
}

const estilos = StyleSheet.create({
    transparencia: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    popup: {
        backgroundColor: '#FFF',
        width: '90%',
        borderRadius: 20,
        padding: 20,
        elevation: 20,
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },

    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    txtTitulo: {
        color: PALETA[1],
        fontWeight: 'bold',
        fontSize: 22
    },

    txtMensaje: {
        width: '100%',
        color: 'darkgrey',
        fontSize: 20,
    },
})

export default Popup