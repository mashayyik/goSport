class AuthController {
    static home(req, res){
        res.redirect('/auth/login')
    }

    static getLogin(req, res){
        res.send('ok')
    }

    static postLogin(req, res){
        res.send('ok')
    }
    static getRegister(req, res){
        res.send('ok')
    }

    static postRegister(req, res){
        res.send('ok')
    }
}

module.exports = AuthController
 