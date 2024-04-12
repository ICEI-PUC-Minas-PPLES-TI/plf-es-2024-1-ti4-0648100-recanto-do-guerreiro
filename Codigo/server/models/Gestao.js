const { Sequelize, Model } = require("sequelize");

class Gestao extends Model {
    static init(sequelize) {
        //VERIFICAR ALOCACAO DE ESPACO BD PARA DEFINIR LIMITES DE CARACTERES (TA SEM)
        super.init({
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                idCliente: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'cliente',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                },

                idReserva: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'reserva',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                },

                custos: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                descricao: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

            },

            {
                sequelize,
                modelName: "Gestao", //NOME TEM QUE SER MAIUSCULO
                freezeTableName: true,
            }
        );
    }
}

module.exports = Gestao;