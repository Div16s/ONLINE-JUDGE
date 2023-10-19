const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const problemSetRouter = require('./routes/problemSetRoute.js');
const problemStatementRouter = require('./routes/problemStatementRoute.js');
const ideRouter = require('./routes/ideRoute.js');
const userRouter = require('./routes/userRouter.js');
const DBConnection = require('./database/db.js');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js');
const { generateFile, generateInput } = require('./generateFile.js');
const { executeC, executeCpp, executePython, executeJava } = require('./executeCode.js');
const { runCPPCodeInDocker } = require('./executeCodeInDocker.js');
const submission_router = require('./routes/submissionRoute.js');
const code_submission_router = require('./routes/submitRoute.js');
const ideController = require('./controller/ideController.js');
const app = express();

//middleWares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/", userRouter)
app.use("/problems", problemSetRouter);
app.use("/problemStatement", problemStatementRouter);
app.use("/submissions",submission_router);
app.use("/submit",code_submission_router);

//ide thing
app.post('/ide', async (req, res) => {
    try {
        const { language, code, input } = req.body;
        if (code === undefined) {
            return res.status(404).json({ success: "false", error: "Empty code body!" });
        }

        //adding function for supporting multiple languages
        let output,filePath;
        // console.log(language);
        // console.log(input);

        switch (language) {
            case 'c':
                // filePath = await generateFile('c', code);
                // output = await executeC(filePath);
                output = await runCPPCodeInDocker(code,'c');
                break;
            case 'cpp':
                // filePath = await generateFile('cpp', code);
                // output = await executeCpp(filePath);
                output = await runCPPCodeInDocker(code,'cpp',input);
                break;
            case 'py':
                filePath = await generateFile('py', code);
                output = await executePython(filePath);
                break;
            case 'java':
                filePath = await generateFile('java', code);
                output = await executeJava(filePath);
                break;
            // Add more cases for other languages as needed
            default:
                return res.status(400).json({ success: false, error: "Unsupported language!" });
        }

        const inputfile = await generateInput(input);
        //const filePath = await generateFile(language, code);
        // const output = await executeCpp(filePath);
        res.json({ filePath, output, inputfile });
        console.log("Output: ",output);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error, Yahan se jaa raha hao" });
    }
})

DBConnection();

app.use(notFound);
app.use(errorHandler);

app.listen(8000, () => {
    console.log("Server is running on port 8000!");
})
