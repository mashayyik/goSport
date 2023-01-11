const router = require('express').Router();

const AuthController = require('../controllers/authController');

// ROUTES UNTUK LOGIN
router.get('/', AuthController.home)
router.get('/login', AuthController.getLogin)
router.post('/login', AuthController.postLogin)


//ROUTES UNTUK REGISTER
router.get('/register', AuthController.getRegister)
router.post('/register', AuthController.postRegister)



module.exports = router