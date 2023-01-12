const router = require('express').Router();

const Controller = require('../controllers');
const AuthController = require('../controllers/authController');



// BERISI SEMUA ROUTER YANG BEBAS DIAKSES SIAPAPUN


  
  router.get('/', Controller.home)
  router.get('/fields/:fieldId', Controller.detailFieldById)
  router.use('/auth', require('./auth'))
  
  
  // MIDDLE WARE
  router.use((req, res, next) =>{
    console.log(req.session)
    if(!req.session.userId){
      return res.redirect('/auth/login?errors=Please Login First')
    }
    next()
  })
  
  
  router.get('/logout',  (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
  });
  

  router.use('/dashboard', require('./admin'))
  // BERISI SEMUA ROUTER YANG BUTUH AUTH LOGIN & ROLE ADMIN (SESSION && SESSION.ROLE :PROVIDER)
  

   // BERISI SEMUA ROUTER YANG BUTUH AUTH LOGIN  (SESSION && SESSION.ROLE :USER)
   router.use('/', require('./user'))




module.exports = router