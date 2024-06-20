const {executeCodeInDocker} = require('../docker/executeCodeInDocker.js');

const ideController =  async (req, res) => {
    try {
        const { language, code, input } = req.body;
        if (code === undefined || code === "") {
            return res.status(404).json({ success: "false", error: "Empty code body!" });
        }

        const output = await executeCodeInDocker(language, code, input);

        res.json({ output });
        console.log("Output in ideController: ", output);
    }
    catch (error) {
        res.status(500).json({ 
            err: error
        });
        console.log("Error in ideController: ", error);
    }
}

module.exports = ideController;