// https://github.com/nodejs/help/issues/2907
// Las variables de entorno __dirname y __filename no estan disponible
// para "type: module", se debe configurar con estas 2 importaciones
import { fileURLToPath } from 'url';
import path from 'path';

import fs from 'fs';

import { nanoid } from 'nanoid';
import { unlinkSync } from 'fs';
import multer from 'multer';

import Enlace from '../models/Enlace.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const folder = `${__dirname}/../uploads`;

export const subirArchivo = (req, res) => {
  // Si la carpeta de subidas no existe se crea
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  const multerConfig = {
    // Usuario autenticado límite de 10MB, no autenticado 1MB
    limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: multer.diskStorage({
      // req, file, cb
      destination: (_, __, cb) => cb(null, folder),
      filename: (_, file, cb) => {
        const nombreOriginal = file.originalname.split('.');
        const extension = nombreOriginal[nombreOriginal.length - 1];
        cb(null, `${nanoid()}.${extension}`);
      },
    }),
  };

  const upload = multer(multerConfig).single('archivo');

  upload(req, res, (error) => {
    if (error)
      return res.status(400).json({
        ok: false,
        msg: 'Error al subir el archivo',
      });

    res.json({
      ok: true,
      msg: 'Archivo subido exitosamente',
      archivo: req.file,
    });
  });
};

export const eliminarArchivo = (req, res) => {
  const { archivo } = req;

  try {
    unlinkSync(`${folder}/${archivo}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};

export const descargar = async (req, res, next) => {
  const { archivo } = req.params;
  const urlDownload = `${folder}/${archivo}`;
  // Content-Disposition: asumido en el método download de la response de express
  // Permite descargar archivo en dominios diferentes
  res.download(urlDownload);

  try {
    const enlace = await Enlace.findOne({ nombre: archivo });

    if (enlace.descargas === 1) {
      req.archivo = enlace.nombre;
      await Enlace.findOneAndRemove({ _id: enlace._id }); // Eliminar el enlace de la db
      next(); // Pasar al siguiente controlador para eliminar el archivo físicamente
    } else {
      enlace.descargas--;
      await enlace.save();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    });
  }
};
