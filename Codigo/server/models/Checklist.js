const { Sequelize, Model } = require('sequelize');
const Carro = require('./Carro');

class Checklist extends Model {
    static init(sequelize) {
        super.init({

                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                carroId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    
                    references: {
                        model: 'carro',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },

                suspensao: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                },

                lataria: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                },

                pneus: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                },

                motor: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                },

                cambio: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                },

                interior: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                },

                documentacao: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                },

                eletrica: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                },

            },

            {
                sequelize,
                modelName: 'Checklist', //NOME TEM QUE SER MAIUSCULO
                freezeTableName: true
            }
        )
    }
}

module.exports = Checklist