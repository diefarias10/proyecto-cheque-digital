import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import estilos from '../../Estilos/Estilos';

const MenuPrincipal = ({ navigation }) => {
    return (
        <View style={estilos.container}>
            <View style={estilos.carta}>
                <Text style={estilos.txtTitulo}>
                    Cheque Digital
                </Text>
                <TouchableOpacity style={estilos.btnMenu} onPress={() => navigation.navigate('Login Bancarizado')}>
                    <Text style={{ color: 'white', fontSize: 18 }}>
                        Usuario de banco
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.btnMenu} onPress={() => navigation.navigate('Login No Bancarizado')}>
                    <Text style={{ color: 'white', fontSize: 18 }}>
                       Usuario externo
                    </Text>
                </TouchableOpacity>
                {/*<TouchableOpacity style={estilos.btnMenu} onPress={() => navigation.navigate('Login Banco')}>
                    <Text style={{ color: 'white', fontSize: 18 }}>
                        Banco
                    </Text>
    </TouchableOpacity >*/}
                {/* <TouchableOpacity style={estilos.btnMenu} onPress={() => navigation.navigate('Simulador de Banco')}>
                    <Text style={{ color: 'white', fontSize: 18 }}>
                        Simulador de Banco
                    </Text>
                </TouchableOpacity>*/}
                {/*<TouchableOpacity style={estilos.btnMenu} onPress={() => navigation.navigate('Panel de Control')}>
                    <Text style={{ color: 'white', fontSize: 18 }}>
                        Panel de Control
                    </Text>
                </TouchableOpacity>*/}
                <View style={{ width: '100%', marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
                    <Image source={require('../../assets/logoPreco.png')} style={{ width: '60%', height: 30 }} />
                </View>
            </View>
        </View>
    );
};

export default MenuPrincipal;