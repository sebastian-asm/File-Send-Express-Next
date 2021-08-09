import { Router } from 'express';

import {
  subirArchivo,
  eliminarArchivo,
  descargar,
} from '../controllers/archivosController.js';
import auth from '../middlewares/auth.js';

const archivos = Router();

archivos.get('/:archivo', descargar, eliminarArchivo);

archivos.post('/', auth, subirArchivo);

export default archivos;
