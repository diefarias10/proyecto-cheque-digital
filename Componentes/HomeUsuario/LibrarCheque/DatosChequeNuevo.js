import React, { useState } from "react";
import { useEffect } from "react";
import { View, Image, TouchableOpacity, Modal, StyleSheet, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import PALETA from "../../../Utilidades/Paleta";
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import UserInput from "../../../UI/UserInput";


const DatosChequeNuevo = ({
    visible,
    datosChequeNuevo,
    setDatosChequeNuevo,
    cuentasUsuario,
    cambiarCuentaCheque,
    cambiarBenef,
    tiposDoc,
    cambiarNroDoc,
    cambiarTipoDoc,
    cambiarImporte,
    cambiarSuc,
    cambiarNroSuc,
    setMostrarDatosCheque,
}) => {

    const [verPopup, setVerPopup] = useState(visible)

    useEffect(() => {
        setVerPopup(visible)
    }, [visible])


    return (

        <Modal transparent visible={verPopup} animationType='fade'>
            <View style={estilos.transparencia}>
                <TouchableOpacity style={estilos.btnCerrarPopup} onPress={() => { setMostrarDatosCheque(false) }}>
                    <Ionicons name="ios-close-circle-sharp" size={45} color={PALETA.error} />
                </TouchableOpacity>
                <View style={estilos.popup}>



                    <ScrollView showsVerticalScrollIndicator={false} >

                        <View style={{ marginVertical: 10 }}/* SECCION A */>
                            <Text style={estilos.seccionTitulo}>Detalles del cheque</Text>
                            <View style={estilos.seccion}>
                                <View style={estilos.selector}>
                                    <TouchableOpacity
                                        style={[estilos.btnSelectorIzq,
                                        { backgroundColor: datosChequeNuevo.tipoCheque == '1' ? PALETA[3] : '#FFF' },
                                        { borderColor: datosChequeNuevo.tipoCheque == '1' ? PALETA[3] : PALETA[3] }]}

                                        onPress={() => {
                                            setDatosChequeNuevo({ ...datosChequeNuevo, tipoCheque: '1', vencCheque: '' })
                                        }}>
                                        <Text style={[estilos.selectorBtnTxt, { color: datosChequeNuevo.tipoCheque == '1' ? '#FFF' : PALETA[2] }]}>Común</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[estilos.btnSelectorDer,
                                        { backgroundColor: datosChequeNuevo.tipoCheque == '2' ? PALETA[3] : '#FFF' },
                                        { borderColor: datosChequeNuevo.tipoCheque == '2' ? PALETA[3] : PALETA[3] }]}
                                        onPress={() => { setDatosChequeNuevo({ ...datosChequeNuevo, tipoCheque: '2' }) }}>
                                        <Text style={[estilos.selectorBtnTxt, { color: datosChequeNuevo.tipoCheque == '2' ? '#FFF' : PALETA[2] }]}>Diferido</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={estilos.selector}>
                                    <TouchableOpacity
                                        style={[estilos.btnSelectorIzq,
                                        { backgroundColor: datosChequeNuevo.monedaCheque == '1' ? PALETA[3] : '#FFF' },
                                        { borderColor: datosChequeNuevo.monedaCheque == '1' ? PALETA[3] : PALETA[3] }]}

                                        onPress={() => { setDatosChequeNuevo({ ...datosChequeNuevo, monedaCheque: '1' }) }}>
                                        <Text style={[estilos.selectorBtnTxt, { color: datosChequeNuevo.monedaCheque == '1' ? '#FFF' : PALETA[2] }]}>$ - Pesos</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[estilos.btnSelectorDer,
                                        { backgroundColor: datosChequeNuevo.monedaCheque == '2' ? PALETA[3] : '#FFF' },
                                        { borderColor: datosChequeNuevo.monedaCheque == '2' ? PALETA[3] : PALETA[3] }]}
                                        onPress={() => { setDatosChequeNuevo({ ...datosChequeNuevo, monedaCheque: '2' }) }}>
                                        <Text style={[estilos.selectorBtnTxt, { color: datosChequeNuevo.monedaCheque == '2' ? '#FFF' : PALETA[2] }]}>U$S - Dolares</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={estilos.selector}>
                                    <TouchableOpacity
                                        style={[estilos.btnSelectorIzq,
                                        { backgroundColor: datosChequeNuevo.cruzado == true ? PALETA[3] : '#FFF' },
                                        { borderColor: datosChequeNuevo.cruzado == true ? PALETA[3] : PALETA[3] }]}

                                        onPress={() => { setDatosChequeNuevo({ ...datosChequeNuevo, cruzado: !datosChequeNuevo.cruzado }) }}>
                                        <Text style={[estilos.selectorBtnTxt, { color: datosChequeNuevo.cruzado == true ? '#FFF' : PALETA[2] }]}>Cruzado //</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[estilos.btnSelectorDer,
                                        { backgroundColor: datosChequeNuevo.noALaOrden == true ? PALETA[3] : '#FFF' },
                                        { borderColor: datosChequeNuevo.noALaOrden == true ? PALETA[3] : PALETA[3] }]}
                                        onPress={() => { setDatosChequeNuevo({ ...datosChequeNuevo, noALaOrden: !datosChequeNuevo.noALaOrden }) }}>
                                        <Text style={[estilos.selectorBtnTxt, { color: datosChequeNuevo.noALaOrden == true ? '#FFF' : PALETA[2] }]}>No a la orden</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginVertical: 10 }} /* SECCION B */>
                            <Text style={estilos.seccionTitulo}>Valor del cheque</Text>
                            <View style={estilos.seccion}>
                                <View >
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

                                            buttonTextStyle={{ color: PALETA[1] }}

                                            dropdownIconPosition='right'

                                            renderDropdownIcon={() => { return <Ionicons name="chevron-down" size={30} color={PALETA[1]} /> }}
                                        />
                                    </View>

                                    <UserInput label='Importe' teclado='numeric' placeholder='Importe del cheque' alineacion='center' onChange={cambiarImporte} />
                                </View>
                            </View>
                        </View>

                        <View style={{ marginVertical: 10 }} /* SECCION C */>
                            <Text style={estilos.seccionTitulo}>Datos de beneficiario</Text>
                            <View style={estilos.seccion}>
                                <View >
                                    <UserInput label='Beneficiario' placeholder='Nombre y apellido' alineacion='center' onChange={cambiarBenef} />
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

                                            buttonTextStyle={{ color: PALETA[1] }}

                                            dropdownIconPosition='right'

                                            renderDropdownIcon={() => { return <Ionicons name="chevron-down" size={30} color={PALETA[1]} /> }}
                                        />
                                    </View>
                                    <UserInput label='Documento de beneficiario' teclado='numeric' placeholder='N° de documento' alineacion='center' onChange={cambiarNroDoc} />
                                </View>
                            </View>
                        </View>

                        <View style={{ marginVertical: 10 }} /* SECCION D */>
                            <Text style={estilos.seccionTitulo}>Datos de sucursal</Text>
                            <View style={estilos.seccion}>
                                <UserInput label='Sucursal' placeholder='Nombre sucursal' alineacion='center' onChange={cambiarSuc} />

                                <UserInput label='Sucursal' teclado='numeric' placeholder='N° Sucursal' alineacion='center' onChange={cambiarNroSuc} />
                            </View>
                        </View>

                    </ScrollView>

                </View>
            </View>
        </Modal>
    )
}

