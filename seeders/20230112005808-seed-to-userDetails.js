'use strict';
const fs = require('fs');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const userDetails = JSON.parse(fs.readFileSync('./data/userDetails.json', 'utf-8'))
        .map(el =>{
          el.createdAt = el.updatedAt = new Date()
          return el
        })
    return queryInterface.bulkInsert('UserDetails', userDetails, {})

  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('UserDetails', null, {})
  }
};
