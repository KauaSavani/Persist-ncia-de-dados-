const express = require('express');
const clienteRoutes = express.Router();

const {clienteController} = require('../controllers/clienteController');

clienteRoutes.get('/cliente', clienteController.buscarTodosclientes);
clienteRoutes.post('/cliente', clienteController.criarCliente);
clienteRoutes.put('/cliente/:idCliente', clienteController.atualizarCliente);
clienteRoutes.get('/cliente/buscar', clienteController.buscarClientePorId);
clienteRoutes.delete('/cliente/:idCliente', clienteController.deletarCliente);


module.exports = { clienteRoutes };
