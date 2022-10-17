import React, { useContext, SafeAreaView } from 'react';
import estilos from '../../Estilos/Estilos';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Header from '../Header/Header';
import PanelBaldozas from './PanelBaldozas/PanelBaldozas';
import { Contexto } from '../../Storage/ContextoProvider';

const HomeUsuario = () => {

    const { data, setData } = useContext(Contexto);
    
    return (
        <View style={estilos.container}>
            <Header nombre={data.usuario} banco={data.banco} tipoUsuario={data.tipoUsuario} />
            <PanelBaldozas usuario={data.cedula} banco={data.bancoID} />
            <View style={{ paddingVertical: 25, marginTop:15 }}>
              
            </View>
        </View>
    );
};

export default HomeUsuario;