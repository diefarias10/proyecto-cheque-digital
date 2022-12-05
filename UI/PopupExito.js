import React, { useState } from "react";
import { useEffect } from "react";
import { View, Image, TouchableOpacity, Modal, StyleSheet, Text } from 'react-native';
import PALETA from "../Utilidades/Paleta";

const PopupExito = ({ visible, texto }) => {
    const [switchPopup, setSwitchPopup] = useState(visible)

    useEffect(() => {
        togglePopup() 
    }, [visible])


    const togglePopup = () => {   
        setSwitchPopup(!switchPopup)  
    }

    return (

        <Modal transparent visible={switchPopup} animationType='fade'>
            <View style={estilos.transparencia}>
                <View style={estilos.popup}>
                    <View style={estilos.container}>
                        <View>
                            <Image source={require('../assets/check-mark.png')} style={{ width: 100, height: 100 }} />
                        </View>
                        <View >
                            <Text style={estilos.txtMensaje}>{texto}</Text>
                        </View>
                    </View>
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
        width: '80%',
        height: 230,
        borderRadius: 20,
        padding: 20,
        elevation: 20
    },

    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    txtMensaje: {
        width:'100%',
        color: 'darkgrey',
        fontSize: 20,
        marginTop: 15
    }
})

export default PopupExito