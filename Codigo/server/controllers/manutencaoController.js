const { where } = require('sequelize');
const manutencao = require('../models/manutencao');
const Manutencao = require('../models/manutencao');

class manutencaoController {
    async create(req, res) {
        try {
            await manutencao.create({
                carroId: req.body.carroId,
                problema: req.body.problema,
                oficinaId: req.body.oficinaId,
                orcamento: req.body.orcamento,
                dataInicio: req.body.dataInicio,
                dataSaida: req.body.dataSaida,
            })
            return res.status(200).json('Manutenção cadastrada')
        } catch (erro) {
            return res.status(500).json('Manutenção não cadastrada ' + erro)
        }
    }

    async index(req, res) {
        try {
            const manutencoes = await manutencao.findAll();
            return res.status(200).json(manutencoes);
        } catch (error) {
            return res.status(500).json("Erro ao buscar as manutenções: " + error);
        }
    }

    async filterId(req, res) {
        try {
            const { id } = req.query
            const manutencaoFil = await manutencao.findOne({
                where: {
                    id: id
                }
            })
            console.log(manutencaoFil)
            return res.status(200).json(manutencaoFil)
        } catch (erro) {
            return res.status(500).json('Erro ao pegar as manutenções' + erro)
        }
    }
    async manutencaoFilCarro(req, res) {
        try {
            const { carroId } = req.query
            const manutencaoFil = await manutencao.findAll({
                where: {
                    carroId: carroId
                }
            })
            console.log(manutencaoFil)
            return res.status(200).json(manutencaoFil)
        } catch (erro) {
            return res.status(500).json('Erro ao pegar as manutenções' + erro)
        }
    }

    async manutencaoFilOficina(req, res) {
        try {
            const { oficinaId } = req.query
            const manutencaoFil = await manutencao.findAll({
                where: {
                    oficinaId: oficinaId
                }
            })
            console.log(manutencaoFil)
            return res.status(200).json(manutencaoFil)
        } catch (erro) {
            return res.status(500).json('Erro ao pegar as manutenções' + erro)
        }
    }


    async delete(req, res) {
        try {
            await manutencao.destroy({
                where: { id: req.params.id }, //manutencao vai ter um id proprio?
            });
            return res.status(200).json("Manutenção excluída com sucesso.");
        } catch (error) {
            return res.status(500).json("Erro ao excluir a manutenção: " + error);
        }
    }

    async update(req, res) {
        try {
            await manutencao.update({
                oficinaId: req.body.oficinaId,
                problema: req.body.problema,
                orcamento: req.body.orcamento,
                dataInicio: req.body.dataInicio,
                dataSaida: req.body.dataSaida,
            }, { where: { id: req.params.id } }); // questao do id novamente, usar uma chave composta ou nao? 
            return res.status(200).json("Informações atualizadas com sucesso.");
        } catch (error) {
            return res.status(500).json("Erro ao atualizar a oficina: " + error);
        }
    }
}

module.exports = new manutencaoController()