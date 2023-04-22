const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const transactionSchema = new Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId, 
        required:true, 
        ref: 'user'
    },
    category: {type: String, required:true},
    amount: {type: Number, required: true},
    description : {type: String},
    date: {type: Date, required: true}
    
},
{
    timestamps:true,
} );
 
module.exports = mongoose.model("Transactions", transactionSchema);