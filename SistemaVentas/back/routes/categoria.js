var express = require('express');
var categoriaController = require('../controllers/categoriaController');

var api = express.Router();

api.post('/categoria/registrar', categoriaController.registrar);
api.get('/categoria/:id', categoriaController.obtener_categoria);
module.exports = api; 