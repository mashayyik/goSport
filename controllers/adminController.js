
 const { Field , Category, User, City, Transaction} = require('../models');
 const { Op } = require("sequelize");

class AdminController {
    
     //MENAMPILKAN LIST BOOKING WHERE STATUS = 0
    static home(req, res){
        // const id = req.session.userId
        const id = 1
        let transactions = []
        Transaction.findAll({
            include: {
                model:Field,
                include:User
            },
            where: {
                status: 0,
                UserId: id
            }
        })
        .then(data =>{
            transactions = data
            return User.findByPk(+id)
        .then(user =>{
            // res.send({user, data})
            res.render('dashboard', {user, data})
        })
        })
        .catch(err => res.send(err)) 
    }

    //ROUTES UNTUK MENGAPROVE TRANSACTION (UBAH STATUS JADI 1)
    static approveTransaction(req, res){
        const {transactionId} = req.params
        Transaction.update({status: 1}, {
            where: {
                id: transactionId
            }
        })
        .then(data =>{
            res.send('qapprove')
        })
        .catch(err => res.send(err))  
    }
    
    //ROUTES UNTUK REJECT TRANSACTION (UBAH STATUS JADI 2)
    static rejectTransaction(req, res){
        const {transactionId} = req.params
        Transaction.update({status: 2}, {
            where: {
                id: transactionId
            }
        })
        .then(data =>{
            res.send('approve')
        })
        .catch(err => res.send(err)) 
    }


    //MENAMPILKAN LIST BOOKING WHERE DATE >= HARI INI
    static currentTransaction(req, res){
        const id = req.session.userId
        Transaction.findAll({
            include: Field,
            where: {
                date : {
                    UserId: id,
                    [Op.gte]: new Date()
                }
            }
        })
        .then(data =>{
            res.send(data)
        })
        .catch(err => res.send(err))  
    }

    static addField(req, res){
        let cities; 
        City.findAll()
        .then(data =>{
            cities= data
            return Category.findAll() 
        })
        .then(categories => { 
            res.render('addField', {cities, categories})
        })
        .catch(err => res.send(err))  
    }

    static postAddField(req, res){
        console.log(req.body);
        const {name, price, CityId, CategoryId, imageUrl} = req.body;
        const UserId = req.session.userId
        Field.create({name, price, CityId, CategoryId, UserId, imageUrl})
        .then(() => {
            res.send('sukses add field')
        })
        .catch(err => {
            res.send(err)
        }) 
    }
    
}

module.exports = AdminController
 
 