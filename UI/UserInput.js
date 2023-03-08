import React, { useContext, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Image, KeyboardAvoidingView, Keyboard } from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import PALETA from '../Utilidades/Paleta';


const UserInput = ({ label, teclado, icono, onChange, tipo, error, placeholder, alineacion, onFocus = () => { } }) => {
    const [ocultarTexto, setOcultarTexto] = useState(true)
    const [focus, setFocus] = useState(false)

    return (
        <View style={{ marginVertical: 10 }}>
            <View >
                <Text style={[estilos.inputLabel, { fontWeight: focus ? 'bold' : 'normal' }]}>{label}</Text>
            </View>

            <View style={[estilos.inputContainer, { borderColor: error ? PALETA.error : focus ? PALETA[3] : PALETA[1] }]} >

                <Ionicons name={icono} size={30} color={error ? PALETA.error : PALETA[2]} style={estilos.inputIcon} />

                <TextInput
                    keyboardType={teclado}
                    secureTextEntry={tipo == 'password' ? ocultarTexto : false}
                    style={[estilos.input, { color: error ? PALETA.error : PALETA[1], textAlign: alineacion }]}
                    placeholder={placeholder}
                    onChangeText={(input) => { onChange(input) }}
                    onFocus={() => {
                        onFocus()
                        setFocus(true)
                    }}

                    onBlur={() => {
                        setFocus(false)
                    }}
                />

                {
                    tipo == 'password' ?
                        <TouchableOpacity onPress={() => { setOcultarTexto(!ocultarTexto) }} activeOpacity={0}>
                            <Ionicons name={ocultarTexto ? "eye" : "eye-off"} size={30} color={error ? PALETA.error : PALETA[2]} />
                        </TouchableOpacity>
                        :
                        <Ionicons name={icono} size={35} color="#FFF" style={estilos.inputIcon} />
                }
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({

    inputLabel: {
        color: PALETA[1],
        fontSize: 14,
        marginBottom: 5
    },

    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 2
    },

    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: PALETA[1],
        paddingLeft: 5,
        fontSize: 18
    },

    inputIcon: {
        width: '10%'
    },



})

export default UserInput