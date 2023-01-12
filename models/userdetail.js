'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserDetail.belongsTo(models.City)
      UserDetail.belongsTo(models.User)
    }
  }
  UserDetail.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Fullname is Required"
        },
        notNull:{
          msg:"Fullname is Required"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"gender is Required"
        },
        notNull:{
          msg:"gender is Required"
        }
      }
    },
    CityId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:"City is Required"
        },
        notNull:{
          msg:"City is Required"
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Date of Birth is Required"
        },
        notNull:{
          msg:"Date of Birth is Required"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};