
 const { Field , Category, User, City, UserDetail} = require('../models');
 const bcrypt = require('bcryptjs');
class AuthController {
    static home(req, res){
        res.redirect('/auth/login')
    }

    static getLogin(req, res){
        let {errors} = req.query
        res.render('login', {errors})
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
                return res.redirect('/auth/login?errors=username is not found')
            } 
            if(!bcrypt.compareSync(password, data.password)){
               return  res.redirect('/auth/login?errors=password is false')
            } 
               //! session di sini 
                req.session.userId = data.id
                req.session.username = data.username
                req.session.role = data.role
                switch (data.role) {
                    case "provider": return res.redirect('/dashboard')
                    case "user": return res.redirect('/')                 
                }
        })
        .catch(err => {
            res.send(err)})
    }
    static getRegister(req, res){
        const {errors} = req.query
       City.findAll()
       .then(cities =>{
        res.render('register', {cities,errors})
       })
       .catch(err => {
        console.log(err);
        res.send(err)})
    }

    static postRegister(req, res){
        const {username, email, password, name, dateOfBirth, role, gender, CityId} = req.body;
        let errors = []
        if(!username){
            errors.push('username is Required')
        }
        if(!email){
            errors.push('email is Required')
        }
        if(!password){
            errors.push('password is Required')
        }
        if(!name){
            errors.push('Full Name is Required')
        }
        if(!dateOfBirth){
            errors.push('Date Of Birth is Required')
        }
        if(!role){
            errors.push('Role is Required')
        }
        if(!gender){
            errors.push('Gender is Required')
        }
        if(!CityId){
            errors.push('CityId is Required')
        }
        if(errors.length > 0) return res.redirect(`/auth/register?errors=${errors}`)

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
        .then((_) => res.redirect('/auth/login'))
        .catch(err => {
            if(err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError'){
                errors = err.errors.map(el => el.message)
                return res.redirect(`/auth/register?errors=${errors}`)
            } 
            
            
            else{
                res.send(err)
            }
        }) 
    }
    static logout(req, res){
        req.session.destroy()
            .then((_) => res.redirect('/'))
            .catch(err => res.send(err))
    }
}

module.exports = AuthController
 