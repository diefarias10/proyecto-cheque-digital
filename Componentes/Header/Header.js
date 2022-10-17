import React from 'react';
import estilos from '../../Estilos/Estilos';
import { Text, View, TouchableOpacity, Image } from 'react-native';


const Header = (props) => {

    return (
        <View style={estilos.header}>
            <View style={estilos.datosHeader} /* AREA 1*/>
                <Text style={estilos.txtHeader}>
                    {props.nombre}
                </Text>
                {props.tipoUsuario === 'HB' ?
                    <Text style={estilos.txtHeader}>Banco {props.banco}</Text> 
                    : 
                    <Text style={estilos.txtHeader}>No Bancarizado</Text>}
            </View>
            <View style={estilos.logoHeader} /* AREA 2*/>
                <Text>Logo Here</Text>
            </View>
        </View>
    );
};

export default Header;