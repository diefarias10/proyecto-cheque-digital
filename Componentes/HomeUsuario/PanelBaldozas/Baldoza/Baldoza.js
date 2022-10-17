import React from 'react';
import estilos from '../../../../Estilos/Estilos';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

const Baldoza = (props) => {

    return (

        <View style={estilos.baldoza}>
            <View style={{ marginTop: 20, width: 150, height: 150, alignItems: 'center' }}>
                <Image source={props.rutaImg} style={{ height: 140, width: 190 }} />
            </View>
            <Text style={estilos.txtSubtitulo}>{props.nombre}</Text>
            <Text style={estilos.baldozaNumero}>{props.cantidad}</Text>
            <Text style={estilos.baldozaTexto}>{props.descripcion}</Text>
        </View>
        
    );
};

export default Baldoza;