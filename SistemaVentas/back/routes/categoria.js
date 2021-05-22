var express = require('express');
var categoriaController = require('../controllers/categoriaController');

var api = express.Router();

api.post('/categoria/registrar', categoriaController.registrar);
api.get('/categoria/:id', categoriaController.obtener);
api.put('/categoria/editar/:id', categoriaController.editar);
api.delete('/categoria/eliminar/:id', categoriaController.eliminar);
api.get('/categorias/:titulo?', categoriaController.listar);
module.exports = api; 