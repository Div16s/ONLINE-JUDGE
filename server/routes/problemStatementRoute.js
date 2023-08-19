const express =  require('express');
const {ProblemStatementControl} =  require("../controller/problemStatement.js");

const problemStatementRouter=express.Router();

problemStatementRouter.get("/:problemID",ProblemStatementControl)

module.exports = problemStatementRouter;