import React, { useState } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import EstadoCheque from './EstadoCheque/EstadoCheque';
import LogoBanco from '../../../Utilidades/LogoBanco';
import PALETA from '../../../Utilidades/Paleta';




const ChequeDetalle = ({ infoCheque }) => { /* Este componente es el cheque que se muestra en el modal de Detalle */
    const imgComun = require('../../../assets/ChequePattern.png')
    const imgDiferido = require('../../../assets/ChequeDifPattern.png')


    return (
        <View style={infoCheque.tipoCheque == '2' || infoCheque.tipoCheque == 'DIFERIDO' ? [estilos.chequeDiferido, estilos.shadowed] : [estilos.cheque, estilos.shadowed]}>
            <View>
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
                        <View>
                            <Text style={estilos.textoCheque}>
                                <Text style={{ fontWeight: 'bold' }}>{infoCheque.emisionCheque}</Text>
                            </Text>
                        </View>
                        {
                            infoCheque.tipoCheque === '2' || infoCheque.tipoCheque === 'DIFERIDO' ?
                                <View>
                                    <Text style={estilos.textoCheque}>Vence:  <Text style={{ fontWeight: 'bold' }}>{infoCheque.vencCheque}</Text></Text>
                                </View> : <View />
                        }
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} /*FILA 4*/>
                        <View>
                            <Text style={estilos.textoCheque}>Beneficiario: <Text style={{ fontWeight: 'bold' }}>{infoCheque.beneficiarioCheque}  {infoCheque.beneficiarioCI}</Text></Text>
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
        </View>
    )
}

const estilos = StyleSheet.create({

    cheque: {
        backgroundColor: '#d7f0ff',
        borderColor: '#5BB9F1',
        marginTop: 20,
        borderRadius: 5,
        padding: 8,
        elevation: 4,
        width: '100%',

    },

    chequeDiferido: {
        backgroundColor: '#FFE993',
        borderColor: '#FFBD59',
        marginTop: 20,
        borderRadius: 5,
        padding: 8,
        elevation: 4,
        width: '100%',

    },

    textoCheque: {
        color: PALETA[1],
        fontSize: 17,
        marginVertical: 4
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

    shadowed: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    }
})

export default ChequeDetalle