const { Sequelize, Model } = require("sequelize");

class Compra extends Model {
    static init(sequelize) {
        //VERIFICAR ALOCACAO DE ESPACO BD PARA DEFINIR LIMITES DE CARACTERES (TA SEM)
        super.init({
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },

                titulo: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                descricao: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                data: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },

                hora: {
                    type: Sequelize.STRING,
                    allowNull: true,
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

                adicionais: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                status: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },


            },

            {
                sequelize,
                modelName: "Reserva", //NOME TEM QUE SER MAIUSCULO
                freezeTableName: true,
            }
        );
    }
}

module.exports = Compra;