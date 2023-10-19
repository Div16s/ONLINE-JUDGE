const express =  require('express');
const {userSignup,userLogin, updateUserProfile} = require('../controller/userController.js');
const { protect } = require('../middlewares/authMiddleware.js');
const userRouter = express.Router();

userRouter.route("/login").post(userLogin);
userRouter.route("/signup").post(userSignup);
userRouter.route("/profile").post(protect,updateUserProfile);

module.exports = userRouter;