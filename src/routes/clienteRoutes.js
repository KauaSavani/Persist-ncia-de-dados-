const express = require('express');
const clienteRoutes = express.Router();

const { clienteController } = require('../controllers/clienteController');


clienteRoutes.get('/cliente', clienteController.buscarTodosclientes);
clienteRoutes.post('/cliente', clienteController.criarCliente);

module.exports = { clienteRoutes };