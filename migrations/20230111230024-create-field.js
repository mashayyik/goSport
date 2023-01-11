'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fields', {
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
      price: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      CityId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Cities"
        }
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Categories"
        }
      },
      transactionTotal: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Users"
        }
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull:false
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
    await queryInterface.dropTable('Fields');
  }
};