const { Sequelize, Model } = require('sequelize');

class Oficina extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: Sequelize.STRING(55),
                allowNull: true,
            },
            logradouro: {
                type: Sequelize.STRING(400),
                allowNull: true,
            },
            descricao: {
                type: Sequelize.STRING(400),
                allowNull: true,
            },
            especialidade: {
                type: Sequelize.STRING(80),
                allowNull: true,
            },
            telefone: {
                type: Sequelize.STRING(11),
                allowNull: true,
            },
            numero: {
                type: Sequelize.STRING(5),
                allowNull: true,
            },
            complemento: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            cep: {
                type: Sequelize.STRING(9),
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: 'Oficina',
            freezeTableName: true
        })
    }
}

module.exports = Oficina;