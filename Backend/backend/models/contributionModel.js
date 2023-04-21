const mongoose = require('mongoose')

const contributionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    goalId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Savings'
    },
    amount: {
        type: Number,
        required: [true, 'Add contibution amount']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Contributions', contributionSchema)
