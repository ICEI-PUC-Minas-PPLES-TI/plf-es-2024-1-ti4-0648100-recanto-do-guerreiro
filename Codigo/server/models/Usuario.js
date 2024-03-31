const { Sequelize, Model } = require("sequelize");

class Usuario extends Model {
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

                senha: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },

            },

            {
                sequelize,
                modelName: "Usuario", //NOME TEM QUE SER MAIUSCULO
                freezeTableName: true,
            }
        );
    }
}

module.exports = Usuario;