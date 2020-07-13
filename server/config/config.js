//constantes y variables de forma global

//Puerto
process.env.PORT = process.env.PORT || 3000;


//Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//Vencimiento del token
process.env.CADUCIDAD_TOKEN = '48h';


//SEED de autenticacion
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//Base de datos

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//Google client id

process.env.CLIENT_ID = process.env.CLIENT_ID || '96217794840-gu8n9j27f7nqkjl63hj8v2p2u7vf52ak.apps.googleusercontent.com';