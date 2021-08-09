export const registrarUsuarioApi = async (formData) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios`;
    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
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

export const iniciarSesionApi = async (formData) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
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
