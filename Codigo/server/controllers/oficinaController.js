const Oficina = require("../models/Oficina");

class oficinaController {
    async create(req, res) {
        try {
            await Oficina.create({
                nome: req.body.nome,
                telefone: req.body.telefone,
                logradouro: req.body.logradouro,
                descricao: req.body.descricao,
                especialidade: req.body.especialidade,
                numero: req.body.numero,
                complemento: req.body.complemento,
                cep: req.body.cep,
            });
            return res.status(200).json("Oficina cadastrada com sucesso.");
        } catch (error) {
            return res.status(500).json("Erro ao cadastrar a oficina: " + error);
        }
    }

    async index(req, res) {
        try {
            const oficinas = await Oficina.findAll();
            return res.status(200).json(oficinas);
        } catch (error) {
            return res.status(500).json("Erro ao buscar as oficinas: " + error);
        }
    }

    async filterId(req, res) {
        try {
            const oficinasFil = await Oficina.findOne({
                where: { id: req.params.id },
            })
            console.log(oficinasFil)
            return res.status(200).json(oficinasFil)
        } catch (erro) {
            return res.status(500).json('Erro ao pegar as oficinas' + erro)
        }
    }

    async update(req, res) {
        try {
            await Oficina.update({
                nome: req.body.nome,
                telefone: req.body.telefone,
                logradouro: req.body.logradouro,
                descricao: req.body.descricao,
                especialidade: req.body.especialidade,
                numero: req.body.numero,
                complemento: req.body.complemento,
                cep: req.body.cep,
            }, { where: { id: req.params.id } });
            return res.status(200).json("Oficina atualizada com sucesso.");
        } catch (error) {
            return res.status(500).json("Erro ao atualizar a oficina: " + error);
        }
    }

    async delete(req, res) {
        try {
            await Oficina.destroy({
                where: { id: req.params.id },
            });
            return res.status(200).json("Oficina excluída com sucesso.");
        } catch (error) {
            return res.status(500).json("Erro ao excluir a oficina: " + error);
        }
    }
}

module.exports = new oficinaController();