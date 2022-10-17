import React, { useState, useContext, useEffect } from 'react';
import estilos from '../../../Estilos/Estilos';
import { ScrollView } from 'react-native';
import Baldoza from './Baldoza/Baldoza';
import { Contexto } from '../../../Storage/ContextoProvider';

const PanelBaldozas = (props) => {

    const { data, setData } = useContext(Contexto);
    const [cantCartera, setCantCartera] = useState(0);
    const [cantLibrados, setCantLibrados] = useState(0);
    const [cantAceptados, setCantAceptados] = useState(0);
    const [cantRechazados, setCantRechazados] = useState(0);
    const [cantDepositados, setCantDepositados] = useState(0);

    useEffect(() => {
        /*Obtengo los cheques por API*/

        fetch('http://192.168.1.9:8585/CHD_POC/com.echeq.aws_bancocuentasget?' + props.banco + "," + props.usuario + "'",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {

                let cuentasUsuario = []

                responseJson.forEach((cuenta) => { // Recorro las cuentas
                    let cuentoLibrados = 0
                    let cuentoRecibidos = 0
                    let cuentoAceptados = 0


                    if (cuenta.CuentaActiva === true) { // Guardo los nros de cuenta para usar despues

                        cuentasUsuario.push({
                            nombreCta: cuenta.CuentaNombre,
                            numeroCta: cuenta.CuentaNumero,
                            sucursalCta: cuenta.CuentaSucursal
                        })

                        cuenta.ChequesLibrados.forEach((cheque) => { // Recorro cheques LIBRADOS de la cuenta
                            if (cheque.NroCheque != '') {

                                cuentoLibrados += 1
                                setCantLibrados(cuentoLibrados)
                            }
                        })

                        cuenta.ChequesLibrados.forEach((cheque) => { // Recorro cheques LIBRADOS de la cuenta y cuento los ACEPTADOS
                            if (cheque.NroCheque != '' && cheque.EstadoCheque === 'CHEQUE ACEPTADO') {

                                cuentoAceptados += 1
                                setCantAceptados(cuentoAceptados)
                            }
                        })

                        cuenta.ChequesRecibidos.forEach((cheque) => { // Recorro cheques RECIBIDOS de la cuenta
                            if (cheque.NroCheque != '') {

                                cuentoRecibidos += 1
                                setCantCartera(cuentoRecibidos)
                            }
                        })
                    }
                    
                    setData({ ...data, cuentas: cuentasUsuario })
                    
                })

            })

    }, []);


    /*TODO: HACER QUE EL USEFFECT SE EJECUTE CADA VEZ QUE EL USUARIO HAGA SCROLL PARA ACUTALIZAR CON REFRESHCONTROL*/

    return (
        <ScrollView style={{ width: '80%' }} >
            <Baldoza rutaImg={require('../../../assets/Cartera.png')} nombre={'CARTERA'} cantidad={cantCartera} descripcion={'Cheques recibidos en cartera'} />
            <Baldoza rutaImg={require('../../../assets/Librados.png')} nombre={'LIBRADOS'} cantidad={cantLibrados} descripcion={'Cheques librados por mi'} />
            <Baldoza rutaImg={require('../../../assets/Aceptados.png')} nombre={'ACEPTADOS'} cantidad={cantAceptados} descripcion={'Cheques aceptados por beneficiario'} />
            <Baldoza rutaImg={require('../../../assets/Rechazados.png')} nombre={'RECHAZADOS'} cantidad={cantRechazados} descripcion={'Cheques rechazados por beneficiario'} />
            <Baldoza rutaImg={require('../../../assets/Depositados.png')} nombre={'DEPOSITADOS'} cantidad={cantDepositados} descripcion={'Cheques depositados en banco'} />
        </ScrollView>
    );
};

export default PanelBaldozas;