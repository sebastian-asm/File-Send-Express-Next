import { useState, useContext } from 'react';

import AppContext from '../context/app/AppContext';

export default function Formulario() {
  const { agregarPassword, agregarDescargas } = useContext(AppContext);
  const [checkPassword, setCheckPassword] = useState(false);

  return (
    <div className="w-full mt-10">
      <div>
        <label className="text-lg text-gray-700">Eliminar despúes de:</label>
        <select
          onChange={({ target }) => agregarDescargas(target.value)}
          className="appearance-none w-full mt-2 bg-white border border-gray-300 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-400"
        >
          <option defaultValue disabled>
            -- Seleccionar --
          </option>
          <option value="5">5 descargas</option>
          <option value="10">10 descargas</option>
          <option value="25">25 descargas</option>
          <option value="50">50 descargas</option>
        </select>
      </div>

      <div className="mt-5">
        <div>
          <label className="text-lg text-gray-700">
            <input
              onChange={() => setCheckPassword(!checkPassword)}
              type="checkbox"
              className="mr-3"
            />
            Proteger con contraseña
          </label>
        </div>

        {checkPassword && (
          <input
            onChange={({ target }) => agregarPassword(target.value)}
            type="password"
            className="appearance-none w-full mt-2 bg-white border border-gray-300 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-400"
          />
        )}
      </div>
    </div>
  );
}
