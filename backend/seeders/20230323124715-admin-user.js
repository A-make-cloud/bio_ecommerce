'use strict';
const bcrypt = require('bcrypt');
//  hacher le mot de passe avant de l'enregistrer
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync("12345678", salt);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      civility: 'M',
      firstName: 'Toto',
      lastName: 'titi',
      email: 'ti@live.fr',
      password: hashedPassword,
      profil: 'admin',
      status: '1',
      created_at: new Date(),
      confirmed_at: new Date(),
      updated_at: new Date()
    },
    {
      civility: 'M',
      firstName: 'Juju',
      lastName: 'Tata',
      email: 'a@gmail.com',
      password: '$2b$10$z1Ioof6a.EoJxBf8bvDnouxj.5WYteV7YEfUOPiIEBKtER0cxmCLi',
      profil: 'admin',
      status: '1',
      created_at: new Date(),
      confirmed_at: new Date(),
      updated_at: new Date()
    }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
};




