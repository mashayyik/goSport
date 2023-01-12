
 const { Field , Category, User, City, UserDetail} = require('../models');


class AuthController {
    static home(req, res){
        res.redirect('/auth/login')
    }

    static getLogin(req, res){
        let error = req.query.errorLogin
        res.render('login', {error})
    }

    static postLogin(req, res){
        const {username, password} = req.body ;

        User.findOne({ 
            where : {
                username: username
            }
        })
        .then(data => {
            if(!data) {
                res.redirect('/auth/login?errorLogin=username is not found')
            } else if(data.password !== password){
                res.redirect('/auth/login?errorLogin=password is false')
            } else {
               // session di sini 
               res.send('sukses')
            } 
        })
        .catch(err => res.send(err)) 
    }
    static getRegister(req, res){
       City.findAll()
       .then(cities =>{
        res.render('register', {cities})
       })
       .catch(err => res.send(err))
    }

    static postRegister(req, res){
        const {username, email, password, name, dateOfBirth, role, gender, CityId} = req.body;

        User.create({username, password, role, email})
        .then(() => {
            console.log('user masuk');
            return User.findOne({
                attributes: ['id'],
                where: {
                    username: username
                }
            })
        })
        .then(data => {  
            return UserDetail.create({name, gender, CityId, dateOfBirth, UserId: data.id })
        })
        .then(() => {
            console.log('user detail masuk');
            res.send('sukses register')
        })
        .catch(err => {
            if(err.name == 'SequelizeUniqueConstraintError'){
                return res.send('username sudah ada')
                // return res.redirect('/auth/register?')
            }
            res.send(err)
        }) 
    }
}

module.exports = AuthController
 