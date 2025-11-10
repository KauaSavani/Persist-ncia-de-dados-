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
    },



   atualizarCliente: async (req, res) => {
    try {
        const idCliente = Number(req.params.idCliente);
        let { nomeCliente, cpfCliente } = req.body;

        if (nomeCliente) nomeCliente = nomeCliente.trim();

        if (!idCliente || !nomeCliente || !cpfCliente || typeof idCliente !== 'number' || nomeCliente.length < 3 || cpfCliente.length !== 11) {
            return res.status(409).json({ message: 'verifique dados enviados e tente novamente' });
        }

        const clienteAtual = await clienteModel.selecionarPorId(idCliente);
        if (clienteAtual.length === 0) {
            throw new Error('registro não localizado');
        }

        const novoNome = nomeCliente ?? clienteAtual[0].nomeCliente;
        const novoCpf = cpfCliente ?? clienteAtual[0].cpfCliente;

        const resultado = await clienteModel.alterarCliente(idCliente, novoNome, novoCpf);
        console.log(resultado);

        if (resultado.changedRows === 0) {
            throw new Error('Ocorreu um erro ao atualizar o cliente');
        }

        res.status(200).json({ message: 'Registro atualizado com sucesso', data: resultado });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
    }
},

buscarClientePorId: async (req, res) => {
    try {
        const {id} = Number(req.params.idCliente);

        if (!id || !Number.isInteger(id)) {
            return res.status(400).json({ message: 'Forneça um identificador (ID) válido' });
        }

        const resultado = await clienteModel.selecionarPorId(id);

        if (resultado.length === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        res.status(200).json({ message: 'Resultado dos dados listados', data: resultado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
    }
},
 
    deletarCliente: async (req, res) => {
        try {
            const id = Number(req.params.idCliente);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'forneça um ID válido' });
            }

            const clienteSelecionado = await clienteModel.selecionarPorId(id);
            if (clienteSelecionado.length === 0) {
                throw new Error('Registro não localizado');
            } else {
                const resultado = await clienteModel.deletarCliente(id);
                if (resultado.affectedRows === 1) {
                    res.status(200).json({ message: 'Cliente excluído com sucesso', data: resultado });
                } else {
                    throw new Error('Não foi possível excluir o cliente');
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

};

module.exports = { clienteController };
