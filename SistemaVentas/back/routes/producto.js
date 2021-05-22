var express = require('express');

var productoController = require('../controllers/productoController');

var multipart = require('connect-multiparty');


var path = multipart({uploadDir: './uploads/productos'});

var api = express.Router();

// paso el metodo del controlador a la ruta
api.post('/producto/registrar',path, productoController.registrar);
api.get('/productos/:titulo?', productoController.listar); //puedes ver todos o uno en especifico 
api.put('/producto/editar/:id',path, productoController.editar );
api.get('/producto/registro/:id', productoController.getProducto);
module.exports = api;