const {Submission} = require ("../models/submissions");

async function getSubmissions(req,res){
  console.log("Get submissions was called");
    try {
        // const {email} = req.body
        const user = req.user;
        // console.log(req.body);
        const email = user.email;
        console.log(user.email);
        const problems = await Submission.find({User_email:email});
        res.status(200).json(problems);
      } catch (e) {
        console.log(e);
        return "Error getting user submissions";
      }
}

module.exports={getSubmissions}