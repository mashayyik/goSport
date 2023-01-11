class AdminController {
    
     //MENAMPILKAN LIST BOOKING WHERE DATE >= STATUS = 0
    static home(req, res){
        res.send('ok')
    }

    //ROUTES UNTUK MENGAPROVE TRANSACTION (UBAH STATUS JADI 1)
    static approveTransaction(req, res){
        const {transactionId} = req.params
        
        res.send('ok')
    }
    
    //ROUTES UNTUK REJECT TRANSACTION (UBAH STATUS JADI 2)
    static rejectTransaction(req, res){
        const {transactionId} = req.params
        res.send('ok')
    }


    //MENAMPILKAN LIST BOOKING WHERE DATE >= HARI INI
    static currentTransaction(req, res){

        res.send('ok')
    }

    static addField(req, res){
        res.send(ok)
    }

    static postAddField(req, res){
        res.send(ok)
    }
    
}

module.exports = AdminController
 