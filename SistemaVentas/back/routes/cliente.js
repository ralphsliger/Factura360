var express = require('express');
var clienteController = require('../controllers/clienteController');


var api = express.Router();

api.post('/cliente/registrar', clienteController.registrar);
api.put('/cliente/editar/:id', clienteController.editar);
api.delete('/cliente/eliminar/:id', clienteController.eliminar);

module.exports = api; 