import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import PALETA from '../../../../Utilidades/Paleta';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';


const LineaHistoria = ({ estado, fecha, hora, detalle, usuario }) => {


    return (
        <View style={estilos.linea}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <View style={estilos.labelFecha}>
                    <View style={{ paddingRight: 10 }}>
                        <Ionicons name="ios-calendar-sharp" size={25} color={PALETA[2]} />
                    </View>

                    <View >
                        <Text style={{ color: PALETA[2] }}>Fecha:</Text>
                        <Text style={{ fontWeight: 'bold', color: PALETA[2] }}>
                            {fecha}
                        </Text>
                    </View>
                </View>

                <View style={estilos.labelUsuario}>
                    <View >
                        <Text style={{ color: PALETA[2] }}>Acción realizada por:</Text>
                        <Text style={{ fontWeight: 'bold', color: PALETA[2] }}>
                            {usuario}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', width: '90%', textAlign: 'center', color: PALETA[2] }}>
                    {detalle}
                </Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
                <View style={estilos.labelHora}>
                    <View style={{ paddingRight: 10 }}>
                        <FontAwesome5 name="clock" size={23} color='#FFF' />
                    </View>
                    <View >
                        <Text style={{ color: '#FFF' }}>Hora:</Text>
                        <Text style={{ fontWeight: 'bold', color: '#FFF' }}>
                            {hora}
                        </Text>
                    </View>
                </View>
            </View>



            <View style={estilos.indicadorEstado}>

                <FontAwesome5
                    name={
                        estado == 4 ? 'check' :
                            estado == 9 || estado == 98 ? 'ban' :
                                estado == 0 ? 'signature' :
                                    estado == 2 ? 'ellipsis-h' :
                                        estado == 5 ? 'donate' : 'clock'}
                    size={23}
                    color='#FFF'
                />
            </View>


        </View>
    )
}

const estilos = StyleSheet.create({

    linea: {
        marginVertical: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: '#FFF',
        borderColor: PALETA[2],
    },

    labelFecha: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: PALETA[4],
        borderBottomRightRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10
    },

    labelUsuario: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 5,
        paddingHorizontal: 10
    },

    labelHora: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: PALETA[2],
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 3,
        paddingVertical: 5,
        paddingHorizontal: 10,
        right: -1
    },

    indicadorEstado: {
        width: 50,
        height: 50,
        backgroundColor: PALETA[3],
        position: 'absolute',
        left: 5, bottom: -25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: PALETA[2]
    },

    txtLinea: {
        color: PALETA[1]
    },

    shadowedBtn: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4
    }
})

export default LineaHistoria