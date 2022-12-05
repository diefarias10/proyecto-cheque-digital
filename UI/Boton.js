import React, { useState } from "react";
import { useEffect } from "react";
import { View, Image, TouchableOpacity, Modal, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import PALETA from "../Utilidades/Paleta";


const Boton = ({ texto, tipo, icono, onPress }) => {


    return (
        <View style={estilos.boton} >
            <TouchableOpacity
                style={[tipo == 'secundario' ? estilos.btnSecundario : tipo == 'error' ? estilos.btnRed : estilos.btnPrimario,
                estilos.shadowedBtn]}
                onPress={onPress} >
                <View style={estilos.btnIcono}>
                    <FontAwesome5 name={icono} size={30} color="#FFF" />
                </View>
                <Text style={estilos.btnTexto}>
                    {texto}
                </Text>
            </TouchableOpacity >
        </View>
    )
}

const estilos = StyleSheet.create({
    boton: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10
    },

    btnPrimario: {
        width: '100%',
        backgroundColor: PALETA[3],
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5
    },

    btnSecundario: {
        width: '100%',
        backgroundColor: PALETA[2],
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5
    },

    btnRed: {
        width: '100%',
        backgroundColor: PALETA.error,
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5
    },

    btnIcono: {
        position: 'absolute',
        top: 5,
        left: 20,
        bottom: 5,
        justifyContent: 'center'
    },

    btnTexto: {
        color: 'white',
        fontSize: 23
    },

    shadowedBtn: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4
    }

})

export default Boton