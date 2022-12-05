import React from 'react';
import { Text, View } from 'react-native';
import LogoBanco from '../../Utilidades/LogoBanco';
import { StyleSheet } from 'react-native';
import PALETA from '../../Utilidades/Paleta';


const Header = (props) => {

    return (
        <View style={[estilos.header, estilos.shadowed]}>
            <View style={estilos.datosHeader} /* AREA 1*/>
                <Text style={estilos.txtHeader}>
                    {props.nombre}
                </Text>

                {
                    props.tipoUsuario === 'HB' ?
                        <Text style={estilos.txtHeader}>Banco {props.banco}</Text>
                        :
                        <Text style={estilos.txtHeader}>No Bancarizado</Text>
                }

            </View>
            <View style={estilos.logoHeader} /* AREA 2*/>
                <LogoBanco banco={props.bancoID} ancho={50} alto={50} />
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
        justifyContent: 'space-around',
        paddingTop: 50,
        paddingBottom: 20
    },

    datosHeader: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    txtHeader: {
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: '#FFF'
    },

    logoHeader: {
        display: 'flex',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    shadowed: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4
    }
})

export default Header;