const express = require('express')
const router = express.Router()
const { 
    getSaving,
    getUserSaving,
    setSaving,
    updateSaving,
    deleteSaving,
    getAllSavings,
    adminDeleteSaving,
    adminUpdateSaving
} = require('../controllers/savingsController')
const {protect} = require('../middleware/authMiddleware')

router.route('/getAll').get(protect, getAllSavings)

router.route('/').get(protect, getUserSaving).post(protect, setSaving) 

router.route('/:id').get(protect, getSaving).put(protect, updateSaving).delete(protect, deleteSaving)

router.route('/admin/:id').delete(adminDeleteSaving).put(adminUpdateSaving)


module.exports = router