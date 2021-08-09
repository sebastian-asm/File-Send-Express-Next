import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import AppContext from '../context/app/AppContext';
import AuthContext from '../context/auth/AuthContext';

export default function Header() {
  const router = useRouter();
  const { usuario, usuarioAutenticado, cerrarSesion } = useContext(AuthContext);
  const { limpiarState } = useContext(AppContext);

  // Verificando si hay una sesión abierta
  useEffect(() => {
    if (localStorage.getItem('token')) usuarioAutenticado();
  }, []);

  const redireccionar = () => {
    router.push('/');
    limpiarState();
  };

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <img
        onClick={redireccionar}
        className="w-64 mb-8 md:mb-0 cursor-pointer"
        src="/logo.svg"
        alt="Logo"
      />

      <div>
        {usuario ? (
          <div className="flex items-center">
            <p className="mr-3 text-xl">
              Bienvenido! <span className="font-bold">{usuario.nombre}</span>
            </p>

            <button
              onClick={() => cerrarSesion()}
              className="bg-gray-800 px-5 py-3 rounded-lg text-white font-bold uppercase"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">
                Iniciar sesión
              </a>
            </Link>

            <Link href="/crearcuenta">
              <a className="bg-gray-800 px-5 py-3 rounded-lg text-white font-bold uppercase">
                Crear cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
