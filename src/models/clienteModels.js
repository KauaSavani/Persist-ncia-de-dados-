const { pool } = require('../config/db');

const clienteModel = {

    selecionarTodos: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    buscarCPF: async (pCPF) => {
        const sql = 'SELECT * FROM clientes WHERE cpf = ?;';
        const values = [pCPF];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    incluirCliente: async (pNome, pCPF) => {
        const sql = 'INSERT INTO clientes (nome, cpf) VALUES (?, ?);';
        const values = [pNome, pCPF];
        const [rows] = await pool.query(sql, values);
        return rows;
    }

};

module.exports = { clienteModel };
