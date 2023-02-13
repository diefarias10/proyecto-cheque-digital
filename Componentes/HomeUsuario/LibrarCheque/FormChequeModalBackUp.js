import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity, ScrollView, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet } from 'react-native';
import Cheque from '../Cheque/Cheque';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Contexto } from '../../../Storage/ContextoProvider';
import UserInput from '../../../UI/UserInput';
import Boton from '../../../UI/Boton';
import PALETA from '../../../Utilidades/Paleta';
import SERVICIOS from '../../../Utilidades/Servicios';
import PopupError from '../../../UI/PopupError';
import * as LocalAuthentication from 'expo-local-authentication';



const FormChequeModal = (props) => {
    const { data, setData } = useContext(Contexto);
    const tiposDoc = ['Cedula', 'Pasaporte']
    const [cuentasUsuario, setCuentasUsuario] = useState([])
    const [autenticacion, setAutenticacion] = useState(false)
    const [txtError, setTxtError] = useState('')
    const [mostrarPopupError, setMostrarPopupError] = useState(true)
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
        firmado: false,
    })

    useEffect(() => {
        obtengoCuentas(data.bancoID, data.cedula)
        setearFechaDia()
    }, [datosChequeNuevo.emision])


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
            firmado: false
        })
        setAutenticacion(false)
    }

    const confirmoChequeHandler = () => {

        if (datosChequeNuevo.firmado == true) {
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
                Firmado: datosChequeNuevo.firmado
            }

            props.agregarCheque(chequeNuevo);
            vaciarChequeNuevo();
            props.cerrarForm();

        } else {
            setMostrarPopupError(!mostrarPopupError)
            setTxtError('Falta la firma del cheque')
            setTimeout(() => {
                setMostrarPopupError(true)
            }, 2000);
        }

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

    const autenticacionUsuario = () => { // Controles biometricos para firmar cheque
        const auth = LocalAuthentication.authenticateAsync({
            promptMessage: 'Autenticación',
            fallbackLabel: 'Ingrese contraseña'
        })
        auth.then(result => {
            if (result.success == true) {
                setAutenticacion(result.success)
                setDatosChequeNuevo({ ...datosChequeNuevo, firmado: 1 })
            } 
        })
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


                            <TouchableOpacity style={estilos.btnCerrarForm} onPress={cancelarLibrado}>
                                <Ionicons name="close-circle-sharp" size={35} color='#FFF' />
                            </TouchableOpacity>

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
                                firmado={datosChequeNuevo.firmado}
                            />
                        </View>

                        <View style={{ width: '100%' }} >
                            <View style={estilos.panelBotonesForm}>

                                <TouchableOpacity style={estilos.btnConfirmarForm} onPress={confirmoChequeHandler}>
                                    <FontAwesome name="check" size={30} color="#FFF" />
                                    <Text style={{ color: '#FFF', fontSize: 15 }}>Confirmar</Text>
                                </TouchableOpacity>

                                {
                                    datosChequeNuevo.firmado ?
                                        <View />
                                        :
                                        <TouchableOpacity style={estilos.btnFirmar} onPress={autenticacionUsuario}>
                                            <FontAwesome5 name="signature" size={30} color="#FFF" />
                                            <Text style={{ color: '#FFF', fontSize: 15 }}>Firmar</Text>
                                        </TouchableOpacity>
                                }



                                <TouchableOpacity style={estilos.btnResetForm} onPress={vaciarChequeNuevo}>
                                    <FontAwesome name="refresh" size={30} color="#FFF" />
                                    <Text style={{ color: '#FFF', fontSize: 15 }}>Deshacer</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>

                <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>

                    <ScrollView style={[{ flex: 1, width: '100%' }]} horizontal={false} showsVerticalScrollIndicator={false} >
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


                            <UserInput label='Beneficiario' placeholder='Nombre y apellido' alineacion='center' onChange={cambiarBenef} />


                            <View style={{ marginVertical: 10 }}>
                                <Text style={estilos.formLabel} >
                                    Tipo de documento
                                </Text>
                                <View style={estilos.formInput}>
                                    <SelectDropdown
                                        data={tiposDoc}
                                        onSelect={(selectedItem, index) => {
                                            cambiarTipoDoc(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                        rowStyle={{ marginHorizontal: 10 }}

                                        dropdownStyle={{ borderRadius: 10 }}

                                        defaultButtonText='Seleccionar'

                                        buttonStyle={estilos.dropdownForm}

                                        buttonTextStyle={{ color: 'darkgrey' }}

                                        dropdownIconPosition='right'

                                        renderDropdownIcon={() => { return <Ionicons name="chevron-down" size={30} color={PALETA[2]} /> }}
                                    />
                                </View>
                            </View>

                            <UserInput label='Documento de beneficiario' teclado='numeric' placeholder='N° de documento' alineacion='center' onChange={cambiarNroDoc} />


                            <View style={{ marginVertical: 10 }}>
                                <Text style={estilos.formLabel} >
                                    Cuenta origen
                                </Text>
                                <View style={estilos.formInput}>
                                    <SelectDropdown
                                        data={cuentasUsuario.map((cuenta) => { return cuenta.ctaNumero })}
                                        onSelect={(selectedItem, index) => {
                                            cambiarCuentaCheque(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                        rowStyle={{ marginHorizontal: 10 }}

                                        dropdownStyle={{ borderRadius: 10 }}

                                        defaultButtonText='Seleccionar'

                                        buttonStyle={estilos.dropdownForm}

                                        buttonTextStyle={{ color: 'darkgrey' }}

                                        dropdownIconPosition='right'

                                        renderDropdownIcon={() => { return <Ionicons name="chevron-down" size={30} color={PALETA[2]} /> }}
                                    />
                                </View>
                            </View>


                            <UserInput label='Sucursal' placeholder='Nombre sucursal' alineacion='center' onChange={cambiarSuc} />

                            <UserInput label='Sucursal' teclado='numeric' placeholder='N° Sucursal' alineacion='center' onChange={cambiarNroSuc} />

                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
                <PopupError visible={mostrarPopupError} texto={txtError} />

            </SafeAreaView >
        </Modal >

    );
}

const estilos = StyleSheet.create({

    tabTitulo: {
        backgroundColor: PALETA[2],
        width: '100%',
        elevation: 10,
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
        backgroundColor: '#28a745',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingRight: 10,
        width: '25%',
        elevation: 10,
        shadowColor: PALETA[1],
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    btnCerrarForm: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnResetForm: {
        backgroundColor: PALETA[2],
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 15,
        paddingLeft: 10,
        width: '25%',
        elevation: 10,
        shadowColor: PALETA[1],
        shadowOffset: { width: -4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    btnFirmar: {
        backgroundColor: PALETA[3],
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 100,

        elevation: 10,
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    formContainer: {
        backgroundColor: PALETA[2],
        alignItems: 'center',
        elevation: 6,
       
        paddingTop: 10,
        paddingBottom: 0,
        paddingHorizontal: 10,
    },

    formInput: {
        backgroundColor: '#FFF',
        width: '100%',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
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
        height: 45,
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