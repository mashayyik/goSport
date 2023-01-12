const router = require('express').Router();


const AdminController = require('../controllers/adminController');

router.use((req, res, next) =>{
    console.log(req.session)
    if(!req.session.userId){
      return res.redirect('/auth/login?errors=Please Login First')
    }
    if(req.session.role != "provider"){
        return res.redirect('/auth/login?errors=You dont have access to dashboard, login as provider required') 
    }
    next()
  })
  
router.get('/', AdminController.home)
router.get('/fields', AdminController.showFields)
router.get('/addField', AdminController.addField)
router.post('/addField', AdminController.postAddField)
router.get('/fields/:fieldId/edit', AdminController.editField)
router.post('/fields/:fieldId/edit', AdminController.posteditField)
router.get('/fields/:fieldId/delete', AdminController.deleteField)
router.get('/current-transaction', AdminController.currentTransaction)
router.get('/:transactionId/approve', AdminController.approveTransaction)
router.get('/:transactionId/reject', AdminController.rejectTransaction)


module.exports = router