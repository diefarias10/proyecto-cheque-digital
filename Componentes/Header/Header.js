import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import LogoBanco from '../../Utilidades/LogoBanco';
import { StyleSheet } from 'react-native';
import PALETA from '../../Utilidades/Paleta';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';



const Header = (props) => {

    
    return (
        <View style={[estilos.header]}>
            <View style={estilos.logoHeader} /* AREA 2*/>
                <LogoBanco banco={props.bancoID} ancho={45} alto={45} />
            </View>
            <View style={estilos.datosHeader} /* AREA 1*/>
                <Text style={estilos.txtHeader}>
                    {props.nombre}
                </Text>

                {
                    props.tipoUsuario === 'HB' ?
                        <Text style={[estilos.txtHeader, { fontSize: 15, fontWeight: 'normal', color: 'darkgrey' }]}>Banco {props.banco}</Text>
                        :
                        <Text style={[estilos.txtHeader, { fontSize: 15, fontWeight: 'normal', color: 'darkgrey' }]}>No Bancarizado</Text>
                }

            </View>
            <TouchableOpacity style={{ justifyContent: 'center', right: 10 }} onPress={()=>{props.logOut()}}>
                <FontAwesome name="sign-out" size={35} color={PALETA[1]} />
            </TouchableOpacity>
        </View>
    );
};

const estilos = StyleSheet.create({

    header: {
        backgroundColor: '#FFF',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 50,
        paddingBottom: 20,
        borderBottomWidth: 0.5,
        borderColor: 'darkgrey'
    },

    datosHeader: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    txtHeader: {
        fontSize: 23,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: PALETA[1]
    },

    logoHeader: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 10
    },
    shadowed: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 1, },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4
    }
})

export default Header;