'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Carro', 'placa', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('Carro', 'chassi', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('Carro', 'cor', {
          type: Sequelize.STRING,
          allowNull: true
        });
        await queryInterface.addColumn('Carro', 'motor', {
          type: Sequelize.STRING,
          allowNull: true
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Carro', 'placa');
        await queryInterface.removeColumn('Carro', 'chassi');
        await queryInterface.removeColumn('Carro', 'cor');
        await queryInterface.removeColumn('Carro', 'motor');
    }
};