import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import PALETA from '../../Utilidades/Paleta';


const HomeBanking = ({ navigation }) => {

    return (

        <View style={estilos.container}>
            <View style={estilos.carta}>
                <Text style={estilos.txtTitulo}>
                    HOME BANKING
                </Text>
                <TouchableOpacity style={estilos.btnMenuDisabled}>
                    <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Montserrat' }}>
                        Atencion al cliente
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.btnMenuDisabled}>
                    <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Montserrat' }}>
                        Su cuenta
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.btnMenuDisabled}>
                    <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Montserrat' }}>
                        Prestamos
                    </Text>
                </TouchableOpacity >
                <TouchableOpacity style={estilos.btnMenuSelec} onPress={()=> navigation.navigate("Home Usuario")}>
                    <Text style={{ color: '#081D3C', fontSize: 18, fontWeight:'bold',fontFamily: 'Montserrat' }}>
                        Cheque digital
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const estilos = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: PALETA[1],
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },

    carta: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: 'darkgrey',
        width: '90%',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10
    },

    txtTitulo: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#081D3C',
        alignSelf: 'center'
    },

    btnMenuDisabled: {
        backgroundColor: '#6c757d',
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        marginVertical: 15,
        paddingVertical: 14,
    },

    btnMenuSelec: {
        backgroundColor: PALETA[3],
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        elevation: 4
    },

})

export default HomeBanking;