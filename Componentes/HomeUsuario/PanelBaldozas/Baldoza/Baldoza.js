import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import PALETA from '../../../../Utilidades/Paleta';

const Baldoza = (props) => {

    return (

        <View style={[estilos.baldoza, estilos.shadowed]}>

            <Image source={props.rutaImg} style={{ height: 150, width: 150 }} />

            <View>
                <View style={[estilos.tituloContainer]}>
                    <Text style={estilos.baldozaTitulo}>{props.nombre}</Text>
                </View>

                <Text style={estilos.baldozaTexto}>{props.descripcion}</Text>
            </View>

            <View style={estilos.contador}>

                <Text style={estilos.baldozaNumero}>{props.cantidad}</Text>
                <Text style={{ fontSize: 15 }}>Cheques</Text>

            </View>
        </View>
    );
};

const estilos = StyleSheet.create({

    baldoza: {
        backgroundColor: PALETA[4],
        borderRadius: 10,
        borderWidth: 1,
        borderColor: PALETA[3],
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingBottom: 20,
        marginVertical: 20,
    },

    tituloContainer: {
        width: '100%',
        marginBottom: 5
    },

    baldozaTitulo: {
        fontSize: 23,
        color: PALETA[1],
        fontWeight: 'bold'
    },

    contador: {
        position: 'absolute',
        top: 50,
        right: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },

    baldozaNumero: {
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 50,
        color: PALETA[1],
    },

    baldozaTexto: {
        marginBottom: 10,
        fontSize: 18,
        color: PALETA[1]
    },

    shadowed: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4
    },
})

export default Baldoza;