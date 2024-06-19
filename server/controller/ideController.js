const {executeCodeInDocker} = require('../docker/executeCodeInDocker.js');

const ideController =  async (req, res) => {
    try {
        const { language = 'cpp', code, input } = req.body;
        if (code === undefined) {
            return res.status(404).json({  
                error: "Empty code body!" 
            });
        }
    
        const output = await executeCodeInDocker(language, code, input);

        res.json({ output });
        console.log("Output in ideController: ", output);
    }
    catch (error) {
        res.status(500).json({ 
            err: error.message
        });
        console.log("Error in ideController: ", error.message);
    }
}

module.exports = ideController;