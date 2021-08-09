import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useFormik } from 'formik';
import * as yup from 'yup';

import Alerta from '../components/Alerta';
import AuthContext from '../context/auth/AuthContext';
import Layout from '../components/Layout';

export default function login() {
  const router = useRouter();
  const { mensaje, autenticado, iniciarSesion } = useContext(AuthContext);

  useEffect(() => {
    if (autenticado) router.push('/');
  }, [autenticado]);

  const formik = useFormik({
    initialValues: {
      email: 'seba@seba.com',
      password: '123456',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('El email no es válido')
        .required('El email es necesario'),
      password: yup.string().required('La contraseña es importante'),
    }),
    onSubmit: (formData) => {
      iniciarSesion(formData);
    },
  });

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          Iniciar sesión
        </h2>

        {mensaje && <Alerta mensaje={mensaje} />}

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                  className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none"
                  id="email"
                />

                {formik.touched.email && formik.errors.email && (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-400 text-red-700 p-4">
                    <p>{formik.errors.email}</p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none"
                  id="password"
                />

                {formik.touched.password && formik.errors.password && (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-400 text-red-700 p-4">
                    <p>{formik.errors.password}</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-red-400 hover:bg-gray-700 w-full p-3 text-white font-bold mt-6 rounded-lg"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
