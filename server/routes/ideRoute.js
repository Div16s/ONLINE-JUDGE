const express =  require('express');
const ideController = require('../controller/ideController.js');
const ideRouter = express.Router();

ideRouter.route('/').post(ideController);

module.exports = ideRouter;