import React from 'react';
import { Text, View, Image, TouchableOpacity, Touchable, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeUsuario from '../HomeUsuario/HomeUsuario';
import Cartera from '../HomeUsuario/Cartera/Cartera';
import LibrarCheque from '../HomeUsuario/LibrarCheque/LibrarCheque';
import { StyleSheet } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import PALETA from '../../Utilidades/Paleta';


const Tab = createBottomTabNavigator();


const BotonLibrar = ({ children, onPress }) => (

    <TouchableOpacity
        style={{

            justifyContent: 'center',
            alignItems: 'center',
            top: Platform.OS === 'android' ? -15 : 0,
            ...estilos.shadowBtn
        }}
        onPress={onPress}
    >
        <View style={{
            width: 90,
            height: 90,
            borderRadius: 50,
            backgroundColor: PALETA[2],
            elevation: 4
        }}
        >
            {children}
        </View>
    </TouchableOpacity>
);



const Tabs = ({ route }) => {

    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: [{ ...estilos.barraNav }, estilos.shadowPanel]
            }} >
            <Tab.Screen name="Home" component={HomeUsuario} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={estilos.btnTab}>
                        <Image
                            source={require('../../assets/home.png')}
                            style={{ width: 30, height: 30, tintColor: focused ? PALETA[3] : PALETA[1] }} />
                        <Text style={[estilos.btnTabLabel, { color: focused ? PALETA[3] : PALETA[1] }]}>
                            INICIO
                        </Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Librar" component={LibrarCheque}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/cheque.png')}
                            style={{ width: 60, height: 60, tintColor: focused ? '#FFF' : PALETA[4] }} />
                    ),
                    tabBarButton: (props) => (
                        <BotonLibrar {...props} />
                    )
                }}
            />
            <Tab.Screen name="Cartera" component={Cartera} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={estilos.btnTab}>
                        <Image
                            source={require('../../assets/wallet.png')}
                            style={{ width: 32, height: 32, tintColor: focused ? PALETA[3] : PALETA[1] }} />
                        <Text style={[estilos.btnTabLabel, { color: focused ? PALETA[3] : PALETA[1] }]}>
                            CARTERA
                        </Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
    );
};

const estilos = StyleSheet.create({

    barraNav: {
        position: 'absolute',
        bottom: 25,
        left: 10,
        right: 10,
        height: '10%',
        backgroundColor: PALETA[4],
        borderRadius: 15,
    },

    btnTab: {
        justifyContent: 'center',
        alignItems: 'center',
        top: Platform.OS === 'ios' ? 15 : 0,
    },

    btnTabLabel: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
        top: 3
    },

    shadowBtn: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },

    shadowPanel: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    }
})

export default Tabs;