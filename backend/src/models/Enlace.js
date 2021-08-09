import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const enlaceSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    nombre_original: {
      type: String,
      required: true,
    },
    descargas: {
      type: Number,
      default: 1,
    },
    autor: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export default model('Enlace', enlaceSchema);
