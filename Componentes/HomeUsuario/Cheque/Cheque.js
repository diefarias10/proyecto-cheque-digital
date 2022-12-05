import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import EstadoCheque from './EstadoCheque/EstadoCheque';
import LogoBanco from '../../../Utilidades/LogoBanco';
import TagCheque from '../../../UI/TagCheque';
import PALETA from '../../../Utilidades/Paleta';


const Cheque = (props) => {

    const imgComun = require('../../../assets/ChequePattern.png')
    const imgDiferido = require('../../../assets/ChequeDifPattern.png')
    const [verCheque, setVerCheque] = useState(null)


    /* CAMBIAR MONEDA */
    let monedaCheque = ''

    if (props.moneda === '1' || props.moneda === 'PESOS') {
        monedaCheque = '$'
    } else if (props.moneda === '2' || props.moneda === 'DOLARES') {
        monedaCheque = 'U$S'
    }

    const detalleCheque = () => {
        let cheque = {
            nroCheque: props.numero,
            monedaCheque: monedaCheque,
            tipoCheque: props.tipo,
            importeCheque: props.importe,
            emisionCheque: props.emision,
            vencCheque: props.vencimiento,
            libradorCheque: props.librador,
            bancoCheque: props.banco,
            cuentaCheque: props.cuenta,
            beneficiarioCheque: props.beneficiario,
            estadoCheque: props.estado,
            bandaCheque: props.banda,
            recibidot: props.recibido
        }

        props.visualizar(cheque)
    }

    return (

        <TouchableOpacity style={props.tipo == '2' || props.tipo == 'DIFERIDO' ? [estilos.chequeDiferido, estilos.shadowed] : [estilos.cheque, estilos.shadowed]} onPress={detalleCheque}>
            <View>
                <ImageBackground source={props.tipo == '2' || props.tipo == 'DIFERIDO' ? imgDiferido : imgComun} resizeMode="cover">
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} /*FILA 1*/ >
                        <View /*NUMERO CHEQUE*/>
                            <Text style={estilos.textoChequeNum}>
                                # {props.numero}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF80', borderRadius: 5, paddingHorizontal: 5, justifyContent: 'flex-end' }} /*IMPORTE*/>
                            <Text style={estilos.textoChequeMoneda}>
                                {monedaCheque}
                            </Text>
                            <Text style={estilos.textoChequeImporte}>
                                {props.importe}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }} /*FILA 3*/>
                        <View /*EMISION*/>
                            <Text>Emision:</Text>
                            <Text style={estilos.textoChequeNum}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {props.emision}
                                </Text>
                            </Text>
                        </View>

                        {
                            props.tipo === '2' || props.tipo === 'DIFERIDO' ?
                                <View /*VENCIMIENTO*/>
                                    <Text>Vencimiento:</Text>
                                    <Text style={estilos.textoChequeNum}>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            {props.vencimiento}
                                        </Text>
                                    </Text>
                                </View> : <View />
                        }
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}/*FILA 4*/>
                        <View >
                            <Text>Beneficiario:</Text>
                            <Text style={estilos.textoCheque}>
                                <Text style={{ fontWeight: 'bold' }}>{props.beneficiario}  {props.beneficiarioCI}
                                </Text>
                            </Text>
                        </View>
                        <View >
                            <LogoBanco banco={props.banco} ancho={30} alto={30} />
                        </View>
                    </View>



                </ImageBackground>
            </View>


            <View style={estilos.tagContainer}>

                <TagCheque tipo='firmado' icono='signature' />

                {
                    props.estado == 'LIBRADO' ? <TagCheque tipo='librado' icono='check' /> :
                        props.estado == 'CHEQUE ACEPTADO' ? <TagCheque tipo='correcto' icono='check-double' /> :
                            props.estado == 'CHEQUE RECHAZADO' || props.estado == 'ANULADO LIBRADOR' ? <TagCheque tipo='error' icono='ban' /> :
                                props.estado == 'PENDIENTE DE ACEPTAR' ? <TagCheque tipo='pendiente' icono='clock' /> :
                                    <View />
                }
            </View>
        </TouchableOpacity>


    );
}

const estilos = StyleSheet.create({

    cheque: {
        backgroundColor: '#d7f0ff',
        borderColor: '#5BB9F1',
        marginTop: 20,
        borderRadius: 5,
        padding: 8,
        elevation: 5,
        width: '100%',
        shadowColor: PALETA[1],
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    chequeDiferido: {
        backgroundColor: '#FFE993',
        borderColor: '#FFBD59',
        marginTop: 20,
        borderRadius: 5,
        padding: 8,
        elevation: 4
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

    tagContainer: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        height: 30,
        bottom: -5,
        left: 5
    },


    shadowed: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    }

})

export default Cheque;