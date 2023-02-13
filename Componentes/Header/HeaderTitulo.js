import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import PALETA from '../../Utilidades/Paleta';
import { FontAwesome5, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';


const HeaderTitulo = ({ titulo, formCheque }) => {

    return (
        <View style={[estilos.header]}>
            <View style={estilos.tituloHeader}>
                <Text style={{ fontWeight: 'bold', fontSize: 25, color: PALETA[1], marginLeft: 10 }}>
                    {titulo}
                </Text>
            </View>

            {
                formCheque != null ?

                    <TouchableOpacity style={estilos.btnAgregar} onPress={() => { formCheque(true) }}>
                        <Ionicons name="add-circle-sharp" size={50} color={PALETA[3]} />
                    </TouchableOpacity>

                    :
                    <View />
            }
        </View>
    );
};

const estilos = StyleSheet.create({

    header: {
        backgroundColor: '#FFF',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 50,
        paddingBottom: 20,
        borderBottomWidth: 0.5,
        borderColor: 'darkgrey'
    },

    tituloHeader: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    btnAgregar: {
        position: 'absolute',
        right: 0,
        top: 40,
        marginRight: 10,

    },

    shadow: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 1, },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4
    }
})

export default HeaderTitulo;