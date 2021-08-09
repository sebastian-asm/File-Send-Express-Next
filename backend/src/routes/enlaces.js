import { Router } from 'express';
import { check } from 'express-validator';

import {
  nuevoEnlace,
  obtenerEnlace,
  obtenerTodosEnlaces,
  tienePassword,
  verificarPassword,
} from '../controllers/enlaceController.js';
import { eliminarArchivo } from '../controllers/archivosController.js';
import authorization from '../middlewares/auth.js';

const enlaces = Router();

enlaces.get('/', obtenerTodosEnlaces);

enlaces.get('/:url', tienePassword, obtenerEnlace);

enlaces.post('/:url', verificarPassword, obtenerEnlace);

enlaces.post(
  '/',
  [
    check('nombre', 'Debe agregar un archivo').notEmpty(),
    check('nombre_original', 'Debe agregar un archivo').notEmpty(),
  ],
  authorization,
  nuevoEnlace
);

export default enlaces;
