const express = require('express');
const cors = require('cors');
const problemSetRouter = require('./routes/problemSetRoute.js');
const problemStatementRouter = require('./routes/problemStatementRoute.js');
const ideRouter = require('./routes/ideRoute.js');
const userRouter = require('./routes/userRouter.js');
const DBConnection = require('./database/db.js');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js');
const { executeCodeInDocker } = require('./docker/executeCodeInDocker.js');
const submission_router = require('./routes/submissionRoute.js');
const code_submission_router = require('./routes/submitRoute.js');
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
app.use("/api/ide", ideRouter);

//ide route
// app.post('/ide', async (req, res) => {
//     try {
//         const { language, code, input } = req.body;
//         if (code === undefined) {
//             return res.status(404).json({ success: "false", error: "Empty code body!" });
//         }

//         const output = await executeCodeInDocker(language, code, input);

//         res.json({ output });
//         console.log("Output of ide in server.js: ", output);
//     }
//     catch (error) {
//         res.status(500).json({ 
//             err: error
//         });
//         console.log("Error in ide in server.js: ", error);
//     }
// })

app.use(notFound);
app.use(errorHandler);

app.listen(8000, () => {
    console.log("Server is running on port 8000!");
})
