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

                nome: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                email: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                telefone: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                marcaCarro: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                modeloCarro: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                mensagem: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

            },

            {
                sequelize,
                modelName: "Compra", //NOME TEM QUE SER MAIUSCULO
                freezeTableName: true,
            }
        );
    }
}

module.exports = Compra;