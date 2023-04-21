const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        img: {
            data: Buffer,
            contentType: String,
          },
          
        name: {
            type: String,
            // required: [true, 'please add a name']
        },
        email: {
            type: String,
            // required: [true, 'please add a email'],
            unique: true
        },
        password: {
            type: String,
           
        },
        age: {
            type: String,
            
        },
        gender: {
            type: String,
           // required: [true, 'please add a password']
        },
        contact: {
            type: String,
            //required: [true, 'please add a password']
        },
        googleSignIn: {
            type: Boolean,
            // default: true
        },
        isAdmin:{
            type: Boolean,
            default:false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('UserLogin_DollarDashBoard', userSchema)
//module.exports = mongoose.model('User', userSchema)