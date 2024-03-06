const { Sequelize, Model } = require('sequelize');

class AdminVisualizar extends Model {
  static init(sequelize) {
    super.init(
      {
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
        mensagemAdicional: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'AdminVisualizar',
        freezeTableName: true,
      }
    );
  }
}

module.exports = AdminVisualizar;
