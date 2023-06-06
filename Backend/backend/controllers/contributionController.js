const asyncHandler = require('express-async-handler')

const Contributions = require('../models/ContributionModel')
const Savings = require('../models/savingsModel')
const User = require('../models/userModel')

// Define a pre-save middleware function for the Contribution model
// contributionSchema.pre('save', async function(next) {
//     try {

//         console.log("in pre")
//       // Find the corresponding saving document based on the goalId
//       const saving = await Savings.findById(this.goalId);
  
//       // Calculate the total sum of all the contributions towards this goal
//       const contributions = await Contribution.find({ goalId: this.goalId });
//       const totalContributions = contributions.reduce((sum, c) => sum + c.amount, 0);
  
//       // Update the progress field in the saving document
//       saving.progress = totalContributions;
//       await saving.save();
  
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });

// @desc get contribution goal
// @route GET /api/contribution
//access Private
const getUserContribution = asyncHandler(async (req,res) => {
    const contribution = await Contributions.find({user: req.user.id})
    res.status(200).json(contribution)
})

const getContribution = asyncHandler(async (req,res) => {
    const contribution = await Contributions.findById(req.params.id)
    res.status(200).json(contribution)
})

const getGoalContribution = asyncHandler(async (req,res) => {
    console.log(req.params.id);
    const contribution = await Contributions.find({goalId: req.params.id})
    res.status(200).json(contribution)
    console.log(contribution)
})

const getAllContributions = asyncHandler(async (req, res) => {
    console.log("in contri")
    const allContributions = await Contributions.find()
    res.status(200).json(allContributions)
  })

const getUserContributionById = asyncHandler(async (req,res) => {
    console.log(req.params.id);
    const contribution = await Contributions.find({user: req.params.id})
    res.status(200).json(contribution)
    console.log(contribution)
})

// @desc Set contribution goal
// @route POST /api/contribution
//access Private
const setContribution = asyncHandler(async (req,res,next) => {

    try {
        if (!req.body.goalId) {
            res.status(400)
            throw new Error ('Please insert valid goal ID')
        }
        const contribution = await Contributions.create({
            user: req.user.id,
            goalId: req.body.goalId,
            amount: req.body.amount,
        })
        res.status(200).json({contribution})
        const savings = await Savings.findByIdAndUpdate(
            contribution.goalId,
            { $inc: { progress: contribution.amount } },
            { new: true }
          );
          console.log(`Savings updated with new progress: ${savings.progress}`);
        
      } catch (error) {
        next(error);
      }    
})

// @desc update contribution goal
// @route PUT /api/contribution/:id
//access Private
const updateContribution = asyncHandler(async (req,res) => {
    const contribution = await Contributions.findById(req.params.id)

    if(!contribution) {
        res.status(400)
        throw new Error('contribution Goal not found')
    }

    const user = await User.findById(req.user.id)
    //check user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    
    //make sure the logged in user matches the contribution user
    if(contribution.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not Authorized')
    }
    const updateContribution = await Contributions.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updateContribution)
})

// @desc Delete contribution goal
// @route DELETE /api/contribution/:id
//access Private
const deleteContribution = asyncHandler(async (req,res) => {
    try {
        const contribution = await Contributions.findById(req.params.id);
    
        // If the contribution doesn't exist, return a 404 error
        if (!contribution) {
          return res.status(404).send();
        }
    
        await Contributions.findByIdAndRemove(req.params.id);
        res.send(contribution);
    
        // Update the savings' progress field with the new total amount
        const savings = await Savings.findByIdAndUpdate(
          contribution.goalId,
          { $inc: { progress: -contribution.amount } },
          { new: true }
        );
        console.log(`Savings updated with new progress: ${savings.progress}`);
      } catch (error) {
        console.error(error);
        res.status(500).send();
      }
})

// @desc Get all Contributions
// @route GET /api/contribution/getAllContributions
// access Public


module.exports = {
    getContribution,
    getUserContribution,
    getGoalContribution,
    setContribution,
    updateContribution,
    deleteContribution,
    getAllContributions,
    getUserContributionById
}