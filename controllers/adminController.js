
 const { Field , Category, User, City, Transaction} = require('../models');
 const { Op } = require("sequelize");
const rupiah = require('../helpers/rupiah');

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
        const session = req.session
        let data = []
        let ownerFields = []

        Field.findAll({
            where:{
                UserId:id
            }
        })
        .then(fields =>{
           fields.forEach(el => {
             ownerFields.push(el.id)
           });
          return Transaction.findAll({
            where:{
                status:0,
            },
            include: [{
                model:Field,
                include:User,
                where:{
                  id:{
                    [Op.or]:ownerFields
                  }
                }
            }, {
                model:User
            }], 
        })
        })
        .then(allTransaction =>{
            data = allTransaction
            return User.findByPk(id)
        })
        .then(owner =>{
            // res.send({owner, data})
            res.render('dashboard', {owner,session, data})
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
                text: `Selamat!!
Anda telah membooking"${transaction.Field.name}" untuk tanggal ${transaction.date} Sukses 
invoice anda sebesar ${rupiah(transaction.invoice)}
                
Terimakasih
Sincerely,
goSport
                `
            }
            transporter.sendMail(mailOption, (err, info) =>{
                if(err) return res.send(err)
                return res.redirect('/dashboard')
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
                text: `Maaf!!
Booking "${transaction.Field.name}" untuk tanggal ${transaction.date} GAGAL
                
Terimakasih
Sincerely,
goSport
                `
            }
            transporter.sendMail(mailOption, (err, info) =>{
                if(err) return res.send(err)
                return res.redirect('/dashboard')
            })
        })
        .catch(err => res.send(err))  
    }


    //MENAMPILKAN LIST BOOKING WHERE DATE >= HARI INI
    static currentTransaction(req, res){
            const id = req.session.userId
            const session = req.session
            // const id = 1
            let data = []
            let ownerFields = []
    
            Field.findAll({
                where:{
                    UserId:id
                }
            })
            .then(fields =>{
               fields.forEach(el => {
                 ownerFields.push(el.id)
               });
              return Transaction.findAll({
                order:[
                    ['date', 'DESC']
                ],
                where:{
                    status:1,
                    date:{
                        [Op.gte]: new Date()
                    }
                },
                include: [{
                    model:Field,
                    include:User,
                    where:{
                      id:{
                        [Op.or]:ownerFields
                      }
                    }
                }, {
                    model:User
                }], 
            })
            })
            .then(allTransaction =>{
                data = allTransaction
                return User.findByPk(id)
            })
            .then(owner =>{
                res.render('onGoingBooking', {session, owner, data})
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
        .then((_) => res.redirect('/dashboard/fields'))
        .catch(err => {
            res.send(err)
        }) 
    }

    static showFields(req, res){
        const session = req.session
        const id = req.session.userId
        let fields = []
        Field.findAll({
            where:{
                UserId:id
            },
            include:{
                all:true
            }
        })
            .then(data =>{
               fields = data
                return User.findByPk(id)
            })
            .then(user =>{
                // res.send({fields, user})
                res.render('fields', {fields, session, user})
            })
            .catch(err => res.send(err))
        
    }
    static editField(req, res){
        const {fieldId} = req.params
        let categories = []
        let cities = []
        Category.findAll()
            .then(data =>{
                categories = data
                return City.findAll()
            })
            .then(data =>{
                cities = data
                return Field.findByPk(fieldId)
            })
            .then(field =>{
                // res.send({categories, cities, field})
                res.render('editField', {categories, cities, field})
            })
            .catch(err => res.send(err))
    }
    static posteditField(req, res){
       const {fieldId} =req.params
       const {name, price, CityId, CategoryId, imageUrl} = req.body
       Field.findByPk(fieldId)
       .then(data =>{
            data.update({name, price, CityId, CategoryId, imageUrl})
       })
        .then( (_) => res.redirect('/dashboard/fields'))
        .catch(err => res.send(err))
    }
    static deleteField(req, res){
        const {fieldId} =req.params
        Field.findByPk(fieldId)
        .then(data =>{
             data.destroy()
        })
         .then( (_) => res.redirect('/dashboard/fields'))
         .catch(err => res.send(err))
    }
    
    
}

module.exports = AdminController
 
 