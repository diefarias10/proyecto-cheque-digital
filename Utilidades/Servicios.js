const SERVICIOS = {
    LoginUsuario: 'http://192.168.1.9:8585/CHD_POC/com.echeq.aws_checklogin?', // (Cedula) , (Contraseña) , HB , (Banco ID)
    ChequesPersona: 'http://192.168.1.9:8585/CHD_POC/com.echeq.aws_chequespersonaget?', // (Pais ID) , (Tipo documento ID) , (Nro. documento)
    CuentasPersona: 'http://192.168.1.9:8585/CHD_POC/com.echeq.aws_bancocuentasget?', // (Banco ID) , (Cedula)
    ReservaNroCheque: 'http://192.168.1.9:8585/CHD_POC/com.echeq.ahttpreservanrocheque?', // (Banco ID) , (Cedula)
    AltaCheque: 'http://192.168.1.9:8585/CHD_POC/com.echeq.ahttpaltamovil?', //  (Datos del cheque nuevo)
    AnularCheque: 'http://192.168.1.9:8585/CHD_POC/com.echeq.ahttpanulocheque?', // (Banco ID) , (Cuenta cheque), (CMC7)
}

export default SERVICIOS