import React, { useState, createContext } from 'react';

const Contexto = createContext();

const ContextoProvider = ({ children }) => {

    const [data, setData] = useState({ usuario: '', tipoUsuario: '', banco: ''})
    const [refrescar, setRefrescar] = useState(true)
    const [soportaBiometria, setSoportaBiometria] = useState(false)

    return (
        <Contexto.Provider value={{ data, setData, refrescar, setRefrescar, soportaBiometria, setSoportaBiometria }}>
            {children}
        </Contexto.Provider>

    );
}

export {Contexto, ContextoProvider}