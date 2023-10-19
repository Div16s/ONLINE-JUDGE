const { generateFile, generateInput } = require('../generateFile.js');
const executeCpp = require('../executeCode.js');
// const app = express();

// //middleWares
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send("WORKING FINE!");
// })

const ideController =  async (req, res) => {
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
        res.status(500).json({ success: false, error: "Internal Server Error, ideController" });
    }
}

module.exports = ideController;