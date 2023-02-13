import React, { useState } from 'react';
import { useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import PALETA from '../../../../Utilidades/Paleta';


const EstadoCheque = ({ estadoCheque }) => {
    const [estadoTipo, setEstadoTipo] = useState({})

    useEffect(() => {

        switch (estadoCheque) {
            case 'ANULADO LIBRADOR':
                setEstadoTipo(estilos.textoChequeEstadoRech)
                break
            case 'CHEQUE RECHAZADO':
                setEstadoTipo(estilos.textoChequeEstadoRech)
                break
            case 'PENDIENTE DE ACEPTAR' || 'LIBRADO':
                setEstadoTipo(estilos.textoChequeEstadoPend)
                break
            case 'CHEQUE ACEPTADO':
                setEstadoTipo(estilos.textoChequeEstadoOk)
                break
            case 'NUEVO':
                setEstadoTipo(estilos.textoChequeEstadoNuevo)
                break
            case 'DEPOSITADO':
                setEstadoTipo(estilos.textoChequeEstadoDepo)
                break
        }
    }, [])

    return (
        <View style={[{ elevation: 2 }, estilos.shadowed]}>
            <Text style={estadoTipo}>

                {estadoCheque}

            </Text>
        </View>
    )
}

const estilos = StyleSheet.create({

    textoChequeEstadoOk: {
        backgroundColor: '#28a745',
        color: '#FFF',
        fontWeight: 'bold',
        paddingVertical: 2,
        width: '100%',
        marginVertical: 5,
        textAlign: 'center',
        elevation: 2
    },

    textoChequeEstadoRech: {
        backgroundColor: PALETA.error,
        color: '#FFF',
        fontWeight: 'bold',
        paddingVertical: 2,
        width: '100%',
        marginVertical: 5,
        textAlign: 'center',
        elevation: 2
    },

    textoChequeEstadoPend: {
        backgroundColor: '#ffc107',
        color: '#FFF',
        fontWeight: 'bold',
        paddingVertical: 2,
        width: '100%',
        marginVertical: 5,
        textAlign: 'center',
        elevation: 2
    },

    textoChequeEstadoNuevo: {
        backgroundColor: '#cff4fc',
        color: '#055160',
        fontWeight: 'bold',
        paddingVertical: 2,
        width: '100%',
        marginVertical: 5,
        textAlign: 'center',
        elevation: 2
    },

    textoChequeEstadoDepo: {
        backgroundColor: '#17a2b8',
        color: '#FFF',
        fontWeight: 'bold',
        paddingVertical: 2,
        width: '100%',
        marginVertical: 5,
        textAlign: 'center',
        elevation: 2
    },

    shadowed: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    }

})

export default EstadoCheque