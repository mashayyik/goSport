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

  const isAdmin = (req, res, next) =>{
    console.log(req.session);
    if(req.session.role == "provider"){
      next()
    }else{
      res.redirect('/auth/login?errors=You dont have access to dashboard page')
    }
  }
  const isUser = (req, res, next) =>{
    console.log(req.session);
    if(req.session.role == "user"){
      next()
    }else{
      res.redirect('/auth/login?errors=Youre provider, cant book fields')
    }
  }
  

  // BERISI SEMUA ROUTER YANG BUTUH AUTH LOGIN & ROLE ADMIN (SESSION && SESSION.ROLE :PROVIDER)
  router.use('/dashboard', isAdmin, require('./admin'))

// BERISI SEMUA ROUTER YANG BUTUH AUTH LOGIN  (SESSION && SESSION.ROLE :USER)
router.use('/', isUser, require('./user'))

router.get('/logout', AuthController.logout)


module.exports = router