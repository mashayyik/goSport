
 const { Field , Category, User, City, Transaction} = require('../models');
 const { Op } = require("sequelize");

class AdminController {
    
     //MENAMPILKAN LIST BOOKING WHERE STATUS = 0
    static home(req, res){
        // const id = req.session.userId
        Transaction.findAll({
            include: Field,
            where: {
                status: 0,
                UserId: 1 // ganti id
            }
        })
        .then(data =>{
            res.send(data)
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
        // const id = req.session.userId
        Transaction.findAll({
            include: Field,
            where: {
                date : {
                    UserId: 3, //ganti ke session
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
        res.send(ok)
    }

    static postAddField(req, res){
        res.send(ok)
    }
    
}

module.exports = AdminController
 
 