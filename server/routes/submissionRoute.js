const express = require('express');
const {getSubmissions, getSubmission} = require('../controller/submissionsController.js');
const { protect } = require('../middlewares/authMiddleware.js');
const submission_router = express.Router();

// submission_router.route('/').get(protect, getSubmissions);

submission_router.post('/', protect, getSubmissions);
submission_router.get('/:submission_id', protect, getSubmission);

module.exports = submission_router;