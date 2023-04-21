const asyncHandler = require('express-async-handler')

const Savings = require('../models/savingsModel')
const User = require('../models/userModel')

// @desc get saving goal
// @route GET /api/saving
//access Private
const getUserSaving = asyncHandler(async (req,res) => {
    const saving = await Savings.find({user: req.user.id})
    res.status(200).json(saving)
})

const getSaving = asyncHandler(async (req,res) => {
    const saving = await Savings.findById(req.params.id)
    res.status(200).json(saving)
})

// @desc Set saving goal
// @route POST /api/saving
//access Private
const setSaving = asyncHandler(async (req,res) => {
    console.log("set saving")
    if (!req.body.goalName) {
        res.status(400)
        throw new Error ('Please insert valid goal name')
    }
    const saving = await Savings.create({
        user: req.user.id,
        goalName: req.body.goalName,
        target: req.body.target,
        endDate: req.body.endDate
    })
    res.status(200).json({saving})
})

// @desc update saving goal
// @route PUT /api/saving/:id
//access Private
const updateSaving = asyncHandler(async (req,res) => {
    const saving = await Savings.findById(req.params.id)

    if(!saving) {
        res.status(400)
        throw new Error('Saving Goal not found')
    }

    const user = await User.findById(req.user.id)
    //check user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    
    //make sure the logged in user matches the saving user
    if(saving.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not Authorized')
    }
    const updateSaving = await Savings.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updateSaving)
})

// @desc Delete saving goal
// @route DELETE /api/saving/:id
//access Private
const deleteSaving = asyncHandler(async (req,res) => {
    const saving = await Savings.findById(req.params.id)

    if(!saving) {
        res.status(400)
        throw new Error('Saving Goal not found')
    }

    const user = await User.findById(req.user.id)
    //check user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    
    //make sure the logged in user matches the saving user
    if(saving.user.toString() !== user.id){
        res.status(401) 
        throw new Error('User not Authorized')
    }

    const deleteSaving = await Savings.findByIdAndRemove(req.params.id)
    res.status(200).json(deleteSaving)
})

// @desc Get all savings
// @route GET /api/saving/getAll
// access Public
const getAllSavings = asyncHandler(async (req, res) => {
    const savings = await Savings.find({})
    res.json(savings)
  })

module.exports = {
    getSaving,
    getUserSaving,
    setSaving,
    updateSaving,
    deleteSaving,
    getAllSavings
}