const mongoose = require("mongoose");

const problemSchema = mongoose.Schema({
    problemName:String,
    problemStatement:String,
    problemDifficulty:String,
    example_testCases:String,
});

const problemModel = mongoose.model("problems",problemSchema);
module.exports = {problemModel};

