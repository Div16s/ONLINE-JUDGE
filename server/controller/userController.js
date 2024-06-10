const User = require("../models/userModel.js");
const { Submission } = require("../models/submissions");
const generateToken = require('../utils/generateToken');
const cloudinary = require('cloudinary').v2;

const userSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        //if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            //409 - conflict
            res.status(409).json({
                err: "User already exists!"
            });
        }

        //create new user
        const newUser = await User.create({
            name,
            email,
            password,
        });

        if (newUser) {
            res.status(201).json({
                message: "User created successfully!",
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                pic: newUser.pic,
                token: generateToken(newUser._id),
            });
        }
        else {
            res.status(400).json({
                err: "Invalid user data!"
            });
        }
    }
    catch (error) {
        res.status(500).json({ 
            err: error.message  
        });
        console.log("Error in userSignup controller: ", error.message);
    }

}

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            if (await user.matchPassword(password)) {
                const submissions = await Submission.find({ 
                    User_email: email
                });

                const solvedProblems = submissions.map(submission => ({
                        problemName: submission.Problem_name,
                        status: submission.Verdict
                }));

                res.status(200).json({
                    message: "Login successful!",
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePic: user.profilePic,
                    solvedProblems,
                    token: generateToken(user._id),
                })
            } else {
                // Password is invalid
                // 401 - Unauthorized
                res.status(401).json({ 
                    err: "Invalid password" 
                });
            }
        } else {
            // User with the provided email not found
            res.status(401).json({ 
                err: "User not found" 
            });
        }
    }
    catch (error) {
        res.status(500).json({ 
            err: error.message 
        });
        console.log("Error in userLogin controller: ", error.message);
    }
}

const updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;
    let { profilePic } = req.body;
    const userId = req.params.id;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: "User not found!"
            });
        }

        // if (password) {
        //     const salt = await bcrypt.genSalt(10);
        //     const hashedPassword = await bcrypt.hash(password, salt);
        //     user.password = hashedPassword;
        // }

        //uploading profile pic to cloudinary
        if (profilePic) {
            if (user.profilePic) {
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
            }

            const uploadedResponse = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadedResponse.secure_url;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.profilePic = profilePic || user.profilePic;

        user = await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            err: error.message
        });
        console.log("Error in updateUserProfile controller: ", error.message);
    }
}

module.exports = { userSignup, userLogin, updateUserProfile };