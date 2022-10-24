import React, { useState } from 'react';
import { useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import estilos from '../../../../Estilos/Estilos';

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
            case 'PENDIENTE DE ACEPTAR':
                setEstadoTipo(estilos.textoChequeEstadoPend)
                break
            case 'CHEQUE ACEPTADO':
                setEstadoTipo(estilos.textoChequeEstadoOk)
                break
            case 'NUEVO':
                setEstadoTipo(estilos.textoChequeEstadoNuevo)
                break
            default:
                Alert.alert("NUMBER NOT FOUND");
        }
    }, [])

    return (
        <View>
            <Text style={estadoTipo}>{estadoCheque}</Text>
        </View>
    )
}

export default EstadoCheque