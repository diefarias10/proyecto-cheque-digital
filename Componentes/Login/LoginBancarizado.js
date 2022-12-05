import React, { useContext, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Image, KeyboardAvoidingView, Keyboard, ActivityIndicator } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet } from 'react-native';
import { Contexto } from '../../Storage/ContextoProvider';
import SERVICIOS from '../../Utilidades/Servicios';
import PALETA from '../../Utilidades/Paleta';
import PopupError from '../../UI/PopupError';
import UserInput from '../../UI/UserInput';
import Boton from '../../UI/Boton';
import { Ionicons, Entypo } from '@expo/vector-icons';


const LoginBancarizado = ({ navigation }) => {
    // Estado Contexto
    const { data, setData } = useContext(Contexto)
    const [bancos, setBancos] = useState(["Verde", "Azul", "Rojo", "Gris", "Amarillo"])
    // Estado Popups
    const [txtError, setTxtError] = useState('')
    const [mostrarPopupError, setMostrarPopupError] = useState(true)
    // Estado de inputs login
    const [bancoLogin, setBancoLogin] = useState('')
    const [usuarioLogin, setUsuarioLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [loading, setLoading] = useState(false)



    const controlLoginHandler = () => {
        // Controlo campos vacios del login
        if (bancoLogin == '' || usuarioLogin == '' || passwordLogin == '') {
            setMostrarPopupError(!mostrarPopupError)
            setTxtError('No se aceptan campos vacios')
            setTimeout(() => {
                setMostrarPopupError(true)
            }, 2000);
        } else {
            setLoading(true)
            // LLamo servicio de CHD para verificar datos de login
            fetch(SERVICIOS.LoginUsuario + usuarioLogin + ',' + passwordLogin + ',HB,' + bancoLogin + "'",
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
                .then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.nombre != 'ERROR') {
                        setData({
                            ...data,
                            usuario: responseJson.nombre,
                            cedula: usuarioLogin,
                            tipoUsuario: 'HB',
                            bancoID: bancoLogin.toString()
                        })
                        navigation.navigate('Home Usuario')
                        setLoading(false)
                    }
                    else {
                        setLoading(false)
                        setMostrarPopupError(!mostrarPopupError)
                        setTxtError('Verifique Cedula / Contraseña')
                        setTimeout(() => {
                            setMostrarPopupError(true)
                        }, 2000);
                    }
                })
        }
    };

    const cambiarBanco = (id, bancoNombre) => {
        setBancoLogin(id)
        setData({ ...data, bancoID: id, banco: bancoNombre })
    }

    return (
        <View style={{ flex: 1 }}>
            {
                loading ? <ActivityIndicator size='large' style={{ flex: 1 }} color={PALETA[1]} />
                    :
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={[estilos.loginContainer]}>
                                <View style={{ height: '30%', backgroundColor: PALETA[2] }}>
                                    <View style={{ flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', width: '100%', borderBottomLeftRadius: 80 }}>
                                        <Image source={require('../../assets/CHDLoginLogo.png')} style={{ width: 300, height: 150 }} />
                                    </View>
                                </View>

                                <View style={{ height: '70%', backgroundColor: '#FFF' }}>
                                    <View style={[estilos.loginForm]}>
                                        <View style={{ marginVertical: 10, width: '100%' }} >
                                            <View >
                                                <Text style={estilos.inputLabel}>Banco</Text>
                                            </View>
                                            <View style={estilos.loginInputContainer}>
                                                <SelectDropdown
                                                    data={bancos}
                                                    onSelect={(selectedItem, index) => {
                                                        cambiarBanco(index + 1, selectedItem)
                                                    }}
                                                    buttonTextAfterSelection={(selectedItem, index) => {
                                                        return selectedItem
                                                    }}
                                                    rowTextForSelection={(item, index) => {
                                                        return item
                                                    }}
                                                    rowStyle={{ marginHorizontal: 10 }}

                                                    dropdownStyle={{ borderRadius: 10 }}

                                                    defaultButtonText='Seleccione un banco'

                                                    buttonStyle={estilos.loginDropdown}

                                                    buttonTextStyle={{ color: PALETA[1] }}

                                                    dropdownIconPosition='right'

                                                    renderDropdownIcon={() => { return <Ionicons name="chevron-down" size={30} color={PALETA[2]} /> }}
                                                />
                                            </View>
                                        </View>

                                        <UserInput label='Cédula / RUT' teclado='numeric' icono='person-circle-sharp' placeholder='N° Documento' alineacion='center' onChange={setUsuarioLogin} />

                                        <UserInput label='Contraseña' tipo='password' icono='lock-closed' placeholder='Contraseña' alineacion='center' onChange={setPasswordLogin} />

                                        <Boton texto='Ingresar' onPress={controlLoginHandler} />

                                    </View>
                                </View>

                                <PopupError visible={mostrarPopupError} texto={txtError} />

                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
            }
        </View>
    );
};

const estilos = StyleSheet.create({

    loginContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'flex-end',
    },

    loginForm: {
        flex: 1,
        width: '100%',
        backgroundColor: PALETA[2],
        borderTopRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 50,
        paddingHorizontal: 10,
        elevation: 20,
    },

    loginDropdown: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: '#FFF',
        padding: 5,
        color: PALETA[1],
        fontSize: 18
    },

    loginInputContainer: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginTop: 5,
        paddingHorizontal: 5,
        paddingVertical: 2
    },

    inputLabel: {
        color: '#FFF',
        fontSize: 14
    },

    shadowed: {
        shadowColor: 'darkgrey',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    shadowedBtn: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4
    }
})

export default LoginBancarizado;