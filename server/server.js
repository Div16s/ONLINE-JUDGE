const express = require('express');
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
const cloudinary = require('cloudinary').v2;

const app = express();

DBConnection();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//middleWares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit:"50mb"})); //To parse JSON data in the req.body

//Routers
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

        switch (language) {
            case 'c':
                filePath = await generateFile('c', code);
                output = await executeC(filePath);
                //output = await runCPPCodeInDocker(code,'c');
                break;
            case 'cpp':
                filePath = await generateFile('cpp', code);
                output = await executeCpp(filePath);
                //output = await runCPPCodeInDocker(code,'cpp',input);
                //console.log("Docker output: ",output);
                break;
            case 'py':
                filePath = await generateFile('py', code);
                output = await executePython(filePath);
                break;
            case 'java':
                filePath = await generateFile('java', code);
                output = await executeJava(filePath);
                break;
            default:
                return res.status(400).json({ err: "Unsupported language!" });
        }

        const inputfile = await generateInput(input);
        res.json({ filePath, output, inputfile });
        console.log("Output: ",output);
    }
    catch (error) {
        res.status(500).json({ 
            err: error
        });
        console.log("Error in ideController: ", error);
    }
})

app.use(notFound);
app.use(errorHandler);

app.listen(8000, () => {
    console.log("Server is running on port 8000!");
})
