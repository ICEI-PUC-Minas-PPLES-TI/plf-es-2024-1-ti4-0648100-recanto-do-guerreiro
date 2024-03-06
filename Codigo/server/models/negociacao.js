const { Sequelize, Model } = require('sequelize');

class Negociacao extends Model {
    static init(sequelize) { //VERIFICAR ALOCACAO DE ESPACO BD PARA DEFINIR LIMITES DE CARACTERES (TA SEM)
        super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            carroId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'carro',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            precoNegociacao: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            troca: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
            promoPorCem: {
                type: Sequelize.INTEGER,
                allowNull: true,
            }
        }, {
            sequelize,
            modelName: 'Negociacao',
            freezeTableName: true
        })
    }
}

module.exports = Negociacao;