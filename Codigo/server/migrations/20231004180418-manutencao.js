'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Manutencao', {
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
            problema: {
                type: Sequelize.STRING(400),
                allowNull: true,
            },
            oficinaId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Oficina',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            orcamento: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            dataInicio: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            dataSaida: {
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
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Manutencao');
    }
};