import {
  CREAR_ENLACE_ERROR,
  CREAR_ENLACE_EXITO,
  LIMPIAR_ALERTA,
  MOSTRAR_ALERTA,
  SUBIR_ARCHIVO_ERROR,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS,
} from '../../types';

export default function AppReducer(state, action) {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        mensajeArchivo: action.payload,
      };
    case LIMPIAR_ALERTA:
      return {
        ...state,
        mensajeArchivo: null,
      };
    case SUBIR_ARCHIVO:
      return {
        ...state,
        cargando: true,
      };
    case SUBIR_ARCHIVO_EXITO:
      return {
        ...state,
        nombre: action.payload.nombre,
        nombreOriginal: action.payload.nombreOriginal,
        cargando: false,
      };
    case SUBIR_ARCHIVO_ERROR:
      return {
        ...state,
        mensajeArchivo: action.payload,
        cargando: false,
      };
    case CREAR_ENLACE_EXITO:
      return {
        ...state,
        url: action.payload,
      };
    case LIMPIAR_STATE:
      return {
        ...state,
        mensajeArchivo: null,
        nombre: null,
        nombreOriginal: null,
        cargando: false,
        descargas: 1,
        password: null,
        autor: null,
        url: null,
      };
    case AGREGAR_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case AGREGAR_DESCARGAS:
      return {
        ...state,
        descargas: action.payload,
      };

    default:
      return state;
  }
}
