'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Field.belongsTo(models.User)
      Field.belongsTo(models.City)
      Field.belongsTo(models.Category)
    }
  }
  Field.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    CityId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    transactionTotal: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Field',
    hooks : {
      beforeCreate : (data, option) => {  
       data.transactionTotal = 0
      }
    }
  });
  return Field;
};