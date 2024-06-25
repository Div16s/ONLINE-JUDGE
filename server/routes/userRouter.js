const express =  require('express');
const {userSignup,userLogin, updateUserProfile} = require('../controllers/userController.js');
const userRouter = express.Router();

userRouter.route("/login").post(userLogin);
userRouter.route("/signup").post(userSignup);
userRouter.route("/profile/:id").put(updateUserProfile);

module.exports = userRouter;