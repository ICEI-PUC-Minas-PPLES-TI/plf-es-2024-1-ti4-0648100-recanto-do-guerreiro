const { Sequelize, Model } = require("sequelize");

class Cliente extends Model {
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

                telefone: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                email: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                logradouro: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                complemento: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

                bairro: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
            },

            {
                sequelize,
                modelName: "Cliente", //NOME TEM QUE SER MAIUSCULO
                freezeTableName: true,
            }
        );
    }
}

module.exports = Cliente;