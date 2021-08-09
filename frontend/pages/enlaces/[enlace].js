import { useState, useContext } from 'react';

import { verificarPasswordApi } from '../../api/archivos';
import AppContext from '../../context/app/AppContext';
import Alerta from '../../components/Alerta';
import Layout from '../../components/Layout';

export default function Enlaces({ enlace, password }) {
  const { mensajeArchivo, mostrarAlerta } = useContext(AppContext);
  const [tienePassword, setTienePassword] = useState(password);
  const [ingresaPassword, setIngresaPassword] = useState('');
  const { nombre, url } = enlace;

  const verificarPassword = async (e) => {
    e.preventDefault();
    const data = await verificarPasswordApi(url, ingresaPassword);

    if (!data || !data.ok) mostrarAlerta(data?.msg || 'Error del Servidor');
    if (data.ok) setTienePassword(data.password);
  };

  return (
    <Layout>
      {tienePassword ? (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Enlace protegido con contraseña
          </h1>

          {mensajeArchivo && <Alerta mensaje={mensajeArchivo} />}

          <div className="w-full max-w-lg mt-10 m-auto">
            <form
              onSubmit={verificarPassword}
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            >
              <label
                htmlFor="password"
                className="block text-black text-sm font-bold mb-2"
              >
                Ingresar contraseña:
              </label>
              <input
                onChange={({ target }) => setIngresaPassword(target.value)}
                value={ingresaPassword}
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none"
              />

              <button
                type="submit"
                className="bg-red-400 hover:bg-gray-700 w-full p-3 text-white font-bold mt-6 rounded-lg"
              >
                Validar contraseña
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo
          </h1>
          <div className="flex items-center justify-center mt-10">
            {/* Atributo download del "a" solo funciona cuando esta dentro del mismo dominio */}
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/archivos/${nombre}`}
              className="bg-red-400 text-center px-10 py-3 text-white rounded-lg uppercase font-bold cursor-pointer hover:bg-red-500"
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  );
}

// Para generar las rutas estáticas dinámicas
export async function getStaticPaths() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/enlaces`;
  const resp = await fetch(url);
  const { enlaces } = await resp.json();

  if (enlaces) {
    return {
      paths: enlaces.map((enlace) => ({
        params: {
          // "enlace" debe corresponder con el nombre del archivo "[enlace]"
          enlace: enlace.url,
        },
      })),
      fallback: 'blocking', // Creando las rutas bajo demanda
    };
  }
}

// Es la respuesta que obtenemos del backend
export async function getStaticProps({ params }) {
  const { enlace } = params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/enlaces/${enlace}`;
  const resp = await fetch(url);
  const data = await resp.json();

  return {
    props: {
      enlace: data.enlace,
      password: data.password || false,
    },
    revalidate: 1,
  };
}
