import React from 'react';
import estilos from '../../Estilos/Estilos';
import { Text, View, TouchableOpacity, Image } from 'react-native';


const Header = (props) => {

    return (
        <View style={estilos.header}>
            <View  style={estilos.tituloHeader}>
                <Text style={{fontWeight:'bold', fontSize: 18}}>{props.titulo}</Text>
            </View>
        </View>
    );
};

export default Header;