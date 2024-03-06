const { Sequelize, Model } = require("sequelize");

class VendaFinal extends Model {
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
        precoFinal: {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
        nomeComprador: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        telefoneComprador: {
            type: Sequelize.STRING(11),
            allowNull: true,
        },
        emailComprador: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        dataVenda: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
      },

      {
        sequelize,
        modelName: "VendaFinal", //NOME TEM QUE SER MAIUSCULO
        freezeTableName: true,
      }
    );
  }
}

module.exports = VendaFinal;
