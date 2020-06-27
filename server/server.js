require('./config/config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Consultar registros
app.get('/usuario', function(req, res) {
    res.json('get Usuario')
})

//Crear nuevos registros
app.post('/usuario', function(req, res) {

    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });
    }
})

//PUT actualiza registros
app.put('/usuario/:id', function(req, res) {

    //ejemplo: localhost:3000/usuario/jhcfghjsdvjv corresponde a un id el jhcfghjsdvjv
    //se captura con req.params.id el id es el que se recibe de l :id
    let id = req.params.id;
    //lo muestro en formato json
    res.json({
        id //o id = id
    })
})

//Delete
app.delete('/usuario', function(req, res) {
    res.json('delete Usuarios')
})

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', 3000);
});