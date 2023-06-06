const express = require('express')
const router = express.Router()
const { 
    getContribution,
    getAllContributions,
    getUserContribution,
    setContribution,
    updateContribution,
    deleteContribution,
    getGoalContribution,
    getUserContributionById
} = require('../controllers/contributionController')
const {protect} = require('../middleware/authMiddleware')
router.get('/:id', getGoalContribution)
router.get('/user/:id', getUserContributionById)
router.route('/get').get(getAllContributions)

router.route('/').get(protect, getUserContribution).post(protect, setContribution) 

router.route('/:id').get(protect, getContribution).put(protect, updateContribution).delete(protect, deleteContribution)





module.exports = router