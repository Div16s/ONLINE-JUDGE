const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const problemSetRouter = require('./routes/problemSetRoute.js');
const problemStatementRouter = require('./routes/problemStatementRoute.js');
const ideRouter = require('./routes/ideRoute.js');
const userRouter = require('./routes/userRouter.js');
const DBConnection = require('./database/db.js');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js');
const {generateFile,generateInput} = require('./generateFile.js');
const {executeCpp} = require('./executeCPP.js');
const app = express();

//middleWares
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use("/",userRouter)
app.use("/problems",problemSetRouter);
app.use("/problemStatement",problemStatementRouter);
app.post('/ide', async (req, res) => {
    try {
        const { language = 'cpp', code, input } = req.body;
        if (code === undefined) {
            return res.status(404).json({ success: "false", error: "Empty code body!" });
        }
        const inputfile = await generateInput(input);
        const filePath = await generateFile(language, code);
        const output = await executeCpp(filePath);
        res.json({ filePath, output, inputfile });
        console.log(output);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})

DBConnection();

app.use(notFound);
app.use(errorHandler);

app.listen(8000, ()=>{
    console.log("Server is running on port 8000!");
})
