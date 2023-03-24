'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      civility: {
        allowNull: false,
        type: Sequelize.ENUM('M', 'Mme'),
        defaultValue: "M",
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profil: {
        type: Sequelize.ENUM('admin', 'client'),
        defaultValue: "client",
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,

      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('1', '2', '3'),
        defaultValue: "3",
      },
      token_session: {
        type: Sequelize.STRING,

      },
      token_confirm: {
        type: Sequelize.STRING,

      },
      confirmedAt: {

        type: Sequelize.DATE
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};