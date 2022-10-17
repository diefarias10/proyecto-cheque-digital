import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import estilos from '../../Estilos/Estilos';



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

export default HomeBanking;