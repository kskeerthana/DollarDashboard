const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const asyncHandler = require('express-async-handler')
const user_model = require('../models/userModel') 

const registerUser = asyncHandler(async (req,res) =>{
    const {name , email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please enter all fields') 
    }

    const userExists = await user_model.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    // console.log('Hashed password', hashedPassword)

    const new_user =  await user_model.create({
        name,
        email,
        password: hashedPassword,
    })

    if(new_user){
        res.status(201).json({
            _id : new_user.id,
            name : new_user.name,
            email : new_user.email,
            password : new_user.password,
            token : generateToken(new_user.id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
       
    }

})

const loginUser = asyncHandler(async (req,res) =>{
    const {email, password} = req.body

    const login_user = await user_model.findOne({email})

    if(login_user && (await bcrypt.compare(password, login_user.password))){
        res.json({
            _id : login_user.id,
            name : login_user.name,
            email : login_user.email,
            token : generateToken(login_user.id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getUser = asyncHandler(async (req,res) =>{
    const {_id,name,email} = await user_model.findById(req.user.id)

    res.status(200).json({
        id:_id,
        name,
        email,
    })
}) 


//generate token
const generateToken = (id) => {
    console.log('In generate token', id)
    // console.log(process.env.JWT_SECRET);
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}