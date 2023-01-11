const router = require('express').Router();

const Controller = require('../controllers');



// BERISI SEMUA ROUTER YANG BEBAS DIAKSES SIAPAPUN
router.get('/', Controller.home)
router.use('/auth', require('./auth'))

// BERISI SEMUA ROUTER YANG BUTUH AUTH LOGIN
router.use('/', require('./user'))


// BERISI SEMUA ROUTER YANG BUTUH AUTH LOGIN & ROLE ADMIN
router.use('/dashboard', require('./admin'))


module.exports = router