const jwt = require('jsonwebtoken')
//const { expressjwt: expressJwt } = require('express-jwt');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { OAuth2Client } = require('google-auth-library');
const imageModel = require('../models/userImage');
const fs = require("fs");

// @desc Create a user
// @route Post /api/user/create
// access Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
        res.status(400);
        throw new Error('Please enter a valid full name');
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
        res.status(400);
        throw new Error("Please enter a valid name");
      }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // const validEmail = emailRegex.test(email) && email.endsWith('@northeastern.edu')
    // if (!validEmail) {
    // res.status(400)
    // throw new Error('Please enter a valid Northeastern University email address')
    // }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const validPassword = passwordRegex.test(password)
    if (!validPassword) {
        res.status(400)
        throw new Error('Please enter a valid password (minimum eight characters, at least one uppercase letter, one lowercase letter and one number)')
    }

    //Check if user exist
    const userExists = await User.findOne({ email })
    // const userExists = await UserModelDetails.findOne()

    if (userExists) {
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
    else {
        res.status(400)
        throw new Error('Invalid User data')
    }

})

const registerUserGoogleAuth = asyncHandler(async (req, res) => {

    console.log('inReq');
    console.log(req.body.e.credential);
    const { credential } = req.body.e
    const client_id = '495016874659-ovv7sk179v4btf1e7pig37napq6kfu1u.apps.googleusercontent.com';
    //const payLoad1 = verify('495016874659-ovv7sk179v4btf1e7pig37napq6kfu1u.apps.googleusercontent.com',credential);
    const client = new OAuth2Client(client_id);
    const ticket = await client.verifyIdToken({
        idToken: req.body.e.credential,
        audience: client_id,
    });
    console.log(ticket);
    const payload1 = ticket.getPayload();
    console.log('returned payload')
    //console.log(payload1.email)
    const email = payload1.email;
    const name = payload1.name;
    const password = 'Testing@123#';

    // //Check if user exist
    //const userExists = await UserGoogle.findOne({email})
    //const userExists = await UserGoogle.findOne({ email })
    const userExists = await User.findOne({ email })
    //const userExists = await UserModelDetails.findOne({email})
    //const userExists = await  User.findOne({email});
    if (userExists) {
        //if(userExists && (await bcrypt.compare(password, userExists.password))){
        if (userExists && userExists.googleSignIn) {
            console.log('user exist')
            res.json({
                _id: userExists.id,
                name: userExists.name,
                email: userExists.email,
                token: generateToken(userExists._id)
            })
        }
    }
    else {

        console.log('creating user')
        //create user
        const user = await User.create({
            name,
            email,
            age: '',
            gender: '',
            contact: '',
            googleSignIn: true
        })

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400)
            throw new Error('Invalid User data')
        }
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
    const { name, password, email, age, gender, contact, googleSignIn, } = req.body;
    var user;
    console.log('Update user details');
    console.log(req.user.id);
    console.log(req.body)
    user = await User.findById(req.user.id);
    console.log(user)

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    if (email) {
        res.status(400)
        throw new Error('You can\'t update your email')
    }
    if (name) {
        if (!name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
            res.status(400);
            throw new Error('Please enter a valid full name');
        }
    }

    console.log(googleSignIn)

    user.name = name,
    user.email = user.email,
    user.age = age,
    user.gender = gender,
    user.contact = contact

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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // check user email
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
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
const getUser = asyncHandler(async (req, res) => {

    const { _id, name, email, password, age, gender, contact, img} = await User.findById(req.user.id)

    console.log(password)

    res.status(200).json({
        id: _id,
        name,
        email,
        password,
        age,
        gender,
        contact,
        img,
    })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

const imageUpload = asyncHandler(async (req, res) => {
    console.log(req.user.id);
    console.log(req.body.name);
    console.log(req.body.img);
    // const saveImage = imageModel({
    const user = await User.findById(req.user.id);
    console.log('User Exist');
    console.log(user);
    const saveImage = {
                data: fs.readFileSync("../Backend/backend/uploads/" + req.file.filename),
                contentType: "image/png",
            }
    user.img = saveImage
        user.save()
        .then((res) => {
            console.log("image is saved");
        })
        .catch((err) => {
            console.log(err, "error has occur");
        });
    res.send('image is saved');
})

const getImage = asyncHandler(async (req, res) => {
    const allData = await imageModel.find()
    res.json(allData)
})

module.exports = {
    registerUser,
    updateUserDetails,
    loginUser,
    getAllUsers,
    deleteUser,
    getUser,
    registerUserGoogleAuth,
    // registerUser_New,
    // updateUserDetails_New
    imageUpload,
    getImage,
}