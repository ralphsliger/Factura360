var express = require('express');
var ventaController = require('../controllers/ventaController');

var api = express.Router();

api.post('/venta/registrar', ventaController.registrar);
api.get('/ventas/:id?', ventaController.listadoVentas);

module.exports = api; 