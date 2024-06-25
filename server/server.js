const express = require('express');
const cors = require('cors');
const DBConnection = require('./database/db.js');
const userRouter = require('./routes/userRouter.js');
const problemSetRouter = require('./routes/problemSetRoute.js');
const problemStatementRouter = require('./routes/problemStatementRoute.js');
const ideRouter = require('./routes/ideRoute.js');
const submission_router = require('./routes/submissionRoute.js');
const code_submission_router = require('./routes/submitRoute.js');
const analyticsRouter = require('./routes/analyticsRoute.js');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js');
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
app.use(express.json({limit:"50mb"}));

//Routers
app.use("/api/user", userRouter)
app.use("/api/problems", problemSetRouter);
app.use("/api/problemStatement", problemStatementRouter);
app.use("/api/submissions",submission_router);
app.use("/api/submit",code_submission_router);
app.use("/api/ide", ideRouter);
app.use("/api/analytics",analyticsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(8000, () => {
    console.log("Server is running on port 8000!");
})
