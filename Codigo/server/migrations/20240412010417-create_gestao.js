'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Gestao', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            idCliente: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'cliente',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },

            idReserva: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'reserva',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },

            custos: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            descricao: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Gestao');
    }
};