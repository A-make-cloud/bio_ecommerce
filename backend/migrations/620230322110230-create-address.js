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

      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'user_id',
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
    await queryInterface.dropTable('Addresses');
  }
};