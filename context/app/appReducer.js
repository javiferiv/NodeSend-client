import { MOSTRAR_ALERTA, OCULTAR_ALERTA, SUBIR_ARCHIVO, SUBIR_ARCHIVO_EXITO, SUBIR_ARCHIVO_ERROR, CREAR_ENLACE_EXITO, CREAR_ENLACE_ERROR } from './../../types/index';

const appReducer = (state, action)  => {
    switch (action.type) {

        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensajeArchivo: action.payload
            }

        case OCULTAR_ALERTA:
            return {
                ...state,
                mensajeArchivo: null
            }
        
        case SUBIR_ARCHIVO:
            return {
                ...state,
                cargando: true
            }

        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombreOriginal: action.payload.nombreOriginal,
                cargando: null
            }
        
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                mensajeArchivo: action.payload,
                cargando: null

            }
        
        case CREAR_ENLACE_EXITO:
            return {
                ...state,
                url: action.payload
            }

        default:
            return state;
    }
}
 
export default appReducer;
