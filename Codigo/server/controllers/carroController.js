const { where } = require('sequelize');
const carro = require('../models/Carro');
const fs = require('fs').promises;
const path = require('path');

class carroController {
    async create(req, res) {
        try {
            const novoCarro = await carro.create({
                imagem: req.file.path,
                marca: req.body.marca,
                modelo: req.body.modelo,
                ano: req.body.ano,
                preco: req.body.preco,
                placa: req.body.placa,
                chassi: req.body.chassi,
                cor: req.body.cor,
                motor: req.body.motor,
                status: req.body.status
            })
            return res.status(200).json(novoCarro)
        } catch (erro) {
            return res.status(500).json('Veiculo não cadastrado ' + erro)
        }
    }

    async filter(req, res) {
        try {
            const { ano, status } = req.query
            const carroFil = await carro.findAll({
                where: {
                    ano: ano,
                    status: status,
                }
            })
            console.log(carroFil)
            return res.status(200).json(carroFil)
        } catch (erro) {
            return res.status(500).json('Erro ao encontrar o veiculo' + erro)
        }
    }

    async filterIdCarro(req, res) {
        try {
            const carrosFil = await carro.findOne({
                where: { id: req.params.id }
            })
            console.log(carrosFil)
            return res.status(200).json(carrosFil)
        } catch (erro) {
            return res.status(500).json('Erro ao pegar os veiculos' + erro)
        }
    }

    async index(req, res) {
        try {
            const carrosImport = await carro.findAll()
            return res.status(200).json(carrosImport)
        } catch (erro) {
            return res.status(500).json('Erro ao encontrar os veiculos' + erro)
        }
    }

    async getNomeImg(req, res) {
        try {
            const carrosImport = await carro.findAll({
                attributes: ['id', 'modelo', 'marca', 'placa', ] // Lista dos atributos que você quer selecionar
            })
            return res.status(200).json(carrosImport)
        } catch (erro) {
            return res.status(500).json('Erro ao encontrar os veiculos' + erro)
        }
    }

    async updateStatus(req, res) {
        try {
            await carro.update({
                status: req.body.status,
            }, { where: { id: req.params.id } })
            return res.status(200).json('Sucesso ao atualizar o veiculo')
        } catch (erro) {
            return res.status(500).json('Erro ao atualizar' + erro)
        }
    }

    async update(req, res) {
        try {
            await carro.update({
                marca: req.body.marca,
                modelo: req.body.modelo,
                ano: req.body.ano,
                preco: req.body.preco,
                placa: req.body.placa,
                chassi: req.body.chassi,
                cor: req.body.cor,
                motor: req.body.motor,
                status: req.body.status,
            }, { where: { id: req.params.id } })
            return res.status(200).json('Sucesso ao atualizar o veiculo')
        } catch (erro) {
            return res.status(500).json('Erro ao atualizar' + erro)
        }
    }

    async delete(req, res) {
        try {
            let id = req.params.id;
            const carroToDelete = await carro.findByPk(id);
            if(carroToDelete.imagem != null){
                try {
                    const imagePath = path.join(__dirname, '..', carroToDelete.imagem);
                    await fs.unlink(imagePath);
                } catch (error) {
                    
                }
                
            }
            await carroToDelete.destroy();
            return res.status(200).json('Sucesso ao deletar o veiculos')
        } catch (erro) {
            return res.status(500).json('Erro ao deletar' + erro)
        }
    }


}

module.exports = new carroController()