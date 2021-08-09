import { useReducer } from 'react';

import {
  // CREAR_ENLACE_ERROR,
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
import { subirArchivoApi, crearEnlaceApi } from '../../api/archivos';
import AppContext from './AppContext';
import AppReducer from './AppReducer';

export default function AppState({ children }) {
  const initialState = {
    mensajeArchivo: null,
    nombre: null,
    nombreOriginal: null,
    cargando: false,
    descargas: 1,
    password: null,
    autor: null,
    url: null,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const mostrarAlerta = (msg) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg,
    });

    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  const subirArchivo = async (acceptedFiles) => {
    dispatch({
      type: SUBIR_ARCHIVO,
    });

    const data = await subirArchivoApi(acceptedFiles);

    if (!data || !data?.ok)
      return dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: 'Error del servidor, vuelva a intentar',
      });

    dispatch({
      type: SUBIR_ARCHIVO_EXITO,
      payload: {
        nombre: data.archivo.filename,
        nombreOriginal: data.archivo.originalname,
      },
    });
  };

  const crearEnlace = async () => {
    const dataEnlace = {
      nombre: state.nombre,
      nombre_original: state.nombreOriginal,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    };

    const data = await crearEnlaceApi(dataEnlace);

    if (data?.ok) {
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: data.url,
      });
    }
    // } else {
    //   dispatch({
    //     type: LOGIN_ERROR,
    //     payload: data?.msg ? data.msg : 'Error del servidor',
    //   });
    // }
  };

  const limpiarState = () => {
    dispatch({
      type: LIMPIAR_STATE,
    });
  };

  const agregarPassword = (password) => {
    dispatch({
      type: AGREGAR_PASSWORD,
      payload: password,
    });
  };

  const agregarDescargas = (descargas) => {
    dispatch({
      type: AGREGAR_DESCARGAS,
      payload: +descargas,
    });
  };

  return (
    <AppContext.Provider
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
        subirArchivo,
        crearEnlace,
        limpiarState,
        agregarPassword,
        agregarDescargas,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
