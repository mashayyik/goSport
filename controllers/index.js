
 const { Field , Category, User} = require('../models');

 const { Op } = require("sequelize");

class Controller {
    static home(req, res){  
        const {search, categories} = req.query

        let param = {
            include: [
                { model: Category },
                { model: User }
            ] 
        }

        if(search) {
            param.where = { 
                  name: { [Op.iLike]: `%${search}%`}  
            }  
        }

        if(categories) {
            param.where = { 
                  name: { [Op.iLike]: `%${search}%`}  
            }  
        }

        //aku butuh data list of field, list of category
        let fields ;
        Field.findAll(param)
        .then(data => {
            console.log(data);
            fields = data
            return Category.findAll({
                attributes: ['id', 'name']
            })
        })
        .then(categories => {
            res.render('home', {fields,categories})
        })
        .catch(err =>  res.send(err))
    }

    static detailFieldById(req, res){ 
        // satu data lapangan dari id, 
        let id = req.params.fieldId
        Field.findByPk(+id, {
            include:{
                all:true
            }
        })
        .then(data => {
            // res.send(data)
            res.render('detailField' , {data})
        })
        .catch(err =>  res.send(err))
    }

    static postAddTransaction(req, res){
        const {fieldId} = req.params
        const {UserId, date, duration, description} = req.body
        res.send({fieldId, UserId, date, duration, description})
    }
    
    static getEditProfile(req, res){
        res.send('ok')
    }
    static postEditProfile(req, res){
        res.send('ok')
    }
}

module.exports = Controller
 