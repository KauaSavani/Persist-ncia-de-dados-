const {pool} = require('../config/db');

const produtoModel = {
    /**
     * Seleciona todos os produtos cadastrados na tabela
     */
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    /**
     * Seleciona um produto de acordo com o id_produto especificado
     * @param {number} pId
     */
    selecionarPorId: async (pId) => {
        const sql = 'SELECT * FROM produtos WHERE id_produto = ?;';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Inclui um item novo no banco de dados 
     * @param {string} pDescricao Descrição do produto
     * @param {number} pValor Valor do produto
     * @returns {Promise<Object>>} Retorna um objeto contendo propiedades que representam as informações do comando executado
     * @example
     * const produtos = await produtoModel.inserirProduto ('Produto teste', 16.99);
     * //saída
     * "result" : {
     * "fieldCount": 0, 
     * "affectedRows": 1,
     * "insertId": 11,
     * "info": "",
     * "server status": 2, 
     * "warningStatus": 0,
     * "changedRows": 0
     * }
     */

    inserirProduto: async (pDescricao, pValor) => {
        const sql = 'INSERT INTO produtos (descricao, valor) VALUES (?, ?);';
        const values = [pDescricao, pValor];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
   /**
     * Inclui um item novo no banco de dados 
     * @param {string} pDescricao
     * @param {number} pId
     * @param {number} pValor 
     * @returns {Promise<Object>>} Retorna um objeto contendo propiedades que representam as informações do comando executado
     * @example
     * const produtos = await produtoModel.inserirProduto (1, 'Produto teste', 16.99);
     * //saída
     * "result" : {
     * "fieldCount": 0, 
     * "affectedRows": 1,
     * "insertId": 0,
     * "info": "",
     * "server status": 2, 
     * "warningStatus": 0,
     * "changedRows": 1
     * }
     */

    alterarProduto: async (pId, pDescricao, pValor) => {
        const sql = 'UPDATE produtos SET descricao=?, valor=? WHERE id_produto=?';
        const values = [pDescricao,pValor, pId ]; ""
        const [rows] = await pool.query(sql, values);
        return rows;

    },

    deleteProduto: async (pId) => {
        const sql = 'DELETE FROM produtos WHERE id_produto =? ;';
        const values = [pId];
        const [rows]= await pool.query(sql, values);
        return rows;
    }
};

module.exports = {produtoModel};
