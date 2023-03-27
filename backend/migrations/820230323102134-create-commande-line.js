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
      commande_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Commandes',
          key: 'id',
          as: 'commande_id',
        }
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
          as: 'product_id',
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

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Commande_lines');
  }
};