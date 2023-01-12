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

    static ago(time) {
      var seconds = Math.floor((new Date() - time) / 1000);
    
        var interval = Math.floor(seconds / 31536000);
    
        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
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