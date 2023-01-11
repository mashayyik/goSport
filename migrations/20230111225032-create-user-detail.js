'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull:false
      },
      CityId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Cities"
        }
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull:false
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Users"
        }
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
    await queryInterface.dropTable('UserDetails');
  }
};