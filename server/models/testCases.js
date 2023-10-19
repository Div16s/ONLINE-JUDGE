const mongoose = require("mongoose");

const testCases_Schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    cases: {
        type: [
            {
                input: String,
                output: String,
            },
        ],
        required: true,
    },
},
    {
        collection: "testCases"
    });

const testCases = mongoose.model("testCases", testCases_Schema);

module.exports = { testCases };