# File Send

Clon de Firefox Send, utilizando Express y MongoDB por el lado del backend, y NextJS en el frontend. La app permite subir archivos y para luego generar un link de descarga. Un usuario registrado podrá indicar el número de descargas y una contraseña antes de descargar el archivo. Las rutas se crean dinámicamente cuando son solicitadas por el usuario.

## Dependencias principales

**Backend (ExpressJS)**

1. express-validator
2. bcrypt
3. jsonwebtoken
4. mongoose
5. multer
6. nanoid
7. dotenv
8. cors

**Frontend (NextJS)**

1. tailwind
2. formik
3. yup
