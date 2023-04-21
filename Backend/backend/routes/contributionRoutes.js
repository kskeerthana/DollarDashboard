const express = require('express')
const router = express.Router()
const { 
    getContribution,
    getUserContribution,
    setContribution,
    updateContribution,
    deleteContribution,
    getGoalContribution,
    getAllContributions
} = require('../controllers/contributionController')
const {protect} = require('../middleware/authMiddleware')
router.get('/:id', getGoalContribution)

router.route('/').get(protect, getUserContribution).post(protect, setContribution) 

router.route('/:id').get(protect, getContribution).put(protect, updateContribution).delete(protect, deleteContribution)

router.get('/getAll', getAllContributions)



module.exports = router