import { useReducer } from 'react';

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
} from '../../types';
import {
  getLocalToken,
  setLocalToken,
  tokenAuthApi,
  removeLocalToken,
} from '../../api/token';
import { registrarUsuarioApi, iniciarSesionApi } from '../../api/usuarios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

export default function AuthState({ children }) {
  const initialState = {
    token: getLocalToken(),
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registrarUsuario = async (formData) => {
    const data = await registrarUsuarioApi(formData);

    if (data?.ok) {
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: data.msg,
      });
    } else {
      dispatch({
        type: REGISTRO_ERROR,
        payload: data?.msg ? data.msg : 'Error del servidor',
      });
    }

    limpiarAlerta();
  };

  const iniciarSesion = async (formData) => {
    const data = await iniciarSesionApi(formData);

    if (data?.ok) {
      setLocalToken(data.token);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: data.token,
      });
    } else {
      dispatch({
        type: LOGIN_ERROR,
        payload: data?.msg ? data.msg : 'Error del servidor',
      });
    }

    limpiarAlerta();
  };

  const usuarioAutenticado = async () => {
    const token = getLocalToken();

    if (token) {
      const data = await tokenAuthApi(token);
      if (data.ok) {
        dispatch({
          type: USUARIO_AUTENTICADO,
          payload: data.usuario,
        });
      }
    }
  };

  const cerrarSesion = () => {
    removeLocalToken();
    dispatch({
      type: CERRAR_SESION,
    });
  };

  // Limpiar alerta despúes de 3 segundos
  const limpiarAlerta = () => {
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
