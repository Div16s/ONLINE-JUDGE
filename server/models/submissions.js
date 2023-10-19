const mongoose = require('mongoose');

const Submission_schema = mongoose.Schema({
    language: {
        type: String,
        // required: true
    },
    code: {
        type: String,
        // required: true
    },
    Submitted_At: {
        type: String,
        // required: true
    },
    Verdict: {
        type: String,
        // required: true
    },
    Problem_id: {
        type: String,
        // required: true
    },
    Problem_name: {
        type: String,
        // required: true
    },
    User_email: {
        type: String,
        // required: true
    }
});

const Submission = mongoose.model("submissions",Submission_schema);
module.exports = {Submission};