import React, { useContext } from 'react';
import { View } from 'react-native';
import Header from '../Header/Header';
import PanelBaldozas from './PanelBaldozas/PanelBaldozas';
import { Contexto } from '../../Storage/ContextoProvider';
import { StyleSheet, SafeAreaView } from 'react-native';
import PALETA from '../../Utilidades/Paleta';

const HomeUsuario = () => {

    const { data, setData } = useContext(Contexto);


    return (
     
            <View style={estilos.container}>
                <Header nombre={data.usuario} banco={data.banco} bancoID={data.bancoID} tipoUsuario={data.tipoUsuario} />
                <PanelBaldozas usuario={data.cedula} banco={data.bancoID} />
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

})

export default HomeUsuario;