const checklist = require('../models/Checklist');

class checklistController {
    async create(req, res) {
        try {
            await checklist.create({
                carroId: req.body.carroId,
                suspensao: req.body.suspensao,
                lataria: req.body.lataria,
                pneus: req.body.pneus,
                motor: req.body.motor,
                cambio: req.body.cambio,
                interior: req.body.interior,
                documentacao: req.body.documentacao,
                eletrica: req.body.eletrica
            }) 
            return res.status(200).json('Checklist cadastrado')
        } catch (erro) {
            return res.status(500).json('Checklist não cadastrado ' + erro)
        }
    }

    async read(req, res) {
        try {
            const check = await checklist.findOne({
                where: {
                    carroId: req.params.id
                }
            })
            return res.status(200).json(check)
        } catch (erro) {
            return res.status(500).json('Erro ao encontrar o checklist' + erro)
        }
    }


    async update(req, res) {
        try {
            await checklist.update({
                carroId: req.body.carroId,
                suspensao: req.body.suspensao,
                lataria: req.body.lataria,
                pneus: req.body.pneus,
                motor: req.body.motor,
                cambio: req.body.cambio,
                interior: req.body.interior,
                documentacao: req.body.documentacao,
                eletrica: req.body.eletrica
            }, { where: { carroId: req.params.id } })
            return res.status(200).json('Sucesso ao atualizar checklist')
        } catch (erro) {
            return res.status(500).json('Erro ao atualizar checklist' + erro)
        }
    }

    async delete(req, res) {
        try {
            await checklist.destroy({
                where: { id: req.params.id }
            })
            return res.status(200).json('Sucesso ao deletar o checklist')
        } catch (erro) {
            return res.status(500).json('Erro ao deletar checklist' + erro)
        }
    }

    async deleteCar(req, res) {
        try {
            await checklist.destroy({
                where: { ca: req.params.id }
            })
            return res.status(200).json('Sucesso ao deletar o checklist')
        } catch (erro) {
            return res.status(500).json('Erro ao deletar checklist' + erro)
        }
    }

}

module.exports = new checklistController()