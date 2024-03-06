const { Sequelize, Model } = require("sequelize");

class User extends Model {
    static init(sequelize) {
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
                modelName: "User", //NOME TEM QUE SER MAIUSCULO
                freezeTableName: true,
            }
        );
    }
}

module.exports = User;