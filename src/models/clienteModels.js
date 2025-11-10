const { pool } = require('../config/db');

const clienteModel = {

    selecionarTodos: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    selecionarPorId: async (pIdCliente) => {
        const sql = 'SELECT * FROM clientes WHERE id_cliente = ?;';
        const values = [pIdCliente];
        const [rows] = await pool.query(sql, values);
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
    },

    alterarCliente: async (pIdCliente, pNome, pCPF) => {
        const sql = 'UPDATE clientes SET nome = ?, cpf = ? WHERE id_cliente = ?;';
        const values = [pNome, pCPF, pIdCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    deletarCliente: async (pIdCliente) => {
        const sql = 'DELETE FROM clientes WHERE id_cliente = ?;';
        const values = [pIdCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
};

module.exports = { clienteModel };
