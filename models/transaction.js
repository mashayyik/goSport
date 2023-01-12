'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Field)
      // define association here
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    FieldId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    invoice: DataTypes.INTEGER,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
    hooks : {
      beforeCreate : (data, option) => { 
       data.status = 0
       data.invoice =  0
      }
    }
  });
  return Transaction;
};