import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert, Picker } from 'react-native';
import estilos from '../../Estilos/Estilos';

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

export default LoginNoBancarizado;