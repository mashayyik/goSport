
 const { Field , Category, User, City, Transaction} = require('../models');
 const { Op } = require("sequelize");
 const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:"gosport.pairpoject@gmail.com",
            pass:"tbxpiuosjuitwpig"
        }
    })

class AdminController {
    
     //MENAMPILKAN LIST BOOKING WHERE STATUS = 0
    static home(req, res){
        const id = req.session.userId
        // const id = 1
        let data = []
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
        .then(transactions =>{
            data = transactions
            return User.findByPk(+id)
        })
        .then(user =>{
            // res.send({user, data})
            res.render('dashboard', {user, data})
        })
        .catch(err => res.send(err)) 
    }

    //ROUTES UNTUK MENGAPROVE TRANSACTION (UBAH STATUS JADI 1)
    static approveTransaction(req, res){
        const {transactionId} = req.params
        let transaction = {}

        Transaction.findByPk(transactionId,{
            include:{
                all:true
            }}
            )
        .then(data =>{
            transaction = data
            return data.update({'status':1})
        }) 
        .then((_) =>{
           return Field.findOne({
                where:{
                    id: transaction.FieldId
                }
            })
        })
        .then(field =>{
            return field.increment("transactionTotal")
        })
        .then((_) =>{
            const mailOption ={
                from: 'gosport.pairpoject@gmail.com',
                to: `${transaction.User.email}`,
                subject: `Booking untuk "${transaction.Field.name}" Sukses`,
                text: `Selamat, Anda telah membooking"${transaction.Field.name}" untuk tanggal ${transaction.date} Sukses, invoice anda sebesar ${transaction.invoice}`
            }
            transporter.sendMail(mailOption, (err, info) =>{
                if(err) return res.send(err)
                res.send(`sukses`)
            })
        })
        .catch(err => res.send(err))  
    }
    
    //ROUTES UNTUK REJECT TRANSACTION (UBAH STATUS JADI 2)
    static rejectTransaction(req, res){
        const {transactionId} = req.params
        let transaction = {}

        Transaction.findByPk(transactionId,{
            include:{
                all:true
            }}
            )
        .then(data =>{
            transaction = data
        }) 
        .then((_) =>{
            const mailOption ={
                from: 'gosport.pairpoject@gmail.com',
                to: `${transaction.User.email}`,
                subject: `Booking untuk "${transaction.Field.name}" Gagal`,
                text: `Maaf, "${transaction.Field.name}" untuk tanggal ${transaction.date} tidak bisa di proses`
            }
            transporter.sendMail(mailOption, (err, info) =>{
                if(err) return res.send(err)
                res.send(`sukses`)
            })
        })
        .catch(err => res.send(err))  
    }


    //MENAMPILKAN LIST BOOKING WHERE DATE >= HARI INI
    static currentTransaction(req, res){
        const id = req.session.userId
        // const id = 1
        let data = []
        Transaction.findAll({
            include: {
                model:Field,
                include:User
            },
            where: {
                UserId: id,
                date : {
                    [Op.gte]: new Date()
                },
                status:{
                    [Op.eq]:1
                }
            }
        })
        .then(transactions =>{
            data = transactions
            return User.findByPk(+id)
        })
        .then(user =>{
            // res.send({user, data})
            res.render('onGoingBooking', {user, data})
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
 
 