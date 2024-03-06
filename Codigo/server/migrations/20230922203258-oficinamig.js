'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Oficina', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: Sequelize.STRING(55),
                allowNull: true,
            },
            logradouro: {
                type: Sequelize.STRING(400),
                allowNull: true,
            },
            descricao: {
                type: Sequelize.STRING(400),
                allowNull: true,
            },
            especialidade: {
                type: Sequelize.STRING(80),
                allowNull: true,
            },
            telefone: {
                type: Sequelize.STRING(11),
                allowNull: true,
            },
            numero: {
                type: Sequelize.STRING(5),
                allowNull: true,
            },
            complemento: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            cep: {
                type: Sequelize.STRING(9),
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
        await queryInterface.dropTable('Oficina');
    }
};