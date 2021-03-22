import React, { useReducer } from 'react';
import clienteAxios from './../../config/axios';
import tokenAuth from './../../config/tokenAuth';
import authContext from './authContext';
import authReducer from './authReducer';
import { REGISTRO_EXITOSO, REGISTRO_ERROR, OCULTAR_ALERTA, LOGIN_EXITO, LOGIN_ERROR, USUARIO_AUTENTICADO, CERRAR_SESION } from './../../types/index';

const AuthState = ({ children }) => {
    
    //Definir state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    //Definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Registrar nuevos usuarios
    const registrarUsuarios = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            })
        }
        catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }

        //Limpiar la alerta después de 3 segundos
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000)
    };

    //Autenticar Usuarios
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITO,
                payload: respuesta.data.token
            })
        }
        catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000)
    };

    //Retonar usuario autenticado en base al JWT
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token)
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: respuesta.data.usuario
            })
        }
        catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    };

    //Cerrar la sesión
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION,
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuarios,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;