import { customAlphabet } from 'nanoid';
import { genSalt, hash, compareSync } from 'bcrypt';
import { validationResult } from 'express-validator';

import { alphabet } from '../config/constants.js';
import Enlace from '../models/Enlace.js';

export const nuevoEnlace = async (req, res) => {
  // Validación
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({
      ok: false,
      msg: 'Error de validación',
      errores: errores.array(),
    });

  const nanoid = customAlphabet(alphabet, 9);
  const { nombre_original, nombre } = req.body;
  const enlace = new Enlace();

  // Si existe un usuario autenticado
  if (req.usuario) {
    const { password, descargas } = req.body;
    const { _id } = req.usuario;

    if (password) {
      const salt = await genSalt(10);
      enlace.password = await hash(password, salt);
    }

    if (descargas) enlace.descargas = descargas;

    enlace.autor = _id;
  }

  // Creación del enlace
  enlace.url = nanoid();
  enlace.nombre = nombre;
  enlace.nombre_original = nombre_original;

  try {
    await enlace.save();

    res.status(201).json({
      ok: true,
      msg: 'Enlace generado exitosamente',
      url: enlace.url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};

export const obtenerEnlace = async (req, res, next) => {
  const { url } = req.params;

  try {
    const enlace = await Enlace.findOne({ url });

    if (!enlace)
      return res.status(404).json({
        ok: false,
        msg: 'El enlace no existe',
      });

    res.json({
      ok: true,
      password: false,
      enlace,
    });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};

export const obtenerTodosEnlaces = async (req, res) => {
  try {
    const enlaces = await Enlace.find().select('url');
    res.json({
      ok: true,
      msg: 'Todos los enlaces',
      enlaces,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};

export const tienePassword = async (req, res, next) => {
  const { url } = req.params;

  try {
    const enlace = await Enlace.findOne({ url });

    if (!enlace)
      return res.status(404).json({
        ok: false,
        msg: 'El enlace no existe',
      });

    if (enlace.password)
      return res.json({
        ok: true,
        password: true,
        enlace,
      });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};

export const verificarPassword = async (req, res, next) => {
  const { password } = req.body;
  const { url } = req.params;

  try {
    const enlace = await Enlace.findOne({ url });

    if (compareSync(password, enlace.password)) {
      next();
    } else {
      res.status(401).json({
        ok: false,
        password: false,
        msg: 'La contraseña es incorrecta',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};
