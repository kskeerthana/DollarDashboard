const mongoose = require('mongoose')

const savingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    goalName: {
        type: String,
        required: [true, 'Please add a goal name']
    },
    target: {
        type: Number,
        required: [true, 'Add goal target']
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Savings', savingSchema)
