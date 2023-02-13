import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import Header from '../Header/Header';
import PanelBaldozas from './PanelBaldozas/PanelBaldozas';
import { Contexto } from '../../Storage/ContextoProvider';
import { StyleSheet, SafeAreaView } from 'react-native';
import PALETA from '../../Utilidades/Paleta';
import * as LocalAuthentication from 'expo-local-authentication';


const HomeUsuario = ({ navigation }) => {

    const { data, setData, soportaBiometria, setSoportaBiometria } = useContext(Contexto);

    useEffect(() => {
        (async () => { // Verifica si el dispositivo es compatible con biometrias
            const compatible = await LocalAuthentication.hasHardwareAsync()
            setSoportaBiometria(compatible)
        })();
    }, [])


    const logOut = () => {
        navigation.navigate('Menu Principal')
        setData({ usuario: '', tipoUsuario: '', banco: '' })
    }


    return (

        <View style={estilos.container}>
            <Header nombre={data.usuario} banco={data.banco} bancoID={data.bancoID} tipoUsuario={data.tipoUsuario} logOut={logOut} />
            <PanelBaldozas usuario={data.cedula} banco={data.bancoID} />
        </View>

    );
};

const estilos = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },

})

export default HomeUsuario;