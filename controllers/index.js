class Controller {
    static home(req, res){
        res.render('home')
    }
    static detailFieldById(req, res){
        res.render('ok')
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
 