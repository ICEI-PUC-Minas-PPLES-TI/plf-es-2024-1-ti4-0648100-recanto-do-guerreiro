const { Sequelize } = require('sequelize');
const config = require('../config/bd');
const Reserva = require('../models/Reserva');
const Cliente = require('../models/Cliente');
const Gestao = require('../models/Gestao');
const User = require('../models/User');

const models = [Reserva, Cliente, Gestao, User];

class Database {
    constructor() {
        // Obtendo as configurações para o ambiente atual
        const env = process.env.NODE_ENV || 'development';
        const { username, password, database, host, dialect } = config[env];

        // Inicializando a conexão com o banco de dados usando as configurações
        this.connection = new Sequelize(database, username, password, {
            host: host,
            dialect: dialect, // Usando o dialeto definido nas configurações
        });
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

module.exports = new Database();