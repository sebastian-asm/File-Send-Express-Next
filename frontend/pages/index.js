import { useContext } from 'react';
import Link from 'next/link';

import Alerta from '../components/Alerta';
import AppContext from '../context/app/AppContext';
import Dropzone from '../components/Dropzone';
import Layout from '../components/Layout';

export default function Home() {
  const { mensajeArchivo, url } = useContext(AppContext);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
            <p className="text-center text-2xl">
              La URL es:{' '}
              <span className="font-bold block">{`${location.origin}/enlaces/${url}`}</span>
            </p>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `${location.origin}/enlaces/${url}`
                )
              }
              type="button"
              className="bg-blue-500 w-full py-3 rounded-lg text-white hover:bg-blue-600 mt-5"
            >
              Copiar enlace
            </button>
          </>
        ) : (
          <>
            {mensajeArchivo && <Alerta mensaje={mensajeArchivo} />}

            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-3xl font-sans font-bold text-gray-700 my-4">
                  Comparte archivos de forma sencilla y privada
                </h2>
                <p className="text-lg leading-loose mb-5">
                  <span className="text-red-500 font-bold">NodeSend</span> te
                  permite compartir archivos con cifrado de extremo a extremo y
                  un archivo que es eliminado después de ser descargado. Así que
                  puedes mantener lo que compartes en privado y asegurarte de
                  que tus cosas no permanezcan en línea para siempre.
                </p>
                <Link href="/crearcuenta">
                  <a className="text-red-500 font-bold text-lg hover:text-red-700">
                    Crea una cuenta para mayores beneficios
                  </a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
