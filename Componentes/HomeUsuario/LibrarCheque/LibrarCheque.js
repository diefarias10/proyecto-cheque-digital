import React, { useState, useContext, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert, Image, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import HeaderTitulo from '../../Header/HeaderTitulo';
import Cheque from '../Cheque/Cheque';
import ChequeDetalleModal from '../Cheque/ChequeDetalleModal';
import SERVICIOS from '../../../Utilidades/Servicios';
import PALETA from '../../../Utilidades/Paleta';
import { Contexto } from '../../../Storage/ContextoProvider';
import FormChequeModal from './FormChequeModal';
import { FontAwesome5, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import PopupError from '../../../UI/PopupError';
import PopupExito from '../../../UI/PopupExito';
import * as LocalAuthentication from 'expo-local-authentication';

const LibrarCheque = () => {
    const { data, setData, refrescar, setRefrescar } = useContext(Contexto)
    const [modoLibrar, setModoLibrar] = useState(false)
    const [numReserv, setNumReserv] = useState(0)
    const [cheques, setCheques] = useState([])
    const [loading, setLoading] = useState(true)
    const [verDetalle, setVerDetalle] = useState(false)
    const [verCheque, setVerCheque] = useState({})
    const [mostrarPopupError, setMostrarPopupError] = useState(true)
    const [mostrarPopupExito, setMostrarPopupExito] = useState(true)
    const [txtError, setTxtError] = useState('')
    const [txtExito, setTxtExito] = useState('')



    useEffect(() => {
        obtengoCheques()
        reservoNumero()
    }, [refrescar])


    const obtengoCheques = () => {
        // Obtengo los cheques por API 
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

                    object.ChequesLibrados?.forEach((cheque) => { // Recorro los cheques LIBRADOS de la persona

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
                                Recibido: false,
                                Firmado: true
                            }
                        ])
                    }
                    )
                })
            })
    }


    const reservoNumero = () => {
        // RESERVO NUMERO PARA EL CHEQUE NUEVO 
        fetch(SERVICIOS.ReservaNroCheque + data.bancoID + "," + data.cedula,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
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
        // LLAMO SERVICIO DE ALTA CHEQUE 

        console.log('Cheque a dar de alta: ')
        console.log('Nro: ' + numReserv)
        console.log('Banco:' + chequeNuevo.BancoID)
        console.log('SucursalNro: ' + chequeNuevo.SucursalNro)
        console.log('Cuenta Cheque: ' + chequeNuevo.CtaChequeNro)
        console.log('Sucursal: ' + chequeNuevo.SucursalNro)
        console.log('Cuenta nombre: ' + chequeNuevo.CuentaNombre)
        console.log('Tipo Cheque: ' + chequeNuevo.Tipo)
        console.log('Moneda: ' + chequeNuevo.MonedaCheque)
        console.log('Cruzado: ' + chequeNuevo.EsCruzado)
        console.log('No a la orden: ' + chequeNuevo.EsNoALaOrden)
        console.log('Benef. tipo doc: ' + chequeNuevo.BenefTipoDoc)
        console.log('Benef nro doc: ' + chequeNuevo.BenefNroDoc)
        console.log('Benef nombre: ' + chequeNuevo.BenefNombre)
        console.log('Importe: ' + chequeNuevo.ImporteCheque)
        console.log('Vencimiento: ' + chequeNuevo.VencimientoCheque)
        console.log('Firmado: ' + chequeNuevo.Firmado)


        fetch(SERVICIOS.AltaCheque
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
            + chequeNuevo.VencimientoCheque + ","
            + chequeNuevo.Firmado,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.exito == false) {
                    setMostrarPopupError(!mostrarPopupError)
                    setTxtError('No se pudo librar el cheque')
                    setTimeout(() => {
                        setMostrarPopupError(true)
                    }, 2000);
                }
                else {
                    setMostrarPopupExito(!mostrarPopupExito)
                    setTxtExito('Cheque librado con exito!')
                    setTimeout(() => {
                        setMostrarPopupExito(true)
                    }, 2000);

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
                            CuentaCheque: chequeNuevo.CtaChequeNro,
                            BeneficiarioCheque: chequeNuevo.BenefNombre,
                            CMC7Cheque: responseJson.cmc7,

                        }])
                }
                setRefrescar(!refrescar)

            })

    }



    const switchForm = () => { // Abre / Cierra formulario de cheque nuevo

        setModoLibrar(!modoLibrar)

    }

    const switchDetalle = (item) => { // Abre/Cierra detalle de cheque seleccionado 
        setVerDetalle(!verDetalle)
        if (item != undefined) {
            setVerCheque(item)
        }
        setRefrescar(!refrescar)
    }


    return (
        <View style={estilos.container}>

            <HeaderTitulo titulo="Cheques librados" formCheque={setModoLibrar} />


            {
                loading ? <ActivityIndicator size='large' style={{ flex: 1 }} /> : cheques == '' ?


                    <View style={estilos.listaVacia}>
                        <Image source={require('../../../assets/empty-pockets.png')} style={{ width: 200, height: 200, bottom: 50 }} />
                        <TouchableOpacity style={estilos.btnActualizar} onPress={() => { setRefrescar(!refrescar) }}>
                            <Text style={estilos.btnActualizarTxt}>
                                Actualizar
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    :

                    <View style={estilos.listaCheques}>
                        <FlatList
                            onRefresh={() => obtengoCheques()}
                            refreshing={loading}
                            keyExtractor={(item, index) => index.toString()}
                            data={cheques}
                            showsVerticalScrollIndicator={false}
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
                                    cuenta={item.CuentaCheque}
                                    beneficiario={item.BeneficiarioCheque}
                                    banda={item.CMC7Cheque}
                                    visualizar={switchDetalle}
                                    recibido={item.Recibido}
                                    firmado={item.Firmado}
                                />
                            )}
                        />
                    </View>
            }


            <ChequeDetalleModal visible={verDetalle} cheque={verCheque} cerrarDetalle={switchDetalle} tipo='Enviados' />

            <FormChequeModal visible={modoLibrar} cerrarForm={switchForm} agregarCheque={agregarChequeHandler} numeroChq={numReserv} />

            <PopupError visible={mostrarPopupError} texto={txtError} />

            <PopupExito visible={mostrarPopupExito} texto={txtExito} />


        </View>
    );
};

const estilos = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },

    listaVacia: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listaCheques: {

        flex: 1,
    },

    btnMenuSelec: {

        backgroundColor: PALETA[3],
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        elevation: 4
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
    },

    shadowedBtn: {
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 4
    }
})

export default LibrarCheque;