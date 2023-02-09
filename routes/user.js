const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/', userController.getExercises)
router.post('/data', userController.getUserData)
router.post('/create', userController.createWorkout)
router.post('/create/add', userController.newWorkout)
router.delete('/log/delete', userController.deleteWorkout)
router.put('/log/edit', userController.findWorkout)
router.put('/log/edit/submit', userController.editWorkout)


module.exports = router