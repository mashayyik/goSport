const router = require('express').Router();

const Controller = require('../controllers');


router.use((req, res, next) =>{
  console.log(req.session)
  if(!req.session.userId){
    return res.redirect('/auth/login?errors=Please Login First')
  }
  if(req.session.role != "user"){
      return res.redirect('/auth/login?errors=Please Login as user to books a field') 
  }
  next()
})
// ROUTES UNTUK MEMBUAT TRANSAKSI BARU
router.post('/transaction/:fieldId/add', Controller.postAddTransaction)

module.exports = router