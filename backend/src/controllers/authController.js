import { compareSync } from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import Usuario from '../models/Usuario.js';

export const autenticarUsuario = async (req, res) => {
  // Validación
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({
      ok: false,
      msg: 'Error de validación',
      errores: errores.array(),
    });

  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario)
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe',
      });

    if (!compareSync(password, usuario.password))
      return res.status(401).json({
        ok: false,
        msg: 'Credenciales inválidas',
      });

    // Creación del token de autenticación
    const token = jwt.sign(
      { _id: usuario._id, nombre: usuario.nombre },
      process.env.SECRET,
      { expiresIn: '5h' }
    );

    res.json({
      ok: true,
      msg: 'Autenticación exitosa',
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};

export const usuarioAutenticado = (req, res) => {
  const { usuario } = req;

  if (usuario) {
    res.json({
      ok: true,
      msg: 'Usuario autenticado',
      usuario,
    });
  } else {
    res.status(400).json({
      ok: false,
      msg: 'Error al autenticar',
    });
  }
};
