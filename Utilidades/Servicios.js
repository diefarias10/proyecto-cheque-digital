const SERVICIOS = {
    LoginUsuario: 'http://192.168.1.9:8585/CHD_POC/com.echeq.aws_checklogin?', // (Cedula) , (Contraseña) , HB , (Banco ID)
    ChequesPersona: 'http://192.168.1.9:8585/CHD_POC/com.echeq.aws_chequespersonaget?', // (Pais ID) , (Tipo documento ID) , (Nro. documento)
    CuentasPersona: 'http://192.168.1.9:8585/CHD_POC/com.echeq.aws_bancocuentasget?', // (Banco ID) , (Cedula)
    ReservaNroCheque: 'http://192.168.1.9:8585/CHD_POC/com.echeq.ahttpreservanrocheque?', // (Banco ID) , (Cedula)
    AltaCheque: 'http://192.168.1.9:8585/CHD_POC/com.echeq.ahttpaltamovil?', //  (Datos del cheque nuevo)
    AnularCheque: 'http://192.168.1.9:8585/CHD_POC/com.echeq.ahttpanulocheque?', // (Banco ID) , (Cuenta cheque), (CMC7)
    HistoriaCheque: 'http://192.168.1.9:8585/CHD_POC/com.echeq.aws_chequeinfo?', // (CMC7), (1 = Solo beneficiarios, 2 = Solo estados)
    AceptoRechazo: 'http://192.168.1.9:8585/CHD_POC/com.echeq.ahttpbeneficiarioaccion?', // (CMC7), (Documento beneficiario) , (Aceptar = true, Rechazar = false)
    DepositoOnline: 'http://192.168.1.9:8585/CHD_POC/com.echeq.ahttpdepocheque?', // (CMC7), (Banco ID), (Nro. cuenta), (Titular de cuenta)
}

export default SERVICIOS