import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import PALETA from '../../../../Utilidades/Paleta';
import SERVICIOS from '../../../../Utilidades/Servicios';
import LineaHistoria from './LineaHistoria';
import Boton from '../../../../UI/Boton';

const HistoriaCheque = ({ banda, numero }) => {
    const [historiaCheque, setHistoriaCheque] = useState([{}])
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        obtengoHistoria()
    }, [])


    const obtengoHistoria = () => {

        fetch(SERVICIOS.HistoriaCheque + banda + ',2',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((response) => {


                setLoading(false)
                setHistoriaCheque([])

                response.Estados.forEach((linea) => {

                    setHistoriaCheque(historiaCheque => [
                        ...historiaCheque,
                        {
                            estadoLinea: linea.Estado,
                            fechaLinea: linea.Fecha,
                            horaLinea: linea.Hora,
                            detalleLinea: linea.Detalle,
                            usuarioLinea: linea.Usuario.trim(),
                        }
                    ])
                   
                })
            })
    }

 

    return (
        <View >
            <View style={estilos.headerHistoria}>
                <Text style={estilos.titulo}>
                    Historia de cheque
                </Text>
                <Text style={estilos.numeroCheque}>
                    #{numero}
                </Text>
            </View>

            <View style={estilos.listaHistoria}>
                <FlatList
                    onRefresh={() => obtengoHistoria()}
                    refreshing={loading}
                    keyExtractor={(item, index) => index.toString()}
                    data={historiaCheque}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (

                        <LineaHistoria
                            estado={item.estadoLinea}
                            fecha={item.fechaLinea}
                            hora={item.horaLinea}
                            detalle={item.detalleLinea}
                            usuario={item.usuarioLinea}
                        />
                    )}
                />
            </View>
        </View>
    )


}

const estilos = StyleSheet.create({

    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: PALETA[2]
    },

    numeroCheque: {
        fontSize: 25,
        fontWeight: 'bold',
        color: PALETA[3],
    },

    listaHistoria: {
        height: 600,
        width: '100%',
        borderLeftWidth: 2,
        borderColor: PALETA[2]
    },

    headerHistoria: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: PALETA[2],
        marginBottom: 10
    }
})

export default HistoriaCheque
