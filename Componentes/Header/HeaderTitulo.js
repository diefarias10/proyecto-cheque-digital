import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import PALETA from '../../Utilidades/Paleta';

const HeaderTitulo = (props) => {

    return (
        <View style={[estilos.header, estilos.shadow]}>
            <View  style={estilos.tituloHeader}>
                <Text style={{fontWeight:'bold', fontSize: 20, color: '#FFF'}}>{props.titulo}</Text>
            </View>
        </View>
    );
};

const estilos = StyleSheet.create({

    header: {
        backgroundColor: PALETA[2],
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 50,
        paddingBottom: 20,
        justifyContent: 'space-around',
        elevation: 4
    },

    tituloHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    shadow: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
})

export default HeaderTitulo;