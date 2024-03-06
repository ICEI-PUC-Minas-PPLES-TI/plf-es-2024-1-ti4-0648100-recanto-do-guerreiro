const { where } = require('sequelize');
const venda = require('../models/VendaFinal');

class vendaFinalController{
    async create(req, res) {
        try {
            await venda.create({
                carroId: req.body.carroId,
                precoFinal: req.body.precoFinal,
                nomeComprador: req.body.nomeComprador,
                telefoneComprador: req.body.telefoneComprador,
                emailComprador: req.body.emailComprador,
                dataVenda: req.body.dataVenda,
            })
            return res.status(200).json('Venda registrada')
        } catch (erro) {
            return res.status(500).json('Venda não registrada ' + erro)
        }
    }

    async index(req, res) {
        try {
            const vendas = await venda.findAll();
            return res.status(200).json(vendas);
        } catch (error) {
            return res.status(500).json("Erro ao buscar as vendas: " + error);
        }
    }
    async getOne(req, res) {
        try {
            const vendas = await venda.findOne({
                where: { carroId: req.params.carroId }
            });
            return res.status(200).json(vendas);
        } catch (error) {
            return res.status(500).json("Erro ao buscar as vendas: " + error);
        }
    }
    
    async delete(req, res) {
        try {
            await venda.destroy({
                where: { id: req.params.id }, 
            });
            return res.status(200).json("Venda excluída com sucesso.");
        } catch (error) {
            return res.status(500).json("Erro ao excluir a venda: " + error);
        }
    }

    async update(req, res) {
        try {
            await venda.update({
                carroId: req.body.carroId,
                precoFinal: req.body.precoFinal,
                nomeComprador: req.body.nomeComprador,
                telefoneComprador: req.body.telefoneComprador,
                emailComprador: req.body.emailComprador,
                dataVenda: req.body.dataVenda,
            }, { where: { id: req.params.id } }); 
            return res.status(200).json("Informações atualizadas com sucesso.");
        } catch (error) {
            return res.status(500).json("Erro ao atualizar a venda: " + error);
        }
    }
}

module.exports = new vendaFinalController()