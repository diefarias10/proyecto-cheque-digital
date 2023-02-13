import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import Baldoza from './Baldoza/Baldoza';
import { Contexto } from '../../../Storage/ContextoProvider';
import SERVICIOS from '../../../Utilidades/Servicios';

const PanelBaldozas = (props) => {

    const { data, setData, refrescar, setRefrescar } = useContext(Contexto);
    const [loading, setLoading] = useState(true)
    const [baldozas, setBaldozas] = useState([])
    const [contadores, setContadores] = useState({
        cartera: 0,
        librados: 0,
        aceptados: 0,
        rechazados: 0,
        depositados: 0,
        securecheck: 0
    })

    useEffect(() => {
        obtengoCantidades()
    }, [refrescar]);

    const obtengoCantidades = () => {
        /*Obtengo los cheques por API*/
      
        fetch(SERVICIOS.ChequesPersona + '1,1,' + data.cedula,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {

                setLoading(false)
                let cantidades = {
                    cartera: 0,
                    librados: 0,
                    aceptados: 0,
                    rechazados: 0,
                    depositados: 0,
                    securecheck: 0,
                }

                responseJson.forEach((object) => {
                    object.ChequesLibrados?.forEach((cheque) => {

                        switch (cheque.EstadoCheque) {
                            case 'PENDIENTE DE ACEPTAR':
                                cantidades.librados += 1
                                break
                            case 'CHEQUE ACEPTADO':
                                cantidades.aceptados += 1
                                break
                            case 'CHEQUE RECHAZADO':
                                cantidades.rechazados += 1
                                break
                            case 'DEPOSITADO':
                                cantidades.depositados += 1
                                break
                            case 'ENVIADO SECURECHECK':
                                cantidades.securecheck += 1
                                break

                        }
                    })

                 

                        object.ChequesRecibidos?.forEach((cheque) => {
                            cantidades.cartera += 1

                            if (cheque.EstadoCheque == 'ENVIADO SECURECHECK') {
                                cantidades.securecheck += 1
                            }
                        })
                        
                })

                /* setContadores({
                     cartera: cantidades.cartera,
                     librados: cantidades.librados,
                     aceptados: cantidades.aceptados,
                     rechazados: cantidades.rechazados,
                     depositados: cantidades.depositados,
                     securecheck: cantidades.securecheck
                 })*/

                setBaldozas([{
                    titulo: 'Cartera',
                    imagen: require('../../../assets/Cartera.png'),
                    cantidad: cantidades.cartera,
                    texto: 'Cheques recibidos en cartera'
                },
                {
                    titulo: 'Librados',
                    imagen: require('../../../assets/Librados.png'),
                    cantidad: cantidades.librados,
                    texto: 'Cheques librados por ti'
                },
                {
                    titulo: 'Aceptados',
                    imagen: require('../../../assets/Aceptados.png'),
                    cantidad: cantidades.aceptados,
                    texto: 'Cheques aceptados por beneficiario'
                },
                {
                    titulo: 'Rechazados',
                    imagen: require('../../../assets/Rechazados.png'),
                    cantidad: cantidades.rechazados,
                    texto: 'Cheques rechazados por beneficiario'
                },
                {
                    titulo: 'Depositados',
                    imagen: require('../../../assets/Depositados.png'),
                    cantidad: cantidades.depositados,
                    texto: 'Cheques depositados en banco'
                },
                {
                    titulo: 'SecureCheck',
                    imagen: require('../../../assets/DepositadosSC.png'),
                    cantidad: cantidades.securecheck,
                    texto: 'Cheques depositados en SecureCheck'
                }])
            })

    }

    /*TODO: HACER QUE EL USEFFECT SE EJECUTE CADA VEZ QUE EL USUARIO HAGA SCROLL PARA ACUTALIZAR CON REFRESHCONTROL*/

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>

            <FlatList
                onRefresh={() => obtengoCantidades()}
                refreshing={loading}
                keyExtractor={(item, index) => index.toString()}
                data={baldozas}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Baldoza
                        nombre={item.titulo}
                        rutaImg={item.imagen}
                        descripcion={item.texto}
                        cantidad={item.cantidad}
                    />
                )}
            />


        </View>

    );
};

export default PanelBaldozas;