const estilos = StyleSheet.create({
    transparencia: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    popup: {
        backgroundColor: '#FFF',
        width: '95%',
        borderRadius: 20,
        marginVertical: 100,
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 20,
        shadowColor: PALETA[1],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },

    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    seccion: {
        borderTopWidth: 2,
        borderColor: PALETA[1],
        marginTop: 5,
        paddingVertical: 10
    },

    seccionTitulo: {
        color: PALETA[1],
        fontSize: 20,
        fontWeight: 'bold'
    },

    txtTitulo: {
        color: PALETA[1],
        fontWeight: 'bold',
        fontSize: 22
    },

    txtMensaje: {
        width: '100%',
        color: 'darkgrey',
        fontSize: 20,
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
        borderWidth: 1,
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
        borderWidth: 1,
        borderColor: PALETA[2],
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },

    formLabel: {
        marginBottom: 5,
        color: PALETA[1],
        fontSize: 14,
    },

    formInput: {
        backgroundColor: '#FFF',
        width: '100%',
        borderWidth: 1,
        borderColor: PALETA[1],
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        fontSize: 18,
    },

    dropdownForm: {
        borderRadius: 5,
        width: '100%',
        height: 45,
        backgroundColor: '#FFF',
    },

    btnCerrarPopup: {
        position: 'absolute',
        right: 12,
        bottom: 20,
        elevation: 4,
    },
})

export default DatosChequeNuevo