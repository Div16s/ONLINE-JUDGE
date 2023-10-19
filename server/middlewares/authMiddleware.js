const jwt = require('jsonwebtoken');
const UserInfo = require("../models/userDetails.js");
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async(req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await UserInfo.findById(decoded.id).select("-password");

            next();

        } catch (error) {
            res.status(401);
            throw new Error("Error: User Not Authorized!");
        }
    }

    if(!token){
        res.status(401);
        throw new Error("User Not Authorized!");
    }

});

module.exports = {protect};