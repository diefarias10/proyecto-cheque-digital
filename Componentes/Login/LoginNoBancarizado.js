import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import PALETA from '../../Utilidades/Paleta';

const LoginNoBancarizado = ({ navigation }) => {

    const [cedula, setCedula] = useState('');
    const [contraseña, setContraseña] = useState('');


    const controlLoginHandler = (cedulaUsuario, contraseñaUsuario) => {

        fetch('http://192.168.1.9:8585/CHD_POC/com.echeq.aws_checklogin?' + cedula + ',' + contraseña + ',CD,0',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.nombre != 'ERROR') {
                    navigation.navigate('Home Usuario', { usuario: responseJson.nombre, tipo: 'CD' })
                }
                else {
                    console.log('Verifique Cedula / Contraseña')
                    Alert.alert('⚠', 'Verifique Cedula / Contraseña', [{ text: 'Cerrar' }]);
                }
            })
    };

    return (
        <View style={estilos.container}>
            <View style={estilos.carta}>
                <View>
                    <Text style={estilos.txtTitulo}>
                        Acceso a CHD
                    </Text>
                    <Text style={estilos.txtSubtitulo}>
                        Usuario No Bancarizado
                    </Text>
                </View>
                <View style={{ marginVertical: 10, width: '90%' }} >
                    <Text style={estilos.loginLabel} >
                        Cédula / RUC:
                    </Text>
                    <TextInput style={estilos.loginInput} keyboardType='numeric' onChangeText={(cedulaUsuario) => setCedula(cedulaUsuario)} />
                </View>
                <View style={{ marginVertical: 10, width: '90%' }} >
                    <Text style={estilos.loginLabel} >
                        Contraseña:
                    </Text>
                    <TextInput style={estilos.loginInput} onChangeText={(contraseñaUsuario) => setContraseña(contraseñaUsuario)} />
                </View>
                <View style={{ width: '90%', alignItems: 'center', marginTop: 20 }} >
                    <TouchableOpacity style={estilos.btnNormal} onPress={controlLoginHandler}>
                        <Text style={{ color: 'white', fontSize: 20 }}>
                            Entrar
                        </Text>
                    </TouchableOpacity >
                </View>
            </View>
        </View>
    );
};

const estilos = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1B262C',
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

    txtSubtitulo: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#081D3C',
        fontWeight: 'bold'
    },

    loginLabel: {
        marginBottom: 3,
        color: '#081D3C',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF'
    },

    loginInput: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: 'white',
        color: '#1B262C',
        borderRadius: 5,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 18
    },

    btnNormal: {
        backgroundColor: PALETA[3],
        borderRadius: 5,
        width: '100%',
        paddingVertical:15,
        alignItems: 'center',
    },

})

export default LoginNoBancarizado;