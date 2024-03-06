'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Carro', 'imagem', {
      type: Sequelize.STRING,
      allowNull: true
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Carro', 'imagem', {
      type: Sequelize.BLOB('long'),
      allowNull: true
  });
  }
};
