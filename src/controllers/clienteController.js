
const { clienteModel, clienteModels } = require('../models/clienteModels');

const clienteController = {

    buscarTodosclientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selecionarTodos();

            if (resultado.length === 0) {
                return res.status(200).json({ message: 'a tabela selecionada não contém dados' });
            }

            res.status(200).json({ message: 'resultado dos dados listados', data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'ocorreu um erro no servidor.',
                errorMessage: error.message
            });
        }
    },


    criarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente } = req.body;

            // validação na criação e dos dados fornecidos
            if (!nomeCliente || nomeCliente.length < 3 || cpfCliente.length !== 11) {
                return res.status(400).json({ message: 'dados inválidos. Verifique nome e CPF.' });
            }

            // verifição do cpf no banco 
            const cpfExistente = await clienteModel.buscarCPF(cpfCliente);

            if (cpfExistente && cpfExistente.length > 0) {
                return res.status(409).json({ mensagem: 'CPF já está cadastrado' });
            }

            // hora de incluir clientes depois das verificações chegar no resultado
            const resultado = await clienteModel.incluirCliente(nomeCliente, cpfCliente);

            if (resultado.affectedRows === 1 && resultado.insertId !== 0) {
                res.status(201).json({ message: 'cliente incluído com sucesso', result: resultado });
            } else {
                throw new Error('ocorreu um erro ao incluir o registro');
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'ocorreu um erro no servidor', errorMessage: error.message });
        }
    }

};

module.exports = { clienteController };
