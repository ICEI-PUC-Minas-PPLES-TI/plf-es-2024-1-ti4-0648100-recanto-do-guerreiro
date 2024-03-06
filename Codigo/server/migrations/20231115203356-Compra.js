'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Compra', {
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

            mensagem: {
                type: Sequelize.STRING,
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
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Compra');
    }
};