// Comprobando si existe el objeto window (entorno cliente)
export const getLocalToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const setLocalToken = (token) =>
  typeof window !== 'undefined' ? localStorage.setItem('token', token) : null;

export const removeLocalToken = () =>
  typeof window !== 'undefined' ? localStorage.removeItem('token') : null;

export const tokenAuthApi = async (token) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
