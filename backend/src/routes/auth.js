import { Router } from 'express';
import { check } from 'express-validator';

import {
  autenticarUsuario,
  usuarioAutenticado,
} from '../controllers/authController.js';
import authorization from '../middlewares/auth.js';

const auth = Router();

auth.get('/', authorization, usuarioAutenticado);

auth.post(
  '/',
  [
    check('email', 'El email válido es necesario').escape().trim().isEmail(),
    check('password', 'La contraseña es necesaria').escape().trim().notEmpty(),
  ],
  autenticarUsuario
);

export default auth;
