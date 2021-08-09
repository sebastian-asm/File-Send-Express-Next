import { getLocalToken } from './token';

export const subirArchivoApi = async (acceptedFiles) => {
  const formData = new FormData();
  formData.append('archivo', acceptedFiles[0]); // 'archivo' es la propiedad que recibe el backend

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/archivos`;
    const resp = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const crearEnlaceApi = async (dataEnlace) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/enlaces`;
    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(dataEnlace),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${getLocalToken()}`,
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verificarPasswordApi = async (url, password) => {
  try {
    const urlApi = `${process.env.NEXT_PUBLIC_API_URL}/enlaces/${url}`;
    const resp = await fetch(urlApi, {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
