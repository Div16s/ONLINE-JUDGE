const express =  require('express');
const {userSignup,userLogin} = require('../controller/userController.js');
const userRouter = express.Router();

userRouter.route("/login").post(userLogin);
userRouter.route("/signup").post(userSignup);

module.exports = userRouter;