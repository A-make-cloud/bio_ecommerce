'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
      },

      type: {
        type: Sequelize.ENUM('livraison', 'facturation'),
        defaultValue: 'livraison',
        allowNull: false,
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      complement: {
        type: Sequelize.STRING,

      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      zipcode: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      information: {
        type: Sequelize.TEXT,

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
    await queryInterface.dropTable('Addresses');
  }
};