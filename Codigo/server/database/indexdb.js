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
        const dbConfig = config[env];

        let sequelize;
        if (dbConfig.use_env_variable) {
            sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
        } else {
            sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
        }

        this.connection = sequelize;
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