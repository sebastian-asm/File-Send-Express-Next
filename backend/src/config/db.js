import mongoose from 'mongoose';

export default async function conexionDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Conexión a MongoDB');
  } catch (error) {
    console.log('Error al conectar a MongoDB', error);
    process.exit(1);
  }
}
