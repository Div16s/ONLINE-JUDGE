const { generateFile, generateInput } = require('../generateFile.js');
const executeCpp = require('../executeCode.js');

const ideController =  async (req, res) => {
    try {
        const { language = 'cpp', code, input } = req.body;
        if (code === undefined) {
            return res.status(404).json({  
                error: "Empty code body!" 
            });
        }
        const inputfile = await generateInput(input);
        const filePath = await generateFile(language, code);
        const output = await executeCpp(filePath);
        console.log("Output is: ",output);
        if(output.error) {
            return res.status(500).json({ err: output.error });
        }
        res.status(200).json({ filePath, output, inputfile });
    }
    catch (error) {
        res.status(500).json({ 
            err: error.message
        });
        console.log("Error in ideController: ", error.message);
    }
}

module.exports = ideController;