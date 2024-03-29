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
                                #{props.numero}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF80', borderRadius: 3, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center' }} /*IMPORTE*/>
                            <Text style={estilos.textoChequeMoneda}>
                                {monedaCheque}
                            </Text>
                            <Text style={estilos.textoChequeImporte}>
                                {props.importe}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }} /*FILA 3*/>
                        <View style={{ borderBottomColor: PALETA[1] }} /*EMISION*/>
                            <Text>Emision:</Text>
                            <Text style={estilos.textoChequeNum}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {props.emision}
                                </Text>
                            </Text>
                        </View>

                        {
                            props.tipo === '2' || props.tipo === 'DIFERIDO' ?
                                <View style={{ borderBottomColor: PALETA[1], alignItems: 'flex-end' }} /*VENCIMIENTO*/>
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
                        <View style={{ borderBottomColor: PALETA[1], width: '80%' }}>
                            <Text>Beneficiario:</Text>
                            <Text style={estilos.textoCheque}>
                                <Text style={{ fontWeight: 'bold' }}>{props.beneficiario}   {props.beneficiarioCI}
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
                {props.firmado ? <TagCheque tipo='firmado' icono='signature' /> : <View />}

                {
                    props.estado == 'LIBRADO' ? <TagCheque tipo='librado' icono='check' /> :
                        props.estado == 'CHEQUE ACEPTADO' ? <TagCheque tipo='correcto' icono='check-double' /> :
                            props.estado == 'CHEQUE RECHAZADO' || props.estado == 'ANULADO LIBRADOR' ? <TagCheque tipo='error' icono='ban' /> :
                                props.estado == 'PENDIENTE DE ACEPTAR' ? <TagCheque tipo='pendiente' icono='clock' /> :
                                    props.estado == 'DEPOSITADO' ? <TagCheque tipo='depositado' icono='donate' /> :
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
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 10,
        padding: 8,
        width: '100%',
    },

    chequeDiferido: {
        backgroundColor: '#FFE993',
        borderColor: '#FFBD59',
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 10,
        padding: 8,
      
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
        fontWeight: 'bold',


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
        bottom: -1,
        left: 10
    },

    shadowed: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4
    }

})

export default Cheque;