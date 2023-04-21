const express = require('express')
const router = express.Router()
const { 
    getSaving,
    getUserSaving,
    setSaving,
    updateSaving,
    deleteSaving,
    getAllSavings
} = require('../controllers/savingsController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getUserSaving).post(protect, setSaving) 

router.route('/:id').get(protect, getSaving).put(protect, updateSaving).delete(protect, deleteSaving)

router.get('/getAll', getAllSavings)


module.exports = router