const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { OAuth2Client } = require('google-auth-library');

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){
        try{
            //get oken from header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from the token
            req.user = await User.findById(decoded.id).select('-password')
            //req.user = await User.findById(decoded.id)

            next()
        }catch(error){
            res.status(401)
            throw new Error('not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('not authorized, no token')

    }
})


const protect1 = async function verify(client_id, jwtToken) {
    const client = new OAuth2Client(client_id);
    console.log(jwtToken);
    // Call the verifyIdToken to
    // varify and decode it
    const ticket = await client.verifyIdToken({
        idToken: jwtToken,
        audience: client_id,
    });
    // Get the JSON with all the user info
    const payload = ticket.getPayload();
    // This is a JSON object that contains
    // all the user info
    return payload;
}
module.exports = {protect,protect1}
