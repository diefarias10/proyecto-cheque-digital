import React, { useEffect, useState, useContext } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import estilos from '../../../Estilos/Estilos';
import Cheque from '../Cheque/Cheque';
import HeaderTitulo from '../../Header/HeaderTitulo';
import { Contexto } from '../../../Storage/ContextoProvider';

const Cartera = () => {

    const { data, setData } = useContext(Contexto)
    const [cheques, setCheques] = useState([]);
    const [loading, setLoading] = useState(true)


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
                        cuenta.ChequesRecibidos.forEach((cheque) => { // Recorro cheques RECIBIDOS de la cuenta
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

    useEffect(() => {
        obtengoCheques();
    }, []);

    return (
        <View style={estilos.container}>
            <HeaderTitulo titulo="Cartera" />
            {cheques == '' ?
                <View style={estilos.listaVacia}>
                    <Image source={require('../../../assets/VacioCartera.png')} />
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
                                librador={item.LibradorCheque}
                                beneficiario={item.BeneficiarioCheque}
                                banda={item.CMC7Cheque}
                            />
                        )}
                    />
                </View>
            }

            <View style={{ paddingVertical: 25, marginTop: 25 }}>

            </View>
        </View>
    );
};

export default Cartera;