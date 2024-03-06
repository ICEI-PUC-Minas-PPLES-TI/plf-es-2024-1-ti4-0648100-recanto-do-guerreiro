'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Checklist', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      carroId: {
        type: Sequelize.INTEGER,
        key: true
      },

      suspensao: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      },

      lataria: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      },

      pneus: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      },

      motor: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      },

      cambio: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      },

      interior: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      },

      documentacao: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      },

      eletrica: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0
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
    await queryInterface.dropTable('Checklist');
  }
};
