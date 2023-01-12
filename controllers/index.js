
 const { Field , Category, User, City, Transaction} = require('../models');

const { Op } = require("sequelize"); 
const rupiah  = require('../helpers/rupiah'); 

class Controller {
    static home(req, res){  
    //aku butuh data list of field, list of category
        const {search, categories} = req.query
        let name = req.session.username

        let param = {
            include: [
                { 
                    model: Category, 
                    attributes: ['name']
                },
                { 
                    model: City, 
                    attributes: ['name']
                },
                { 
                    model: User, 
                    attributes: ['username']
                } 
            ] 
        }

        if(search) {
            param.where = { 
                  name: { [Op.iLike]: `%${search}%`}  
            }  
        }

        if(categories) {
            param.where = { 
                CategoryId: categories 
            }  
        }

        let fields ;
        Field.findAll(param)
        .then(data => {
            // console.log(data);
            fields = data
            return Category.findAll({
                attributes: ['id', 'name']
            })
        })
        .then(categories => {
            // res.send(fields)
            res.render('home', {fields, categories, name, rupiah})
        })
        .catch(err =>  res.send(err))
    }

    static detailFieldById(req, res){ 
        // satu data lapangan dari id, 
        const name = req.session.username
        let id = req.params.fieldId
        Field.findByPk(+id, {
            include : {
                all: true
            }
        })
        .then(data => {
            // res.send(data)
            res.render('detailField' , {data, name, rupiah})
        })
        .catch(err =>  res.send(err))
    }

    static postAddTransaction(req, res){
        const FieldId = +req.params.fieldId
        const {date, duration, description} = req.body
        const UserId = req.session.userId
        Field.findByPk(FieldId, {
            attributes:['price']
        })
        .then(field =>{
            const invoice = field.price  
            return Transaction.create({UserId, FieldId, date, description, duration, invoice})
        })
        .then(() => { 
            // res.render('detailField' , {data})
            res.send('success')
        })
        .catch(err =>  res.send(err))
    }
    
    static getEditProfile(req, res){
        res.send('ok')
    }
    static postEditProfile(req, res){
        res.send('ok')
    }
}

module.exports = Controller
 