'use strict';
const bcrypt = require('bcrypt');
//  hacher le mot de passe avant de l'enregistrer
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync("password123", salt);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      civility: 'Mme',
      firstName: 'Sam',
      lastName: 'Bela',
      email: 'lilou2008@live.fr',
      password: hashedPassword,
      profil: 'admin',
      status: '1',
      createdAt: new Date(),
      confirmedAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
};
