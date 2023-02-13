import React, { useState } from "react";
import { useEffect } from "react";
import { View, Image, TouchableOpacity, Modal, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import PALETA from "../Utilidades/Paleta";

const TagCheque = ({ tipo, icono }) => {
    return (

        <View style={[estilos.tagContainer,
        {
            backgroundColor:
                tipo == 'error' ? PALETA.error :
                    tipo == 'pendiente' ? '#ffc107' :
                        tipo == 'correcto' ? '#28a745' :
                            tipo == 'depositado' ? '#17a2b8' :
                                PALETA[2],


        }]}>
            <FontAwesome5 name={icono} size={20} color='#FFF' />
        </View >

    )
}

const estilos = StyleSheet.create({

    tagContainer: {
        width: 50,
        marginRight: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: PALETA[1],
        shadowOffset: { width: 2, height: -2 },
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 4
    }
})

export default TagCheque