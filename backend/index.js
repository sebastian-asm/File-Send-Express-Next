import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import archivos from './src/routes/archivos.js';
import auth from './src/routes/auth.js';
import conexionDB from './src/config/db.js';
import enlaces from './src/routes/enlaces.js';
import usuarios from './src/routes/usuarios.js';

const server = express();
const router = express.Router();

// Configuraciones
dotenv.config();
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));
server.use(express.static('src/uploads')); // Habilitar carpeta pública

// Conexión a mongoDB
conexionDB();

// Rutas
server.use('/api', router);
router.use('/usuarios', usuarios);
router.use('/auth', auth);
router.use('/enlaces', enlaces);
router.use('/archivos', archivos);

server.listen(process.env.PORT, () =>
  console.log(`Servidor en puerto ${process.env.PORT}`)
);
