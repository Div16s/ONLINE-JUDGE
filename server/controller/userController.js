const UserInfo = require("../models/userDetails.js");
const generateToken = require('../utils/generateToken');

const userSignup = async (req, res) => {
    const { name, email, password, pic} = req.body;
    //if user already exists
    const userExists = await UserInfo.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists!");
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
        res.status(400);
        throw new Error("Error occurred!");
    }

}

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserInfo.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            //isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400);
        throw new Error("Invalid email or password!");
    }
}

module.exports = { userSignup, userLogin };