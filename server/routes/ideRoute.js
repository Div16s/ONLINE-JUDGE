const express =  require('express');
const ideController = require('../controllers/ideController.js');
const ideRouter = express.Router();

ideRouter.route('/run').post(ideController);

module.exports = ideRouter;