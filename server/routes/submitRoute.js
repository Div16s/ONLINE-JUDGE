const express = require('express');
const {submitCode} = require('../controller/code_submission.js');
const code_submission_router = express.Router();

code_submission_router.route("/").post(submitCode);

module.exports = code_submission_router;

