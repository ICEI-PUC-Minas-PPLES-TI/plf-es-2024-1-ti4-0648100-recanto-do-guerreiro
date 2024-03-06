'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VendaFinal', {
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
            model: 'Carro',
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VendaFinal');
  }
};
