const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const UserDetailSchema = new mongoose.Schema(
    {
        name:{type: String,  unique: true},
        email:{type: String,  unique: true},
        password:{type: String, unique: true},
        pic:{type:String, default: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"},
    },
    {
        timestamps: true,
    }
);

//perform the function before saving
UserDetailSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

//function for password decryption
UserDetailSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

const userModel =  mongoose.model("UserInfo",UserDetailSchema);
module.exports = userModel;

