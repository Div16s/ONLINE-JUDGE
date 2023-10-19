const express = require('express');
const {getSubmissions} = require('../controller/submissions.js');
const { protect } = require('../middlewares/authMiddleware.js');
const submission_router = express.Router();

submission_router.route('/').get(protect, getSubmissions);

module.exports = submission_router;