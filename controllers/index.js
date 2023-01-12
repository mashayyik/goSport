
 const { Field , Category} = require('../models');

class Controller {
    static home(req, res){
        //aku butuh data list of field, list of category
        let fields ;
        Field.findAll()
        .then(data => {
            fields = data
            return Category.findAll({
                attributes: ['id', 'name']
            })
        })
        .then(categories => {
            res.send({fields,categories})
        })
        .catch(err =>  res.send(err))
    }

    static detailFieldById(req, res){ 
        // satu data lapangan dari id, 
        let id = req.params.fieldId
        Field.findByPk(+id)
        .then(data => {
            res.send(data)
        })
        .catch(err =>  res.send(err))
    }

    static getAddTransaction(req, res){
        res.send('ok')
    }

    static postAddTransaction(req, res){
        res.send('ok')
    }
    
    static getEditProfile(req, res){
        res.send('ok')
    }
    static postEditProfile(req, res){
        res.send('ok')
    }
}

module.exports = Controller
 