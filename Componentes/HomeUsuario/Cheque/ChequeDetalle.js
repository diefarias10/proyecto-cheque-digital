import React, { useState, useRef } from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import EstadoCheque from './EstadoCheque/EstadoCheque';
import LogoBanco from '../../../Utilidades/LogoBanco';
import PALETA from '../../../Utilidades/Paleta';
import GestureFlipView from 'react-native-gesture-flip-card';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';





const ChequeDetalle = ({ infoCheque }) => { /* Este componente es el cheque que se muestra en el modal de Detalle */
    const imgComun = require('../../../assets/ChequePattern.png')
    const imgDiferido = require('../../../assets/ChequeDifPattern.png')
    const refCheque = useRef();



    const girarChequeDer = () => {
        refCheque.current.flipRight()
    }

    const girarChequeIzq = () => {
        refCheque.current.flipLeft()
    }

    const chequeFrente = () => {
        return (

            <View style={infoCheque.tipoCheque == '2' || infoCheque.tipoCheque == 'DIFERIDO' ? [estilos.chequeDiferido, estilos.shadowed] : [estilos.cheque, estilos.shadowed]}>

                <ImageBackground source={infoCheque.tipoCheque == '2' || infoCheque.tipoCheque == 'DIFERIDO' ? imgDiferido : imgComun} resizeMode="cover">
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} /*FILA 1*/ >
                        <View /*NUMERO CHEQUE*/>
                            <Text style={estilos.textoChequeNum}>#{infoCheque.nroCheque}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF80', borderRadius: 5, paddingHorizontal: 5, justifyContent: 'flex-end' }} /*IMPORTE*/>
                            <Text style={estilos.textoChequeMoneda}>{infoCheque.monedaCheque}</Text>
                            <Text style={estilos.textoChequeImporte}>{infoCheque.importeCheque}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}/*FILA 3*/>
                        <View  /*EMISION*/>
                            <Text>Emision:</Text>
                            <View>
                                <Text style={estilos.textoCheque}>
                                    <Text style={{ fontWeight: 'bold' }}>{infoCheque.emisionCheque}</Text>
                                </Text>
                            </View>
                        </View>

                        {
                            infoCheque.tipoCheque === '2' || infoCheque.tipoCheque === 'DIFERIDO' ?
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text>Vencimiento:</Text>
                                    <View>
                                        <Text style={estilos.textoCheque}><Text style={{ fontWeight: 'bold' }}>{infoCheque.vencCheque}</Text></Text>
                                    </View>
                                </View>
                                :
                                <View />
                        }
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} /*FILA 4*/>
                        <View>

                            <Text>Beneficiario:</Text>
                            <View>
                                <Text style={estilos.textoCheque}><Text style={{ fontWeight: 'bold' }}>{infoCheque.beneficiarioCheque}  {infoCheque.beneficiarioCI}</Text></Text>
                            </View>
                        </View>
                        <View style={{ marginVertical: 5 }}>
                            <LogoBanco banco={infoCheque.bancoCheque} ancho={40} alto={40} />
                        </View>

                    </View>
                    <View /*FILA 5 */>
                        <EstadoCheque estadoCheque={infoCheque.estadoCheque} />
                    </View>
                    <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF80' }} /*FILA 6*/>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={estilos.textoChequeBanda}>{infoCheque.bandaCheque}</Text>
                        </View>
                    </View>

                </ImageBackground>
            </View>
        )
    }

    const chequeDorso = () => {
        return (


            <View style={infoCheque.tipoCheque == '2' || infoCheque.tipoCheque == 'DIFERIDO' ? [estilos.chequeDiferido, estilos.shadowed] : [estilos.cheque, estilos.shadowed]}>
                <View>
                    <ImageBackground source={infoCheque.tipoCheque == '2' || infoCheque.tipoCheque == 'DIFERIDO' ? imgDiferido : imgComun} resizeMode="cover">

                    </ImageBackground>
                </View>
            </View>

        )
    }



    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <GestureFlipView width={700} height={250} ref={refCheque}>

                {chequeFrente()}
                {chequeDorso()}

            </GestureFlipView>

            <TouchableOpacity style={estilos.btnGirarIzq} onPress={() => { girarChequeIzq() }}>
                <MaterialCommunityIcons name="arrow-up-left" size={25} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity style={estilos.btnGirarDer} onPress={() => { girarChequeDer() }}>
                <MaterialCommunityIcons name="arrow-up-right" size={25} color="#FFF" />
            </TouchableOpacity>

        </View>
    )
}

const estilos = StyleSheet.create({

    cheque: {
        justifyContent: 'center',
        backgroundColor: '#d7f0ff',
        borderWidth: 1,
        borderColor: '#5BB9F1',
        marginTop: 20,
        borderRadius: 10,
        padding: 8,
        elevation: 4,
        width: 360,
        height: 190
    },

    chequeDiferido: {
        backgroundColor: '#FFE993',
        borderWidth: 1,
        borderColor: '#FFBD59',
        marginTop: 20,
        borderRadius: 5,
        padding: 8,
        elevation: 4,
        width: 360,
        height: 190
    },

    textoCheque: {
        color: PALETA[1],
        fontSize: 17,
    },

    textoChequeNum: {
        color: PALETA[1],
        fontSize: 17,
        fontWeight: 'normal'
    },

    textoChequeMoneda: {
        color: PALETA[1],
        fontSize: 22,
        marginRight: 8,
        fontWeight: 'bold'
    },

    textoChequeImporte: {
        color: PALETA[1],
        fontSize: 22,
        fontWeight: 'bold'
    },

    textoChequeBanda: {
        color: PALETA[1],
        fontSize: 14,
        fontWeight: 'normal',
        letterSpacing: 2
    },

    btnGirarDer: {
        position: 'absolute',
        bottom: -5,
        right: 0,
        backgroundColor: PALETA[2],
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 35,
        height: 35,
        elevation: 10,
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },


    btnGirarIzq: {
        position: 'absolute',
        bottom: -5,
        left: 0,
        backgroundColor: PALETA[2],
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 35,
        height: 35,
        elevation: 10,
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },


    shadowed: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    }
})

export default ChequeDetalle