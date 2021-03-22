import React, { useReducer } from 'react';
import clienteAxios from './../../config/axios';
import appContext from './appContext';
import appReducer from './appReducer';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA, SUBIR_ARCHIVO, SUBIR_ARCHIVO_EXITO, SUBIR_ARCHIVO_ERROR, CREAR_ENLACE_EXITO, CREAR_ENLACE_ERROR, LIMPIAR_STATE } from './../../types/index';

const AppState = ({ children }) => {

    const initialState = {
        mensajeArchivo: null,
        nombre:  '',
        nombreOriginal: '',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(appReducer, initialState);

    //Muestra una alerta
    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        })

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA,
            })
        }, 3000)
    };

    //Sube los archivos al servidor
    const subirArchivos = async (formData, nombreArchivo) => {

        dispatch({
            type: SUBIR_ARCHIVO
        })

        try {
            const resultado = await clienteAxios.post('/api/archivos', formData);
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo,
                    nombreOriginal: nombreArchivo
                }
            })
        }
        catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    };

    //Crea enlace cuando se sube el archivo
    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombreOriginal: state.nombreOriginal,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }

        try {
            const resultado = await clienteAxios.post('/api/enlaces', data)
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            });
        } 
        catch (error) {
            console.log(error)
        }
    };

    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        })
    }
    
    return (
        <appContext.Provider
            value={{
                mensajeArchivo: state.mensajeArchivo,
                nombre: state.nombre,
                nombreOriginal: state.nombreOriginal,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivos,
                crearEnlace,
                limpiarState
            }}
        >
            {children}
        </appContext.Provider>
     );
}
 
export default AppState;