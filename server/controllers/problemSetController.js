const { problemModel } = require("../models/problems.js");

const problemSetControl = async(req,res) => {
    try {
        const data = await problemModel.find({});
        res.json(data);
        console.log("Problem Set fetched successfully!");
    } catch (error) {
        console.log("ERROR",error.message);
    }
};

module.exports = {problemSetControl};