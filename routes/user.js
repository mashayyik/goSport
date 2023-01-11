const router = require('express').Router();

const Controller = require('../controllers');

// ROUTES UNTUK MEMBUAT TRANSAKSI BARU
router.get('/transaction/add', Controller.getAddTransaction)
router.get('/transaction/add', Controller.postAddTransaction)

// ROUTES UNTUK EDIT PROFILE
router.get('/editProfile', Controller.getEditProfile)
router.post('/editProfile', Controller.postEditProfile)



module.exports = router