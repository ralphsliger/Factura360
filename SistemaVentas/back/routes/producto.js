var express = require('express');

var productoController = require('../controllers/productoController');

var multipart = require('connect-multiparty');


var path = multipart({uploadDir: './uploads/productos'});

var api = express.Router();

// paso el metodo del controlador a la ruta
api.post('/producto/registrar', productoController.registrar);

module.exports = api;