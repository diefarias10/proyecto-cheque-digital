import React, { useState, createContext } from 'react';

const Contexto = createContext();

const ContextoProvider = ({ children }) => {

    const [data, setData] = useState({ usuario: '', tipoUsuario: '', banco: ''})
    const [refrescar, setRefrescar] = useState(true)

    return (
        <Contexto.Provider value={{ data, setData, refrescar, setRefrescar }}>
            {children}
        </Contexto.Provider>

    );
}

export {Contexto, ContextoProvider}