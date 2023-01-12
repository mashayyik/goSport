'use strict';

const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserDetail)
      User.hasMany(models.Field)
    }
  }
  User.init({
    username:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:{
        msg:"Username Already Used"
      },
      validate:{
        notNull:{
          msg:"Username is Required"
        },
        notNull:{
          msg:"Username is Required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Password is Required"
        },
        notNull:{
          msg:"Password is Required"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Role is Required"
        },
        notNull:{
          msg:"Role is Required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:{
        msg:"Email Already Used"
      },
      validate:{
        notNull:{
          msg:"Email is Required"
        },
        notNull:{
          msg:"Email is Required"
        },
        isEmail:{
          msg:"Please insert the correct email"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate : (data, option) => { 
        // const salt  = bcrypt.genSaltSync(5)
       data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(5))
      }
    }
  });
  return User;
};