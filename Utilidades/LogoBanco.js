import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PALETA from './Paleta';


const LogoBanco = ({ banco, ancho, alto }) => {
    const [bancoLogo, setBancoLogo] = useState({})


    useEffect(() => {

        switch (banco) {
            case '1':
                setBancoLogo(require('../assets/bancoVerde.png'))
                break
            case '2':
                setBancoLogo(require('../assets/bancoAzul.png'))
                break
            case '3':
                setBancoLogo(require('../assets/bancoRojo.png'))
                break
            case '5':
                setBancoLogo(require('../assets/bancoAmarillo.png'))
                break
        }
    }, [])

    return (
        <View >
            <Image source={bancoLogo} style={{ width: ancho, height: alto }} />
        </View>
    )
}

const estilos = StyleSheet.create({

    shadowed: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    }

})

export default LogoBanco