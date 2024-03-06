const { Sequelize, Model } = require('sequelize');

class Manutencao extends Model {
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
            problema: {
                type: Sequelize.STRING(400),
                allowNull: true,
            },
            oficinaId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'oficina',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            orcamento: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            dataInicio: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            dataSaida: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },

        }, {
            sequelize,
            modelName: 'Manutencao',
            freezeTableName: true
        })
    }
}

module.exports = Manutencao;