import jwt from 'jsonwebtoken';

export default function (req, _, next) {
  const authorization = req.get('Authorization');

  if (authorization) {
    try {
      const token = authorization.split(' ')[1];
      const usuario = jwt.verify(token, process.env.SECRET);

      req.usuario = usuario; // Almacenar los datos de la autenticación en la request
    } catch (error) {
      console.log('Token inválido', error);
    }
  }

  return next();
}
