import { check } from 'express-validator';
import { Router } from 'express';

import { nuevoUsuario } from '../controllers/usuarioController.js';

const usuarios = Router();

usuarios.post(
  '/',
  [
    check('nombre', 'El nombre es necesario').escape().trim().notEmpty(),
    check('email', 'El email válido es necesario').escape().trim().isEmail(),
    check('password', 'La contraseña debe tener mínimo 6 carácteres')
      .escape()
      .trim()
      .isLength({ min: 6 }),
  ],
  nuevoUsuario
);

export default usuarios;
