import React, { useState, useContext, useEffect } from 'react';
import { Text, TextInput, View, FlatList, Modal, TouchableOpacity, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import estilos from '../../../Estilos/Estilos';
import Cheque from '../Cheque/Cheque';
import ChequeDetalle from '../Cheque/ChequeDetalle';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { Contexto } from '../../../Storage/ContextoProvider';


const FormChequeModal = (props) => {

    const monedas = ['$', 'U$S']
    const tiposDoc = ['CI', 'Pasaporte']
    const cuentas = []
    const { data, setData } = useContext(Contexto);
    const [datosChequeNuevo, setDatosChequeNuevo] = useState({
        tipoCheque: '1',
        monedaCheque: '',
        importeCheque: '',
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

    /* SE AGREGAN LOS Nº DE CUENTA EN UN ARRAY PARA MOSTRAR EN EL DROPDOWN */
    data.cuentas.forEach(element => {

        cuentas.push(element.numeroCta)

    })

    const vaciarChequeNuevo = () => {
        setDatosChequeNuevo({
            tipoCheque: '1',
            monedaCheque: '',
            importeCheque: '',
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


    const cambiarTipo = () => {
        if (datosChequeNuevo.tipoCheque === '1') {
            setDatosChequeNuevo({ ...datosChequeNuevo, tipoCheque: '2' })
        }
        else if (datosChequeNuevo.tipoCheque === '2') {
            setDatosChequeNuevo({ ...datosChequeNuevo, tipoCheque: '1' })
        }
    }

    const cambiarTipoDoc = (tipo) => {
        if (tipo === 'CI') {
            setDatosChequeNuevo({ ...datosChequeNuevo, benefTipoDoc: '1' })
        } else if (tipo === 'Pasaporte') {
            setDatosChequeNuevo({ ...datosChequeNuevo, benefTipoDoc: '2' })
        }

    }

    const cambiarMoneda = (moneda) => {

        if (moneda === '$') {
            setDatosChequeNuevo({ ...datosChequeNuevo, monedaCheque: '1' })
        } else if (moneda === 'U$S') {
            setDatosChequeNuevo({ ...datosChequeNuevo, monedaCheque: '2' })
        }
    }

    const cambiarCruzado = () => {
        setDatosChequeNuevo({ ...datosChequeNuevo, cruzado: !datosChequeNuevo.cruzado });
    }

    const cambiarNoALaOrden = () => {
        setDatosChequeNuevo({ ...datosChequeNuevo, noALaOrden: !datosChequeNuevo.noALaOrden })
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
        data.cuentas.forEach(element => {
            if (element.numeroCta === cuenta) {
                let nombre = element.nombreCta
                setDatosChequeNuevo({ ...datosChequeNuevo, ctaChequeNombre: nombre, ctaChequeNro: cuenta })
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
            <View style={{
                backgroundColor: '#7699D0', width: '100%', paddingTop: 5, elevation: 5, borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
            }}>
                <Text style={estilos.txtTituloForm}>
                    CHEQUE NUEVO
                </Text>
            </View>
            <View style={{ paddingHorizontal: 10, paddingBottom: 20}}>
                <Cheque
                    numero={datosChequeNuevo.nroCheque}
                    tipo={datosChequeNuevo.tipoCheque}
                    moneda={datosChequeNuevo.monedaCheque}
                    importe={datosChequeNuevo.importeCheque}
                    estado='NUEVO'
                    vencimiento={datosChequeNuevo.vencCheque}
                    librador={data.usuario}
                    beneficiario={datosChequeNuevo.benefCheque}
                    beneficiarioCI={datosChequeNuevo.benefNroDoc}
                    banda=''
                    visualizar={()=>{}}
                />
            </View>
            <ScrollView style={{ backgroundColor: 'white', borderTopRightRadius: 20,borderTopLeftRadius: 20, elevation: 10 }}>
                <View style={estilos.formContainer}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginVertical: 5, width: '95%', flexDirection: 'row' }}>
                            <CheckBox
                                iconleft
                                containerStyle={estilos.checkBoxForm}
                                textStyle={estilos.formLabel}
                                title='COMÚN'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={datosChequeNuevo.tipoCheque === '1' ? true : false}
                                onPress={cambiarTipo} />
                            <CheckBox
                                iconleft
                                containerStyle={estilos.checkBoxForm}
                                textStyle={estilos.formLabel}
                                title='DIFERIDO'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={datosChequeNuevo.tipoCheque === '2' ? true : false}
                                onPress={cambiarTipo} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginVertical: 5, width: '95%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <CheckBox
                                iconleft
                                containerStyle={estilos.checkBoxForm}
                                textStyle={estilos.formLabel}
                                title='CRUZADO'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={datosChequeNuevo.cruzado}
                                onPress={cambiarCruzado} />
                            <CheckBox
                                iconleft
                                containerStyle={estilos.checkBoxForm}
                                textStyle={estilos.formLabel}
                                title='NO A LA ORDEN'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={datosChequeNuevo.noALaOrden}
                                onPress={cambiarNoALaOrden} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginVertical: 5, width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '30%' }}>
                                <Text style={estilos.formLabel} >
                                    Moneda:
                                </Text>
                                <SelectDropdown
                                    data={monedas}
                                    defaultButtonText='Elegir...'
                                    buttonStyle={estilos.dropdownForm}
                                    onSelect={(selectedItem, index) => {

                                        cambiarMoneda(selectedItem)

                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {

                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {

                                        return item
                                    }}
                                />
                            </View>
                            <View style={{ width: '60%' }}>
                                <Text style={estilos.formLabel} >
                                    Importe:
                                </Text>
                                <TextInput name='importeCheque' placeholder="Importe del cheque" style={estilos.formInput} onChangeText={(importe) => cambiarImporte(importe)} />
                            </View>
                        </View>
                    </View>

                    {
                        datosChequeNuevo.tipoCheque === '2' ?
                            <View style={{ marginVertical: 5, width: '90%' }}>
                                <Text style={estilos.formLabel} >
                                    Vencimiento:
                                </Text>
                                <TextInput name='vencCheque' placeholder="DD/MM/AAAA" style={estilos.formInput} onChangeText={(venc) => cambiarVenc(venc)} />
                            </View>
                            :
                            <View></View>
                    }

                    <View style={{ marginVertical: 5, width: '90%' }}>
                        <Text style={estilos.formLabel} >
                            Beneficiario:
                        </Text>
                        <TextInput name='benefCheque' placeholder="Nombre y apellido" style={estilos.formInput} onChangeText={(nombre) => cambiarBenef(nombre)} />
                    </View>
                    <View style={{ marginVertical: 5, width: '90%' }}>
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
                        />
                    </View>
                    <View style={{ marginVertical: 5, width: '90%' }}>
                        <Text style={estilos.formLabel} >
                            Documento Beneficiario:
                        </Text>
                        <TextInput name='benefNroDoc' placeholder="Nº de documento" style={estilos.formInput} onChangeText={(numero) => cambiarNroDoc(numero)} />
                    </View>
                    <View style={{ marginVertical: 5, width: '90%' }}>
                        <Text style={estilos.formLabel} >
                            Cuenta a debitar:
                        </Text>
                        <SelectDropdown
                            data={cuentas}
                            defaultButtonText='Elegir...'
                            buttonStyle={{ borderRadius: 5, height: 40, backgroundColor: '#91b3f1' }}
                            onSelect={(selectedItem, index) => {
                                cambiarCuentaCheque(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {

                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {

                                return item
                            }}
                        />
                    </View>
                    <View style={{ marginVertical: 5, width: '90%' }}>
                        <Text style={estilos.formLabel} >
                            Sucursal:
                        </Text>
                        <TextInput name='sucursalCheque' placeholder="Nombre sucursal" style={estilos.formInput} onChangeText={(sucursal) => cambiarSuc(sucursal)} />
                    </View>
                    <View style={{ marginVertical: 5, width: '90%' }}>
                        <Text style={estilos.formLabel} >
                            Nº Sucursal:
                        </Text>
                        <TextInput name='sucursalNro' placeholder="Nº sucursal" style={estilos.formInput} onChangeText={(numero) => cambiarNroSuc(numero)} />
                    </View>
                    <View style={{ width: '90%' }} >
                        <View style={estilos.panelBotonesForm}>
                            <TouchableOpacity onPress={confirmoChequeHandler}>
                                <View>
                                    <FontAwesome name="check-circle" size={80} color="#1EA966" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={cancelarLibrado}>
                                <Entypo name="circle-with-cross" size={80} color="#ED4337" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
}

export default FormChequeModal