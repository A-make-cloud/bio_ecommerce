'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('commandes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
      },
      reference: {
        type: Sequelize.STRING(11),
        allowNull: false,

      },
      delivery_address: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Addresses',
          key: 'id',
          as: 'delivery_address',
        }
      },
      billing_address: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Addresses',
          key: 'id',
          as: 'billing_address',
        }
      },

      payement_card: {
        allowNull: true,
        type: Sequelize.STRING
      },
      payement_ref: {
        type: Sequelize.STRING,
        allowNull: true,

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
    await queryInterface.dropTable('commandes');
  }
};