const express =  require('express');
const ideController = require('../controller/ideController.js');
const ideRouter = express.Router();

ideRouter.route('/run').post(ideController);

module.exports = ideRouter;