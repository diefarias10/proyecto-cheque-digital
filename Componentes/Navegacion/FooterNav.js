import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeUsuario from '../HomeUsuario/HomeUsuario';
import Cartera from '../HomeUsuario/Cartera/Cartera';
import LibrarCheque from '../HomeUsuario/LibrarCheque.js/LibrarCheque';
import estilos from '../../Estilos/Estilos';
import { FontAwesome5, Entypo } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();


const BotonLibrar = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -18,
            justifyContent: 'center',
            alignItems: 'center',
            ...estilos.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#7699D0',
            elevation: 5
        }}
        >
            {children}
        </View>
    </TouchableOpacity>
);



const Tabs = ({ route }) => {

    return (
        <Tab.Navigator tabBarOptions={{
            showLabel: false,
            style: {
                position: 'absolute',
                elevation: 10,
                backgroundColor: '#FFF',
                borderTopRightRadius: 50,
                borderTopLeftRadius: 50,
                height: 70,
                ...estilos.shadow
            }
        }} >
            <Tab.Screen name="Home" component={HomeUsuario} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5 name="home" size={35} color="#081D3C" />
                    </View>
                ),
            }} />
            <Tab.Screen name="Librar" component={LibrarCheque}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5 name="money-check" size={35} color="white" />
                    ),
                    tabBarButton: (props) => (
                        <BotonLibrar {...props} />
                    )
                }}
            />
            <Tab.Screen name="Cartera" component={Cartera} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <FontAwesome5 name="wallet" size={33} color="#081D3C" />
                    </View>
                ),
            }} />
        </Tab.Navigator>
    );
};

export default Tabs;