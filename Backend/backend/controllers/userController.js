const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Create a user
// @route Post /api/user/create
// access Public
const registerUser = asyncHandler( async (req,res) =>{

    const {name, email,password}= req.body

    if (!name || !name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
        res.status(400);
        throw new Error('Please enter a valid full name');
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
        res.status(400);
        throw new Error("Please enter a valid name");
      }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const validEmail = emailRegex.test(email) && email.endsWith('@northeastern.edu')
    if (!validEmail) {
    res.status(400)
    throw new Error('Please enter a valid Northeastern University email address')
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const validPassword = passwordRegex.test(password)
    if (!validPassword) {
    res.status(400)
    throw new Error('Please enter a valid password (minimum eight characters, at least one uppercase letter, one lowercase letter and one number)')
    }

    //Check if user exist
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid User data')
    }

})


// @desc Get all users
// @route GET /api/user/getAll
// access Public
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })

// @desc Authenticate a user
// @route PUT /api/user/edit
// access Private
const updateUserDetails = asyncHandler(async (req, res) => {
    const { name, password, email } = req.body;

    
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    if(email){
        res.status(400)
        throw new Error('You can\'t update your email' )
    }
    if(name){
        if (!name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
            res.status(400);
            throw new Error('Please enter a valid full name');
        }
    }
    let hashedPassword;
    if(password){
        const salt = await bcrypt.genSalt(10)
        hashedPassword = await bcrypt.hash(password, salt)
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const validPassword = passwordRegex.test(password)
    if (!validPassword) {
    res.status(400)
    throw new Error('Please enter a valid password (minimum eight characters, at least one uppercase letter, one lowercase letter and one number)')
    }
    }

    
  
    user.name = name || user.name;
    user.password = hashedPassword || user.password;
  
    const updatedUser = await user.save();
  
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
    });
  });

// @desc Authenticate a user
// @route Post /api/users/login
// access Public
const loginUser = asyncHandler( async (req,res) =>{
    const {email, password} = req.body

    // check user email
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User credentials')
    }

})

// @desc delete user data
// @route Delete /api/users/delete
// access Public
const deleteUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    
    const user = await User.findOneAndDelete({ email });
    
    if (!user) {
    res.status(404);
    throw new Error('User not found');
    }
    
    res.status(200).json({ message: 'User deleted successfully' });
    });

// @desc get user data
// @route get /api/users/me
// access Private
const getUser = asyncHandler(async (req,res) =>{

    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    registerUser,
    updateUserDetails,
    loginUser,
    getAllUsers,
    deleteUser,
    getUser
}