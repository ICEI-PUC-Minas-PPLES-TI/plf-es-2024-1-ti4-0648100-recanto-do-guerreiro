const { where } = require('sequelize');
const negociacao = require('../models/negociacao');

class negociacaoController{
    async create(req, res) {
        try {
            await negociacao.create({
                carroId: req.body.carroId,
                precoNegociacao: req.body.precoNegociacao,
                troca: req.body.troca,
                promoPorCem: req.body.promoPorCem,
            })
            return res.status(200).json('Negociação cadastrada')
        } catch (erro) {
            return res.status(500).json('Negociação não cadastrada ' + erro)
        }
    }

    async index(req, res) {
        try {
            const negociacoes = await negociacao.findAll();
            return res.status(200).json(negociacoes);
        } catch (error) {
            return res.status(500).json("Erro ao buscar as negociações: " + error);
        }
    }

    async filterId(req, res) {
        try {
            const { id } = req.query
            const negociacaoUnica = await negociacao.findOne({
                where: {
                    id: id
                }
            })
            console.log(negociacaoUnica)
            return res.status(200).json(negociacaoUnica)
        } catch (erro) {
            return res.status(500).json('Erro ao pegar a negociação' + erro)
        }
    }
    
    async delete(req, res) {
        try {
            await negociacao.destroy({
                where: { id: req.params.id }, 
            });
            return res.status(200).json("Negociação excluída com sucesso.");
        } catch (error) {
            return res.status(500).json("Erro ao excluir a negociação: " + error);
        }
    }

    async update(req, res) {
        try {
            await negociacao.update({
                precoNegociacao: req.body.precoNegociacao,
                troca: req.body.troca,
                promoPorCem: req.body.promoPorCem,
            }, { where: { id: req.params.id } }); 
            return res.status(200).json("Informações atualizadas com sucesso.");
        } catch (error) {
            return res.status(500).json("Erro ao atualizar a negociação: " + error);
        }
    }
}

module.exports = new negociacaoController()