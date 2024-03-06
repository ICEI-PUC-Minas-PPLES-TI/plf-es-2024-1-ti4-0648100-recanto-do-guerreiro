'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Negociacao', {
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
          precoNegociacao: {
              type: Sequelize.DOUBLE,
              allowNull: true,
          },
          troca: {
              type: Sequelize.BOOLEAN,
              allowNull: true,
          },
          promoPorCem: {
              type: Sequelize.INTEGER,
              allowNull: true,
          },
          createdAt: {
              type: Sequelize.DATE,
              allowNull: false,
          },
          updatedAt: {
               type: Sequelize.DATE,
               allowNull: false,
          }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Negociacao');
    }
};