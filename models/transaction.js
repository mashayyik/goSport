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
      Transaction.belongsTo(models.Field,{
        onDelete:'cascade',
        onUpdate:'cascade'
      })
      Transaction.belongsTo(models.User)
      // define association here
    }
    get formattedBookedDate(){
      return this.date.toLocaleString("en-US", {dateStyle:'full', timeStyle:'medium'}) 
    } 

    get durationWords(){
      let word = `${this.duration} Hour`
      if(this.duration > 1)  word += 's' 
      return word
    }

    get statusName(){
      switch(this.status){
        case 0:
          return 'Pending'
        case 1:
          return 'Approved'
        case 2:
          return 'Rejected'
      }
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    FieldId: DataTypes.INTEGER,
    date: {
      type: DataTypes.DATE,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Date is Required"
        },
        notNull:{
          msg:"Date is Required"
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    invoice: DataTypes.INTEGER,
    duration: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Role is Required"
        },
        notNull:{
          msg:"Role is Required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    hooks : {
      beforeCreate : (data, option) => { 
        console.log(data)
       data.status = 0,
       data.invoice = data.invoice * data.duration + (0.1 * data.invoice * data.duration)
      }
    }
  });
  return Transaction;
};