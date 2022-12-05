import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity, ScrollView, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet } from 'react-native';
import Cheque from '../Cheque/Cheque';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { Contexto } from '../../../Storage/ContextoProvider';
import UserInput from '../../../UI/UserInput';
import PALETA from '../../../Utilidades/Paleta';
import SERVICIOS from '../../../Utilidades/Servicios';



const FormChequeModal = (props) => {

    const tiposDoc = ['CI', 'Pasaporte']
    const [cuentasUsuario, setCuentasUsuario] = useState([])
    const { data, setData } = useContext(Contexto);
    const [datosChequeNuevo, setDatosChequeNuevo] = useState({
        tipoCheque: '1',
        monedaCheque: '1',
        importeCheque: '',
        emision: '',
        vencCheque: '',
        benefCheque: '',
        benefTipoDoc: '',
        benefNroDoc: '',
        ctaChequeNombre: '',
        ctaChequeNro: '',
        sucursalCheque: '',
        sucursalNro: '',
        cruzado: false,
        noALaOrden: false,
    })

    useEffect(() => {
        obtengoCuentas(data.bancoID, data.cedula)
        setearFechaDia()
    }, [])


    const obtengoCuentas = (bancoId, cedula) => {
        // LLamo servicio de CHD para obtener cuentas de la persona
        fetch(SERVICIOS.CuentasPersona + bancoId + ',' + cedula + "'",
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {

                let listaCuentas = []

                responseJson.forEach((element) => {
                    listaCuentas.push({ ctaNumero: element.CuentaNumero, ctaNombre: element.CuentaNombre })
                })
                setCuentasUsuario(listaCuentas)
            })
    }

    const vaciarChequeNuevo = () => {
        setDatosChequeNuevo({
            tipoCheque: '1',
            monedaCheque: '1',
            importeCheque: '',
            emision: '',
            vencCheque: '',
            benefCheque: '',
            benefTipoDoc: '',
            benefNroDoc: '',
            ctaChequeNombre: '',
            ctaChequeNro: '',
            sucursalCheque: '',
            sucursalNro: '',
            cruzado: false,
            noALaOrden: false,
        })
    }

    const confirmoChequeHandler = () => {
        /* ARMO CHEQUE NUEVO PARA DAR DE ALTA */
        const chequeNuevo = {
            BancoID: data.bancoID,
            SucursalNro: datosChequeNuevo.sucursalNro,
            CtaChequeNro: datosChequeNuevo.ctaChequeNro,
            SucursalNombre: datosChequeNuevo.sucursalCheque,
            CuentaNombre: datosChequeNuevo.ctaChequeNombre,
            Tipo: datosChequeNuevo.tipoCheque,
            MonedaCheque: datosChequeNuevo.monedaCheque,
            EsCruzado: datosChequeNuevo.cruzado,
            EsNoALaOrden: datosChequeNuevo.noALaOrden,
            BenefTipoDoc: datosChequeNuevo.benefTipoDoc,
            BenefNroDoc: datosChequeNuevo.benefNroDoc,
            BenefNombre: datosChequeNuevo.benefCheque,
            ImporteCheque: datosChequeNuevo.importeCheque,
            VencimientoCheque: datosChequeNuevo.vencCheque,
            EstadoCheque: 'LIBRADO',
            LibradorCheque: data.usuario,
        }

        props.agregarCheque(chequeNuevo);
        vaciarChequeNuevo();
        props.cerrarForm();
    }


    const setearFechaDia = () => {
        const fecha = new Date()

        let dia = fecha.getDate()
        let mes = fecha.getMonth() + 1
        let año = fecha.getFullYear()

        let fechaDia = dia + "/" + mes + "/" + año

        setDatosChequeNuevo({ ...datosChequeNuevo, emision: fechaDia })

    }

    const cambiarTipoDoc = (tipo) => {
        if (tipo === 'CI') {
            setDatosChequeNuevo({ ...datosChequeNuevo, benefTipoDoc: '1' })
        } else if (tipo === 'Pasaporte') {
            setDatosChequeNuevo({ ...datosChequeNuevo, benefTipoDoc: '2' })
        }

    }

    const cambiarImporte = (importe) => {
        setDatosChequeNuevo({ ...datosChequeNuevo, importeCheque: importe })
    }

    const cambiarBenef = (nombre) => {
        setDatosChequeNuevo({ ...datosChequeNuevo, benefCheque: nombre })
    }

    const cambiarVenc = (vencimiento) => {
        setDatosChequeNuevo({ ...datosChequeNuevo, vencCheque: vencimiento })
    }

    const cambiarNroDoc = (numero) => {
        setDatosChequeNuevo({ ...datosChequeNuevo, benefNroDoc: numero })
    }

    const cambiarCuentaCheque = (cuenta) => {

        cuentasUsuario.forEach(element => {
            if (element.ctaNumero === cuenta) {
                let nombre = element.ctaNombre
                setDatosChequeNuevo({ ...datosChequeNuevo, ctaChequeNombre: nombre, ctaChequeNro: cuenta })
                console.log('Cuenta elegida nro: ' + cuenta)
                console.log('Cuenta elegida nombre: ' + nombre)
                return
            }
        })
    }

    const cambiarSuc = (sucursal) => {
        setDatosChequeNuevo({ ...datosChequeNuevo, sucursalCheque: sucursal })
    }

    const cambiarNroSuc = (numero) => {
        setDatosChequeNuevo({ ...datosChequeNuevo, sucursalNro: numero })
    }

    const cancelarLibrado = () => {
        props.cerrarForm()
        vaciarChequeNuevo()
    }





    return (

        <Modal visible={props.visible} animationType='slide' transparent={false}>
            <SafeAreaView style={{ flex: 1, backgroundColor: PALETA[2] }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ backgroundColor: '#FFF' }}>

                        <View style={[estilos.tabTitulo, estilos.shadowed]}>
                            <Text style={estilos.txtTituloForm}>
                                CHEQUE NUEVO
                            </Text>
                        </View>

                        <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                            <Cheque
                                numero={datosChequeNuevo.nroCheque}
                                tipo={datosChequeNuevo.tipoCheque}
                                moneda={datosChequeNuevo.monedaCheque}
                                importe={datosChequeNuevo.importeCheque}
                                estado='NUEVO'
                                emision={datosChequeNuevo.emision}
                                vencimiento={datosChequeNuevo.vencCheque}
                                librador={data.usuario}
                                beneficiario={datosChequeNuevo.benefCheque}
                                beneficiarioCI={datosChequeNuevo.benefNroDoc}
                                banco={data.bancoID}
                                banda=''
                                visualizar={() => { }}
                            />
                        </View>

                        <View style={{ width: '100%' }} >
                            <View style={estilos.panelBotonesForm}>
                                <View style={estilos.btnConfirmarForm}>
                                    <TouchableOpacity onPress={confirmoChequeHandler}>
                                        <FontAwesome name="check" size={50} color="#FFF" />
                                    </TouchableOpacity>
                                </View>
                                <View style={estilos.btnResetForm}>
                                    <TouchableOpacity onPress={vaciarChequeNuevo}>
                                        <FontAwesome name="refresh" size={40} color="#FFF" />
                                    </TouchableOpacity>
                                </View>
                                <View style={estilos.btnCancelarForm}>
                                    <TouchableOpacity onPress={cancelarLibrado}>
                                        <FontAwesome name="trash" size={50} color="#FFF" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <ScrollView style={[{ flex: 1, width: '100%'}]}>

                    <View style={[estilos.formContainer]}>

                        <View style={estilos.selector}>
                            <TouchableOpacity
                                style={[estilos.btnSelectorIzq,
                                { backgroundColor: datosChequeNuevo.tipoCheque == '1' ? PALETA[3] : '#FFF' },
                                { borderColor: datosChequeNuevo.tipoCheque == '1' ? PALETA[3] : 'transparent' }]}

                                onPress={() => {
                                    setDatosChequeNuevo({ ...datosChequeNuevo, tipoCheque: '1', vencCheque: '' })
                                }}>
                                <Text style={[estilos.selectorBtnTxt, { color: datosChequeNuevo.tipoCheque == '1' ? '#FFF' : PALETA[2] }]}>Común</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[estilos.btnSelectorDer,
                                { backgroundColor: datosChequeNuevo.tipoCheque == '2' ? PALETA[3] : '#FFF' },
                                { borderColor: datosChequeNuevo.tipoCheque == '2' ? PALETA[3] : 'transparent' }]}
                                onPress={() => { setDatosChequeNuevo({ ...datosChequeNuevo, tipoCheque: '2' }) }}>
                                <Text style={[estilos.selectorBtnTxt, { color: datosChequeNuevo.tipoCheque == '2' ? '#FFF' : PALETA[2] }]}>Diferido</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={estilos.selector}>
                            <TouchableOpacity
                                style={[estilos.btnSelectorIzq,
                                { backgroundColor: datosChequeNuevo.monedaCheque == '1' ? PALETA[3] : '#FFF' },
                                { borderColor: datosChequeNuevo.monedaCheque == '1' ? PALETA[3] : 'transparent' }]}

                                onPress={() => { setDatosChequeNuevo({ ...datosChequeNuevo, monedaCheque: '1' }) }}>
                                <Text style={[estilos.selectorBtnTxt, { color: datosChequeNuevo.monedaCheque == '1' ? '#FFF' : PALETA[2] }]}>$ - Pesos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[estilos.btnSelectorDer,
                                { backgroundColor: datosChequeNuevo.monedaCheque == '2' ? PALETA[3] : '#FFF' },
                                { borderColor: datosChequeNuevo.monedaCheque == '2' ? PALETA[3] : 'transparent' }]}
                                onPress={() => { setDatosChequeNuevo({ ...datosChequeNuevo, monedaCheque: '2' }) }}>
                                <Text style={[estilos.selectorBtnTxt, { color: datosChequeNuevo.monedaCheque == '2' ? '#FFF' : PALETA[2] }]}>U$S - Dolares</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={estilos.selector}>
                            <TouchableOpacity
                                style={[estilos.btnSelectorIzq,
                                { backgroundColor: datosChequeNuevo.cruzado == true ? PALETA[3] : '#FFF' },
                                { borderColor: datosChequeNuevo.cruzado == true ? PALETA[3] : 'transparent' }]}

                                onPress={() => { setDatosChequeNuevo({ ...datosChequeNuevo, cruzado: !datosChequeNuevo.cruzado }) }}>
                                <Text style={[estilos.selectorBtnTxt, { color: datosChequeNuevo.cruzado == true ? '#FFF' : PALETA[2] }]}>Cruzado //</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[estilos.btnSelectorDer,
                                { backgroundColor: datosChequeNuevo.noALaOrden == true ? PALETA[3] : '#FFF' },
                                { borderColor: datosChequeNuevo.noALaOrden == true ? PALETA[3] : 'transparent' }]}
                                onPress={() => { setDatosChequeNuevo({ ...datosChequeNuevo, noALaOrden: !datosChequeNuevo.noALaOrden }) }}>
                                <Text style={[estilos.selectorBtnTxt, { color: datosChequeNuevo.noALaOrden == true ? '#FFF' : PALETA[2] }]}>No a la orden</Text>
                            </TouchableOpacity>
                        </View>


                        <UserInput label='Importe' teclado='numeric' placeholder='Importe del cheque' alineacion='center' onChange={cambiarImporte} />


                        {
                            datosChequeNuevo.tipoCheque === '2' ?


                                <UserInput label='Vencimiento' placeholder='DD / MM / AAAA' alineacion='center' onChange={cambiarVenc} />

                                :
                                <View />
                        }


                        <UserInput label='Beneficiario' placeholder='Nombre y apellido' onChange={cambiarBenef} />

                        <View >
                            <Text style={estilos.formLabel} >
                                Tipo de Documento:
                            </Text>
                            <SelectDropdown
                                data={tiposDoc}
                                defaultButtonText='Elegir...'
                                buttonStyle={estilos.dropdownForm}
                                onSelect={(selectedItem, index) => {
                                    cambiarTipoDoc(selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {

                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {

                                    return item
                                }}

                                buttonTextStyle={{ color: PALETA[1] }}

                                dropdownStyle={{ borderRadius: 10 }}
                            />
                        </View>


                        <UserInput label='Documento de beneficiario' teclado='numeric' placeholder='N° de documento' onChange={cambiarNroDoc} />

                        <View style={{ marginVertical: 10 }}>
                            <Text style={estilos.formLabel} >
                                Cuenta a debitar:
                            </Text>
                            <SelectDropdown
                                data={cuentasUsuario.map((cuenta) => { return cuenta.ctaNumero })}
                                defaultButtonText='Elegir...'
                                buttonStyle={estilos.dropdownForm}
                                onSelect={(selectedItem, index) => {
                                    cambiarCuentaCheque(selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {

                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {

                                    return item
                                }}

                                buttonTextStyle={{ color: PALETA[1] }}

                                rowStyle={{ marginHorizontal: 10 }}

                                dropdownStyle={{ borderRadius: 10 }}
                            />
                        </View>


                        <UserInput label='Sucursal' placeholder='Nombre sucursal' onChange={cambiarSuc} />

                        <UserInput label='Sucursal' teclado='numeric' placeholder='N° Sucursal' onChange={cambiarNroSuc} />

                    </View>
                </ScrollView>
            </SafeAreaView >
        </Modal >

    );
}

const estilos = StyleSheet.create({

    tabTitulo: {
        backgroundColor: PALETA[2],
        width: '100%',
        elevation: 10,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    txtTituloForm: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
    },

    panelBotonesForm: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },

    btnConfirmarForm: {
        backgroundColor: PALETA[3],
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 15,
        width: '25%',
        elevation: 10,
        shadowColor: PALETA[1],
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },


    btnCancelarForm: {
        backgroundColor: PALETA.error,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 15,
        width: '25%',
        elevation: 10,
        shadowColor: PALETA[1],
        shadowOffset: { width: -4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    btnResetForm: {
        backgroundColor: PALETA[2],
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        width: 70,
        height: 70,
        elevation: 10,
        shadowColor: PALETA[1],
        shadowOffset: { width: -4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    formContainer: {
        backgroundColor: PALETA[2],
        alignItems: 'center',
        elevation: 6,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 0,
        paddingHorizontal: 10
    },

    formInput: {
        backgroundColor: '#FFF',
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18,
    },

    formLabel: {
        marginBottom: 5,
        color: 'white',
        fontSize: 14,
    },

    checkBoxForm: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },

    dropdownForm: {
        borderRadius: 5,
        width: '100%',
        height: 40,
        backgroundColor: '#FFF',
    },

    selector: {
        flexDirection: 'row',
        marginVertical: 10
    },

    selectorBtnTxt: {
        fontSize: 20,
        color: PALETA[2]
    },

    btnSelectorDer: {
        paddingVertical: 10,
        backgroundColor: '#FFF',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 0.5,
        borderColor: PALETA[2],
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },

    btnSelectorIzq: {
        paddingVertical: 10,
        backgroundColor: '#FFF',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderColor: PALETA[2],
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },

    shadowed: {
        shadowColor: 'darkgrey',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },

    shadowedForm: {
        shadowColor: 'red',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 1,
        shadowRadius: 4,
    }
})

export default FormChequeModal