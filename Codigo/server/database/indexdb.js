//importar modelos aqui
//inicializa os modelos e conecta ao bd
const config = require('../config/bd');
const { Sequelize } = require('sequelize');
const Carro = require('../models/Carro');
const Oficina = require('../models/Oficina');
const Manutencao = require('../models/manutencao');
const Checklist = require('../models/Checklist')
const Negociacao = require('../models/negociacao');
const VendaFinal = require('../models/VendaFinal');
const Compra = require('../models/Compra');
const User = require('../models/User');

const models = [Carro, Oficina, Manutencao, Negociacao, Checklist, VendaFinal, Compra, User]

class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
        this.associate();
    }
    init() {
        models.forEach((model) => model.init(this.connection));
    }

    associate() {
        models.forEach((model) => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

module.exports = new Database()