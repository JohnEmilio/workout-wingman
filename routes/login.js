const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login')

router.post('/userLogin', loginController.userLogin)
router.post('/newUser', loginController.createUser)


module.exports = router