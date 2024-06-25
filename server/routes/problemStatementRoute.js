const express =  require('express');
const {ProblemStatementControl} =  require("../controllers/problemStatement.js");

const problemStatementRouter=express.Router();

problemStatementRouter.get("/:problemID",ProblemStatementControl)

module.exports = problemStatementRouter;