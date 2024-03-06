const { Sequelize, Model } = require("sequelize");

class Carro extends Model {
  static init(sequelize) {
    //VERIFICAR ALOCACAO DE ESPACO BD PARA DEFINIR LIMITES DE CARACTERES (TA SEM)
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },

        imagem: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        marca: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        modelo: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        ano: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },

        preco: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },

        placa: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        chassi: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        cor: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        motor: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        status: {
          type: Sequelize.ENUM("disponivel", "vendido", "reservado"),
          allowNull: true,
        },
      },

      {
        sequelize,
        modelName: "Carro", //NOME TEM QUE SER MAIUSCULO
        freezeTableName: true,
      }
    );
  }
}

module.exports = Carro;
