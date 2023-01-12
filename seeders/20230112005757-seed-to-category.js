'use strict';
const fs = require('fs')
          // console.log(categories);

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

    let categories =  JSON.parse(fs.readFileSync('./data/categories.json', 'utf-8'))
                      .map(each => {
                        each.createdAt = each.updatedAt = new Date();
                        return each
                      })

    return queryInterface.bulkInsert('Categories', categories, {});
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
