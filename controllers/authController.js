
 const { Field , Category, User, City} = require('../models');


class AuthController {
    static home(req, res){
        res.redirect('/auth/login')
    }

    static getLogin(req, res){
        res.render('login')
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
                res.send('/auth/login?errorLogin=username is not found')
            } else if(data.password !== password){
                res.send('/auth/login?errorLogin=password is false')
            } else {
               // session di sini 
            }
            // console.log(data);
        })
        .catch(err => res.send(err))

        // console.log();
        // res.send('ok')
    }
    static getRegister(req, res){
        res.send('ok')
    }

    static postRegister(req, res){
        res.send('ok')
    }
}

module.exports = AuthController
 