'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Commande_lines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commandeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Commandes',
          key: 'id',
          as: 'commandeId',
        }
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
          as: 'productId',
        }
      },
      price_ht: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      tva: {
        allowNull: false,
        type: Sequelize.DECIMAL(2, 2),
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Commande_lines');
  }
};