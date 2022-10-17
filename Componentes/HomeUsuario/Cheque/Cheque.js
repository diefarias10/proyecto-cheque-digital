import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import estilos from '../../../Estilos/Estilos';


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
            vencCheque: props.vencimiento,
            libradorCheque: props.librador,
            beneficiarioCheque: props.beneficiario,
            estadoCheque: props.estado,
            bandaCheque: props.banda
        }

        props.visualizar(cheque)
    }

    return (

        <TouchableOpacity style={props.tipo == '2' || props.tipo == 'DIFERIDO' ? estilos.chequeDiferido : estilos.cheque} onPress={detalleCheque}>
            <View>
                <ImageBackground source={props.tipo == '2' || props.tipo == 'DIFERIDO' ? imgDiferido : imgComun} resizeMode="cover">
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} /*FILA 1*/ >
                        <View /*NUMERO CHEQUE*/>
                            <Text style={estilos.textoChequeNum}>#{props.numero}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF80', borderRadius: 5, paddingHorizontal: 5, justifyContent: 'flex-end' }} /*IMPORTE*/>
                            <Text style={estilos.textoChequeMoneda}>{monedaCheque}</Text>
                            <Text style={estilos.textoChequeImporte}>{props.importe}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}/*FILA 2*/>
                        <View>
                            <Text style={estilos.textoCheque}>{props.tipo === '1' || props.tipo === 'COMÚN' ? 'COMÚN' : 'DIFERIDO'}</Text>
                        </View>
                        {props.tipo === '2' || props.tipo === 'DIFERIDO' ?
                            <View>
                                <Text style={estilos.textoCheque}>Vence:   {props.vencimiento}</Text>
                            </View> : <View />}

                    </View>
                    <View /*FILA 3*/>
                        <View>
                            <Text style={estilos.textoCheque}>Librador: {props.librador}</Text>
                        </View>
                    </View>
                    <View /*FILA 4*/>
                        <View>
                            <Text style={estilos.textoCheque}>Beneficiario: {props.beneficiario} - {props.beneficiarioCI}</Text>
                        </View>
                    </View>
                    <View /*FILA 5 */>
                        <View >
                            <Text style={props.estado == 'RECHAZADO' ? estilos.textoChequeEstadoRech : estilos.textoChequeEstadoOk}>{props.estado}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF80' }} /*FILA 6*/>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={estilos.textoChequeBanda}>{props.banda}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>

    );

}

export default Cheque;