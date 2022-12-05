import React, { useEffect, useState, useContext } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import Cheque from '../Cheque/Cheque';
import ChequeDetalleModal from '../Cheque/ChequeDetalleModal';
import HeaderTitulo from '../../Header/HeaderTitulo';
import { Contexto } from '../../../Storage/ContextoProvider';
import SERVICIOS from '../../../Utilidades/Servicios';
import PALETA from '../../../Utilidades/Paleta';

const Cartera = () => {
    const { data, setData, refrescar, setRefrescar } = useContext(Contexto)
    const [cheques, setCheques] = useState([])
    const [loading, setLoading] = useState(true)
    const [verDetalle, setVerDetalle] = useState(false)
    const [verCheque, setVerCheque] = useState({})


    useEffect(() => {

        obtengoCheques();

    }, [refrescar]);

    const obtengoCheques = () => {
        /* Obtengo los cheques por API */
        fetch(SERVICIOS.ChequesPersona + '1,1,' + data.cedula,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {

                setCheques([])
                setLoading(false)

                responseJson.forEach((object) => {

                    object.ChequesRecibidos ?

                        object.ChequesRecibidos.forEach((cheque) => { // Recorro los cheques RECIBIDOS de la persona
                            setCheques(cheques => [
                                ...cheques,
                                {
                                    NroCheque: cheque.NroCheque.trim(),
                                    TipoCheque: cheque.TipoCheque.trim(),
                                    MonedaCheque: cheque.MonedaCheque.trim(),
                                    ImporteCheque: cheque.ImporteCheque.trim(),
                                    EstadoCheque: cheque.EstadoCheque.trim(),
                                    VencimientoCheque: cheque.VencimientoCheque.trim(),
                                    LibradoCheque: cheque.LibradoCheque.trim(),
                                    BancoCheque: cheque.Banco.trim(),
                                    CuentaCheque: cheque.Cuenta.trim(),
                                    BeneficiarioCheque: cheque.BeneficiarioCheque.trim(),
                                    CMC7Cheque: cheque.CMC7Cheque.trim(),
                                   
                                }
                            ])
                        })

                        :
                        setCheques([])
                })
            })
    }

    const switchDetalle = (item) => { /* Abre/Cierra detalle de cheque seleccionado */
        setVerDetalle(!verDetalle)
        setVerCheque(item)
    }

    return (
        <View style={estilos.container}>
            <HeaderTitulo titulo="Cartera" />
            {cheques == '' ?
                <View style={estilos.listaVacia}>
                    <Image source={require('../../../assets/bankrupt.png')} style={{ width: 150, height: 150, bottom: 50 }} />
                    <TouchableOpacity style={estilos.btnActualizar} onPress={() => { setRefrescar(!refrescar) }}>
                        <Text style={estilos.btnActualizarTxt}>
                            Actualizar
                        </Text>
                    </TouchableOpacity>
                </View>

                :

                <View style={estilos.listaCheques}>

                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={cheques}
                        onRefresh={() => obtengoCheques()}
                        refreshing={loading}
                        renderItem={({ item }) => (
                            <Cheque
                                numero={item.NroCheque}
                                tipo={item.TipoCheque}
                                moneda={item.MonedaCheque}
                                importe={item.ImporteCheque}
                                estado={item.EstadoCheque}
                                vencimiento={item.VencimientoCheque}
                                emision={item.LibradoCheque}
                                librador={item.LibradorCheque}
                                banco={item.BancoCheque}
                                beneficiario={item.BeneficiarioCheque}
                                banda={item.CMC7Cheque}
                                visualizar={switchDetalle}
                                
                            />
                        )}
                    />
                </View>
            }

            <ChequeDetalleModal visible={verDetalle} cheque={verCheque} cerrarDetalle={switchDetalle} tipo='Recibidos'/>

        </View>
    );
};

const estilos = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: PALETA[1],
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },

    listaVacia: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    listaCheques: {
        width: '90%',
        flex: 1,
    },
    btnActualizar: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: PALETA[3],
        borderRadius: 50,
        paddingHorizontal: 20,
        height: 50,
    },

    btnActualizarTxt: {
        color: PALETA[3],
        fontSize: 23
    }
})

export default Cartera;