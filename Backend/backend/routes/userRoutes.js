const express = require('express')
const { getUser } = require('../controllers/userController')
const { deleteUser } = require('../controllers/userController')
const { updateUserDetails, getAllUsers, registerUserGoogleAuth } = require('../controllers/userController')
const { loginUser } = require('../controllers/userController')
const router = express.Router()
const {registerUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
//const {registerUser_New} = require('../controllers/userController')
//const {updateUserDetails_New} = require('../controllers/userController')
const multer = require("multer");
const { request } = require('express')
const{ imageUpload} = require('../controllers/userController')
const {getImage} = require('../controllers/userController')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../Backend/backend/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

//router.post('/create', registerUser)
router.post('/create', registerUser)
//router.put('/edit/:id', protect, updateUserDetails)
//router.put('/edit', protect, updateUserDetails)
router.put('/edit', protect, updateUserDetails)
router.post('/login', loginUser)
router.get('/getAll', getAllUsers)
router.delete('/delete', deleteUser)
router.get('/me', protect, getUser)
router.post('/createUsingGoogle', registerUserGoogleAuth)
router.post("/imageUpload", protect,upload.single("testImage"), imageUpload)
router.get('/imageGet',getImage )

module.exports = router