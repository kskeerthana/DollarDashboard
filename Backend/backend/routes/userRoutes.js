const express = require('express')
const { getUser } = require('../controllers/userController')
const { deleteUser } = require('../controllers/userController')
const { updateUserDetails, getAllUsers } = require('../controllers/userController')
const { loginUser } = require('../controllers/userController')
const router = express.Router()
const {registerUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/create', registerUser)
router.put('/edit/:id', protect, updateUserDetails)
router.post('/login', loginUser)
router.get('/getAll', getAllUsers)
router.delete('/delete', deleteUser)
router.get('/me', protect, getUser)

module.exports = router