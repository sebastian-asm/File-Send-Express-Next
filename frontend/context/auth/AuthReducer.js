import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
} from '../../types';

export default function AuthReducer(state, action) {
  switch (action.type) {
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
    case REGISTRO_EXITOSO:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LOGIN_EXITOSO:
      return {
        ...state,
        token: action.payload,
        autenticado: true,
      };
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
      };
    case CERRAR_SESION:
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: null,
      };
    case LIMPIAR_ALERTA:
      return {
        ...state,
        mensaje: null,
      };

    default:
      return state;
  }
}
