import { genSalt, hash } from 'bcrypt';
import { validationResult } from 'express-validator';

import Usuario from '../models/Usuario.js';

export const nuevoUsuario = async (req, res) => {
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
    let usuario = await Usuario.findOne({ email });

    if (usuario)
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya está registrado',
      });

    usuario = new Usuario(req.body);

    const salt = await genSalt(10);
    usuario.password = await hash(password, salt);

    await usuario.save();

    res.status(201).json({
      ok: true,
      msg: 'Usuario creado exitosamente',
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};
