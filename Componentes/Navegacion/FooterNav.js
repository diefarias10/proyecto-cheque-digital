import React, { useContext } from 'react';
import { Text, View, Image, TouchableOpacity, Touchable, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeUsuario from '../HomeUsuario/HomeUsuario';
import Cartera from '../HomeUsuario/Cartera/Cartera';
import LibrarCheque from '../HomeUsuario/LibrarCheque/LibrarCheque';
import { StyleSheet } from 'react-native';
import { FontAwesome5, Entypo, Ionicons, AntDesign } from '@expo/vector-icons';
import PALETA from '../../Utilidades/Paleta';
import LogoBanco from '../../Utilidades/LogoBanco';
import { Contexto } from '../../Storage/ContextoProvider';


const Tab = createBottomTabNavigator();


const BotonLibrar = ({ children, onPress }) => (

    <TouchableOpacity
        style={{

            marginHorizontal: 40,

            ...estilos.shadowBtn
        }}
        onPress={onPress}
    >

        {children}

    </TouchableOpacity>
);



const Tabs = ({ route }) => {

    const { data, setData } = useContext(Contexto)


    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: [{ ...estilos.barraNav }, estilos.shadowPanel]
            }} >
            <Tab.Screen name="Home" component={HomeUsuario} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={estilos.btnTab}>
                        <Entypo name="home" size={40} color={focused ? PALETA[3] : '#FFF'} />
                        <Text style={[estilos.btnTabLabel, { color: focused ? PALETA[3] : '#FFF' }]}>
                            INICIO
                        </Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Librar" component={LibrarCheque}
                options={{
                    tabBarIcon: ({ focused }) => (

                        focused ?
                            
                                <LogoBanco banco={data.bancoID} ancho={80} alto={80} />
                           
                            :
                            <View style={estilos.btnTabCenter}>
                                <Image
                                    source={require('../../assets/new.png')}
                                    style={{ width: 90, height: 90, tintColor:  PALETA[4]  }} />

                            </View>

                    ),
                    tabBarButton: (props) => (
                        <BotonLibrar {...props} />
                    )
                }}
            />
            <Tab.Screen name="Cartera" component={Cartera} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={estilos.btnTab}>
                       <Entypo name="wallet" size={40} color={focused ? PALETA[3] : '#FFF'} />
                        <Text style={[estilos.btnTabLabel, { color: focused ? PALETA[3] : '#FFF' }]}>
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
        backgroundColor: PALETA[1],
        borderRadius: 15,

    },

    btnTab: {
        justifyContent: 'center',
        alignItems: 'center',
        top: Platform.OS === 'ios' ? 15 : 0,
    },

    btnTabCenter: {

        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        top: Platform.OS === 'ios' ? -1 : 0,
        width: 80,
        height: 80
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