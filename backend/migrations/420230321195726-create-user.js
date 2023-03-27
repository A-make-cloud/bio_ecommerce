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
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
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
      confirmed_at: {

        type: Sequelize.DATE
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};