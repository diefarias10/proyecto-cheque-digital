import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import GestureFlipView from 'react-native-gesture-flip-card';
import PALETA from '../../Utilidades/Paleta';

const MenuPrincipal = ({ navigation }) => {


    const renderFrontOK = () => {
        return (
            <View style={{ width: 300, height: 190,backgroundColor: 'red'}}>

                <Text>CARA A</Text>

            </View>
        )
    }

    const renderBackOK = () => {
        return (
            <View style={{ width: 300, height: 190,backgroundColor: 'yellow'}}>

                <Text>CARA B</Text>

            </View>
        )
    }


    return (
        <View style={estilos.container}>
            <View style={{ flex: 1, width: '100%', backgroundColor: '#FFF' }}>
                <View style={{ flex: 1, backgroundColor: PALETA[2], borderBottomLeftRadius: 150 }} />
            </View>



            <GestureFlipView width={300} height={190}>
                {renderFrontOK()}
                {renderBackOK()}
            </GestureFlipView>
               
        


            <View style={{ width: '100%', backgroundColor: PALETA[2] }}>
                <View style={[estilos.menuPrincipal]}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                        <Image source={require('../../assets/CHDLoginLogo.png')} style={{ width: 200, height: 80 }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity style={[estilos.btnMenu, estilos.shadowedBtn]} onPress={() => navigation.navigate('Login Bancarizado')}>
                            <View style={{ marginBottom: 10 }}>
                                <FontAwesome name="bank" size={45} color="#FFF" />
                            </View>
                            <Text style={{ color: 'white', fontSize: 18 }}>
                                Usuario de banco
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estilos.btnMenu, estilos.shadowedBtn]} onPress={() => navigation.navigate('Login No Bancarizado')}>
                            <View style={{ marginBottom: 10 }}>
                                <FontAwesome name="user-secret" size={50} color="#FFF" />
                            </View>
                            <Text style={{ color: 'white', fontSize: 18 }}>
                                Usuario externo
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, width: '100%', backgroundColor: '#FFF' }}>
                <View style={{ flex: 1, backgroundColor: PALETA[2], borderTopRightRadius: 150 }} />
            </View>
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

    menuPrincipal: {
        width: '100%',
        borderTopRightRadius: 80,
        borderTopLefttRadius: 150,
        borderBottomLeftRadius: 80,
        backgroundColor: '#FFF',
        paddingVertical: 20,
        paddingHorizontal: 10,

    },

    btnMenu: {
        backgroundColor: PALETA[2],
        width: 160,
        height: 160,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10,
        marginVertical: 15,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },

    shadowedBtn: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    }

})

export default MenuPrincipal;