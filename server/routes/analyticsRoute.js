const express = require('express');
const analyticsRouter = express.Router();
const { getAnalytics } = require('../controllers/analyticsController');

analyticsRouter.get('/:email', getAnalytics);

module.exports = analyticsRouter;