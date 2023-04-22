const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const user = require('../models/userModel')

const protect = asyncHandler(async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //getting token from header
            token = req.headers.authorization.split(' ')[1]
            //verifying token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //getting user from the token
            req.user = await user.findById(decoded.id).select('-password')
            
            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized')
    }
})

module.exports = {protect}