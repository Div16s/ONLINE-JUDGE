const { Submission } = require("../models/submissions");

async function getSubmissions(req, res) {
  const { email } = req.body;
  //console.log(email);
  try {
    const problems = await Submission.find({
      User_email: email
    });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({
      err: error.message 
    });
    console.log("Error in getSubmissions controller: ", error.message);
  }
}

async function getSubmission(req, res) {
  const { submission_id } = req.params;
  try {
    const submission = await Submission.findOne({ 
      _id: submission_id,  
    });
    if (!submission) {
      res.status(404).json({ err: "Submission not found" });
      return;
    }
    res.status(200).json(submission);
  } catch (error) { 
    res.status(500).json({ err: error.message });
    console.log("Error in getSubmission controller: ", error.message);
  }
}

module.exports = { getSubmissions, getSubmission}