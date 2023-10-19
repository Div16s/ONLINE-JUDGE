const UserInfo = require("../models/userDetails.js");
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

const userSignup = async (req, res) => {
    try{
    const { name, email, password, pic } = req.body;
    //if user already exists
    const userExists = await UserInfo.findOne({ email });

    if (userExists) {
        res.status(400);
        console.log("User already exists!");
    }

    //create new user
    const newUser = await UserInfo.create({
        name,
        email,
        password,
        pic,
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            // isAdmin: newUser.isAdmin,
            pic: newUser.pic,
            token: generateToken(newUser._id),
        });
    }
    else {
        res.status(401);
        throw new Error("Error ocurred!");
    }
    }
    catch(error){
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }

}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserInfo.findOne({ email });
        // if (user && (await user.matchPassword(password))) {
        //     res.json({
        //         _id: user._id,
        //         name: user.name,
        //         email: user.email,
        //         pic: user.pic,
        //         token: generateToken(user._id),
        //     })
        // }
        // else {
        //     res.status(400);
        //     throw new Error("Invalid email or password!");
        // }
        if (user) {
            if (await user.matchPassword(password)) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id),
                })
            } else {
                // Password is invalid
                res.status(401).json({ error: "Invalid password" });
            }
        } else {
            // User with the provided email not found
            res.status(401).json({ error: "User not found" });
        }
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await UserInfo.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.pic = req.body.pic || user.pic;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            pic: updatedUser.pic,
            token: generateToken(updatedUser._id),
        });
    }
    else {
        res.status(404)
        console.log("User not found!");
    }
})

module.exports = { userSignup, userLogin, updateUserProfile };