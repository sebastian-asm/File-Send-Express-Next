// useCallback permite evitar renderizado innecesarios del componente
// sobre todo cuando la barra de progreso de la subida esta en funcionamiento
import { useCallback, useContext } from 'react';

import { useDropzone } from 'react-dropzone';

import AppContext from '../context/app/AppContext';
import AuthContext from '../context/auth/AuthContext';
import Formulario from '../components/Formulario';

export default function Dropzone() {
  const { autenticado } = useContext(AuthContext);
  const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = useContext(
    AppContext
  );

  // Se ejecuta solo cuando los archivos son aceptados por el backend
  const onDropAccepted = useCallback((acceptedFiles) => {
    subirArchivo(acceptedFiles);
  }, []);

  const onDropRejected = () => {
    mostrarAlerta('Error al subir, el archivo supera el límite permitido');
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1024 * 1024 });

  const archivos = acceptedFiles.map((archivo) => (
    <li
      key={archivo.lastModified}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded text-center"
    >
      <p className="font-bold text-xl">{archivo.name}</p>
      <p className="text-sm text-gray-500">
        {(archivo.size / Math.pow(1024, 2)).toFixed(3)} MB
      </p>
    </li>
  ));

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-blue-300 border-2 bg-blue-50 rounded-lg p-3">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">
            {cargando ? 'Subiendo archivo...' : 'Archivo subido'}
          </h4>
          <ul>{archivos}</ul>

          {autenticado && <Formulario />}

          {!cargando && (
            <button
              onClick={crearEnlace}
              type="button"
              className="bg-blue-500 w-full py-3 rounded-lg text-white hover:bg-blue-600 mt-5"
            >
              Crear enlace
            </button>
          )}
        </div>
      ) : (
        <div
          {...getRootProps({
            className: 'dropzone w-full py-32 cursor-pointer',
          })}
        >
          <input {...getInputProps()} className="h-100" />
          {isDragActive ? (
            <p className="text-xl text-center text-gray-500">
              Suelte el archivo aquí
            </p>
          ) : (
            <div className="text-center">
              <p className="text-xl text-center text-gray-500">
                Selecciona un archivo o arrastralo aquí
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
