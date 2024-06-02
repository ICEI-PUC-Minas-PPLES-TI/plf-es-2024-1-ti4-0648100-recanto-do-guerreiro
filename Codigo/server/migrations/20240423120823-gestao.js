"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Gestao", {
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
                    model: "cliente",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            idReserva: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "reserva",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            custos: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            descricao: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                ),
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Gestao");
    },
};