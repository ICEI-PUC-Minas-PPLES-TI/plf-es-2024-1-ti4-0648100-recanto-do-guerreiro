const compra = require('../models/Compra');

class compraController {
    async create(req, res) {
        try {
            await compra.create({
                nome: req.body.nome,
                email: req.body.email,
                telefone: req.body.telefone,
                marcaCarro: req.body.marcaCarro,
                modeloCarro: req.body.modeloCarro,
                mensagem: req.body.mensagem
            })
            return res.status(200).json('Compra cadastrada')
        } catch (erro) {
            return res.status(500).json('Compra não cadastrada ' + erro)
        }
    }

    async read(req, res) {
        try {
            const check = await compra.findOne({
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json(check)
        } catch (erro) {
            return res.status(500).json('Erro ao encontrar os dados da compra' + erro)
        }
    }

    async delete(req, res) {
        try {
            await compra.destroy({
                where: { id: req.params.id }
            })
            return res.status(200).json('Sucesso ao deletar a compra selecionada')
        } catch (erro) {
            return res.status(500).json('Erro ao deletar a compra selecionada' + erro)
        }
    }


}

module.exports = new compraController()