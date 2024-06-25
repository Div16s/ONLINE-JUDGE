const express =  require('express');
const { problemSetControl }  =  require("../controllers/problemSetController.js");

const problemSetRouter = express.Router();

problemSetRouter.get('/',problemSetControl);

module.exports = problemSetRouter;