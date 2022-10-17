import React, { useState, createContext } from 'react';

const Contexto = createContext();

const ContextoProvider = ({ children }) => {

    const [data, setData] = useState({ usuario: '', tipoUsuario: '', banco: '', cuentas: [] })

    return (
        <Contexto.Provider value={{ data, setData }}>
            {children}
        </Contexto.Provider>

    );
}

export {Contexto, ContextoProvider}