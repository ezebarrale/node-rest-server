const express = require('express');
const Categoria = require('../models/categoria');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();

//todas las categorias
app.get('/categoria', verificaToken, function(req, res) {

    Categoria.find({}, '_id descripcion')
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });
        });

});

//Mostar una categoria por ID
app.get('/categoria/:id', verificaToken, function(req, res) {

    let id = req.params.id;

    Categoria.findById(id, '_id descripcion', (err, categoria) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoria) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            categoria
        })
    });

});

//Crear nueva categoria
app.post('/categoria', verificaToken, function(req, res) {

    let usuarioId = req.usuario._id

    let categoria = new Categoria({
        descripcion: req.body.descripcion,
        usuario: usuarioId
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    });

});

//Actualizar una categoria
app.put('/categoria/:id', verificaToken, function(req, res) {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        //lo muestro en formato json
        res.json({
            //id //o id = id
            ok: true,
            categoria: categoriaDB
        });
    });
})

//Eliminacion fisica de una categoria (solo un ADMIN)
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada.'
                }
            });
        };

        res.json({
            ok: true,
            message: 'Categoria borrada'
                //categoria: categoriaBorrada
        });
    });
});

module.exports = app;