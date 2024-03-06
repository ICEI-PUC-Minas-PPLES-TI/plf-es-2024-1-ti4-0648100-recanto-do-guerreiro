'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Carro', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            imagem: {
                type: Sequelize.BLOB('long'),
                allowNull: true,

            },

            marca: {
                type: Sequelize.STRING,
                allowNull: true
            },

            modelo: {
                type: Sequelize.STRING,
                allowNull: true
            },

            ano: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            preco: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            placa: {
                type: Sequelize.STRING,
                allowNull: true
            },

            chassi: {
                type: Sequelize.STRING,
                allowNull: true
            },

            cor: {
                type: Sequelize.STRING,
                allowNull: true
            },

            motor: {
                type: Sequelize.STRING,
                allowNull: true
            },

            status: {
                type: Sequelize.STRING,
                allowNull: true
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
        await queryInterface.dropTable('Carro');
    }
};