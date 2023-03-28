'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Categories',
      [
        {
          id: 1,
          title: 'Produits laitiers',
          description: "issue d'animaux vivant en liberté sans antibiotiques",
          status: 1,
          img: "https://media.vanityfair.fr/photos/63ee10a614278631d9f83158/16:9/w_2560%2Cc_limit/GettyImages-1366977941.jpg",
          top: "1",
          background: "#ffffab",
          created_at: "2022-09-14 13:28:56",
          updated_at: "2022-09-14 13:28:56"
        },
        {
          id: 2,
          title: 'Fruits et légumes',
          description: "issue d'animaux vivant en liberté sans antibiotiques",
          status: 1,
          img: "https://mapetiteassiette.com/wp-content/uploads/2021/08/800x600-fruits-exotiques.png",
          top: "2",
          background: "#baf0ba",
          created_at: "2022-09-14 13:28:56",
          updated_at: "2022-09-14 13:28:56"
        },
        {
          id: 3,
          title: 'Viandes',
          description: "issue d'animaux vivant en liberté sans antibiotiques",
          status: 1,
          img: "https://quoidansmonassiette.fr/wp-content/uploads/2016/03/Viande-boeuf-b%C3%A9n%C3%A9fice-poivre-2.jpg",
          top: "3",
          background: "#ccccff",
          created_at: "2022-09-14 13:28:56",
          updated_at: "2022-09-14 13:28:56"
        },
        {
          id: 4,
          title: 'Boissons',
          description: "issue d'animaux vivant en liberté sans antibiotiques",
          status: 1,
          img: "https://www.alternativesante.fr/upload/cache/Jus_de_legumes_w553_h553_r3_q90.jpg",
          top: "4",
          background: "#ffbfbf",
          created_at: "2022-09-14 13:28:56",
          updated_at: "2022-09-14 13:28:56"
        }]
      , {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */

    await queryInterface.bulkDelete('Category', null, {});

  }
};
