import { REGISTRO_EXITOSO, REGISTRO_ERROR, OCULTAR_ALERTA, LOGIN_EXITO, LOGIN_ERROR, USUARIO_AUTENTICADO, CERRAR_SESION } from './../../types/index';

const authReducer = (state, action) => {
    switch (action.type) {

        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        
        case LOGIN_EXITO:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                autenticado: true
            }
        
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true
            }
        
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                usuario: null,
                token: null,
                autenticado: null,
            }
        
        case OCULTAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }
         
        default:
            return state;
    }
}

export default authReducer;