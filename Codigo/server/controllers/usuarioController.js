const { where } = require('sequelize');
const usuario = require('../models/Usuario');
const fs = require('fs').promises;
const path = require('path');

class usuarioController {
    async create(req, res) {
        try {
            const novoUsuario = await usuario.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.bairro
            })
            return res.status(200).json(novoUsuario)
        } catch (erro) {
            return res.status(500).json('Usuario não cadastrado' + erro)
        }
    }

}

module.exports = new usuarioController()