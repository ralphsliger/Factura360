var express = require('express');

var userController = require('../controllers/userController');

var api = express.Router();

// paso el metodo del controlador a la ruta
api.post('/registrar', userController.registrar);

module.exports = api;