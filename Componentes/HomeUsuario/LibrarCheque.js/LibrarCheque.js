import React, { useState, useContext, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import estilos from '../../../Estilos/Estilos';
import HeaderTitulo from '../../Header/HeaderTitulo';
import Cheque from '../Cheque/Cheque';
import ChequeDetalleModal from '../Cheque/ChequeDetalleModal';
import { Contexto } from '../../../Storage/ContextoProvider';
import FormChequeModal from './FormChequeModal';

const LibrarCheque = () => {
    const [modoLibrar, setModoLibrar] = useState(false)
    const { data, setData } = useContext(Contexto)
    const [numReserv, setNumReserv] = useState(0)
    const [cheques, setCheques] = useState([])
    const [loading, setLoading] = useState(true)
    const [verDetalle, setVerDetalle] = useState(false)
    const [verCheque, setVerCheque] = useState(null)


    useEffect(() => {
        obtengoCheques();
    }, []);

    const obtengoCheques = () => {
        /*Obtengo los cheques por API*/
        fetch('http://192.168.1.9:8585/CHD_POC/com.echeq.aws_bancocuentasget?' + data.bancoID + "," + data.cedula,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                setCheques([])
                setLoading(false)

                responseJson.forEach((cuenta) => { // Recorro las cuentas
                    if (cuenta.CuentaActiva === true) {
                        cuenta.ChequesLibrados.forEach((cheque) => { // Recorro cheques RECIBIDOS de la cuenta
                            if (cheque.NroCheque != '') {

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
                                        BeneficiarioCheque: cheque.BeneficiarioCheque.trim(),
                                        CMC7Cheque: cheque.CMC7Cheque.trim(),
                                    }])
                            }
                        })
                    }
                })
            })
    }


    const reservoNumero = () => {
        /* RESERVO NUMERO PARA EL CHEQUE NUEVO */
        fetch('http://192.168.1.9:8585/CHD_POC/com.echeq.ahttpreservanrocheque?' + data.bancoID + "," + data.cedula,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("*******************************")
                console.log("RESERVADO NRO CHEQUE: " + responseJson)
                console.log("*******************************")
                setNumReserv(responseJson);
            })
    }

    const agregarChequeHandler = (chequeNuevo) => {
        /*LLAMO SERVICIO DE ALTA CHEQUE*/
        fetch('http://192.168.1.9:8585/CHD_POC/com.echeq.ahttpaltamovil?'
            + numReserv + ","
            + chequeNuevo.BancoID + ","
            + chequeNuevo.SucursalNro + ","
            + chequeNuevo.CtaChequeNro + ","
            + chequeNuevo.SucursalNro + ","
            + chequeNuevo.CuentaNombre + ","
            + chequeNuevo.Tipo + ","
            + chequeNuevo.MonedaCheque + ","
            + chequeNuevo.EsCruzado + ","
            + chequeNuevo.EsNoALaOrden + ","
            + chequeNuevo.BenefTipoDoc + ","
            + chequeNuevo.BenefNroDoc + ","
            + chequeNuevo.BenefNombre + ","
            + chequeNuevo.ImporteCheque + ","
            + chequeNuevo.VencimientoCheque,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.exito === false) {
                    Alert.alert('Error!', 'No se pudo librar el cheque', [{ text: 'Ok' }]);
                }
                else {
                    Alert.alert('Listo!', 'Cheque librado con exito!', [{ text: 'Ok' }]);

                    setCheques(cheques => [
                        ...cheques,
                        {
                            NroCheque: numReserv,
                            TipoCheque: chequeNuevo.Tipo,
                            MonedaCheque: chequeNuevo.MonedaCheque,
                            ImporteCheque: chequeNuevo.ImporteCheque,
                            EstadoCheque: chequeNuevo.EstadoCheque,
                            VencimientoCheque: chequeNuevo.VencimientoCheque,
                            LibradorCheque: chequeNuevo.LibradorCheque,
                            BeneficiarioCheque: chequeNuevo.BenefNombre,
                            CMC7Cheque: responseJson.cmc7,
                        }])
                }
            })
    }

    const switchForm = () => {
        reservoNumero()
        setModoLibrar(!modoLibrar)
    }

    const switchDetalle = (item) => {
        setVerDetalle(!verDetalle)
        setVerCheque(item)
    }


    return (
        <View style={estilos.container}>
            <HeaderTitulo titulo="Cheques librados" />
            <TouchableOpacity style={estilos.btnMenuSelec} onPress={switchForm} /*BOTON NUEVO +*/>
                <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>
                    Nuevo +
                </Text>
            </TouchableOpacity>

            {cheques == '' ?
                <View style={estilos.listaVacia}>
                    <Image source={require('../../../assets/VacioLibrados.png')} />
                </View>
                :
                <View style={estilos.listaCheques}>
                    <FlatList
                        onRefresh={() => obtengoCheques()}
                        refreshing={loading}
                        keyExtractor={(item, index) => index.toString()}
                        data={cheques}
                        renderItem={({ item }) => (
                            <Cheque
                                numero={item.NroCheque}
                                tipo={item.TipoCheque}
                                moneda={item.MonedaCheque}
                                importe={item.ImporteCheque}
                                estado={item.EstadoCheque}
                                vencimiento={item.VencimientoCheque}
                                librador={item.LibradorCheque}
                                beneficiario={item.BeneficiarioCheque}
                                banda={item.CMC7Cheque}
                                visualizar={switchDetalle}
                            />
                        )}
                    />
                </View>
            }

            <ChequeDetalleModal visible={verDetalle} cheque={verCheque} cerrarDetalle={switchDetalle} />

            <FormChequeModal visible={modoLibrar} cerrarForm={switchForm} agregarCheque={agregarChequeHandler} numeroChq={numReserv} />
            <View style={{ paddingVertical: 25, marginTop: 25 }}>

            </View>
        </View>
    );
};

export default LibrarCheque;