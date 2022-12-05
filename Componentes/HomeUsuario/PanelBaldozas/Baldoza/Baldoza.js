import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import PALETA from '../../../../Utilidades/Paleta';

const Baldoza = (props) => {

    return (

        <View style={[estilos.baldoza, estilos.shadowed]}>
            <View style={[estilos.tituloContainer, estilos.shadowed]}>
                <Text style={estilos.baldozaTitulo}>{props.nombre}</Text>
            </View>

            <Image source={props.rutaImg} style={{ height: 150, width: 150 }} />


            <Text style={estilos.baldozaTexto}>{props.descripcion}</Text>

            <View style={estilos.contador}>
                <Text style={estilos.baldozaNumero}>{props.cantidad}</Text>
            </View>
        </View>
    );
};

const estilos = StyleSheet.create({

    baldoza: {
        width: 300,
        height: 300,
        backgroundColor: '#FFF',
        borderRadius: 20,
        borderColor: 'darkgrey',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 40,
        elevation: 5,
    },

    tituloContainer: {
        width: '80%',
        backgroundColor: PALETA[3],
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        marginBottom: 5
    },

    baldozaTitulo: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#FFF',
        fontWeight: 'bold'
    },

    contador: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PALETA[2],
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 5,
        paddingVertical: 5,
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 4
    },

    baldozaNumero: {
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 25,
        color: '#FFF',
    },

    baldozaTexto: {
        marginBottom: 10,
        fontSize: 20,
        textAlign: 'center',
        color: PALETA[1]
    },

    shadowed: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4
    },
})

export default Baldoza;