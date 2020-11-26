const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const tenantController = require('./controllers/tenantController')
const roomController = require('./controllers/roomController')
const contractController = require('./controllers/contractController')
const receiptController = require('./controllers/receiptController')
const expenseController = require('./controllers/expenseController')
const messageController = require('./controllers/messageController')



router.get('/', userController.home)
//router.get('/admin', userController.login)
router.get('/register', userController.register)


router.get('/about', function (req, res) {
    res.send("This is our about Page")

})
router.get('/login', userController.login)

router.post('/login', userController.postlogin)
router.post('/logout', userController.logout)
router.post('/register', userController.postRegister)
router.get('/tenantRegistration', tenantController.tenatRegister)
router.post('/tenantRegistration', tenantController.postTenantRegister)

router.get('/room', roomController.room)
router.post('/room', roomController.postRoom)


router.get('/contract', userController.mustBeLoggedIn, contractController.getContract)
router.post('/contract',userController.mustBeLoggedIn ,contractController.postContractRegister)
router.get('/allcontracts',userController.mustBeLoggedIn,contractController.viewAllContract)
router.get('/contract/:id',userController.mustBeLoggedIn,contractController.viewSingle)
router.post('/contract/:id',userController.mustBeLoggedIn,contractController.UpdateContract)
router.post('/allcontracts/:id',userController.mustBeLoggedIn,contractController.DeleteContract)




router.get('/receipt', userController.mustBeLoggedIn, receiptController.getReceipt)
router.post('/receipt', userController.mustBeLoggedIn, receiptController.postReceipt)
router.get('/allreceipts', userController.mustBeLoggedIn, receiptController.getAllReceipts)
router.get('/receipt/:id', userController.mustBeLoggedIn, receiptController.viewSingle)
router.post('/receipt/:id',userController.mustBeLoggedIn,receiptController.UpdateReceipt)
router.post('/allreceipts/:id',userController.mustBeLoggedIn,receiptController.DeleteReceipt)


router.get('/expense', userController.mustBeLoggedIn,  expenseController.getExpense)
router.post('/expense', userController.mustBeLoggedIn, expenseController.postExpense)



///Tenant router

router.get('/viewMessage', messageController.viewMessage)
router.get('/newMessage', messageController.newMessage)


module.exports = router