import React, { useState } from 'react';
import { useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import estilos from '../../../Estilos/Estilos';
import EstadoCheque from './EstadoCheque/EstadoCheque';

const ChequeDetalle = ({infoCheque})=>{ /* Este componente es el cheque que se muestra en el modal de Detalle */
    const imgComun = require('../../../assets/ChequePattern.png')
    const imgDiferido = require('../../../assets/ChequeDifPattern.png')


    return(
        <TouchableOpacity style={infoCheque.tipoCheque == '2' || infoCheque.tipoCheque == 'DIFERIDO' ? estilos.chequeDiferido : estilos.cheque}>
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}/*FILA 2*/>
                        <View>
                            <Text style={estilos.textoCheque}>{infoCheque.tipoCheque === '1' || infoCheque.tipoCheque === 'COMÚN' ? 'COMÚN' : 'DIFERIDO'}</Text>
                        </View>
                        {infoCheque.tipoCheque === '2' || infoCheque.tipoCheque === 'DIFERIDO' ?
                            <View>
                                <Text style={estilos.textoCheque}>Vence:   {infoCheque.vencCheque}</Text>
                            </View> : <View />}
                    </View>
                    <View /*FILA 3*/>
                        <View>
                            <Text style={estilos.textoCheque}>Librador: {infoCheque.libradorCheque}</Text>
                        </View>
                    </View>
                    <View /*FILA 4*/>
                        <View>
                            <Text style={estilos.textoCheque}>Beneficiario: {infoCheque.beneficiarioCheque} - {infoCheque.beneficiarioCI}</Text>
                        </View>
                    </View>
                    <View /*FILA 5 */>
                        <EstadoCheque estadoCheque={infoCheque.estadoCheque}/>
                    </View>
                    <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF80' }} /*FILA 6*/>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={estilos.textoChequeBanda}>{infoCheque.bandaCheque}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}

export default ChequeDetalle