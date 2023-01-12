'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Users"
        }
      },
      FieldId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Fields"
        }
      },
      date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      invoice: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      duration: {
        type: Sequelize.INTEGER,
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
   down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Transactions');
  }
};