const { getTestCases } = require("../getTestCases");
const { executeCodeInDocker } = require("../docker/executeCodeInDocker");
const { Submission } = require("../models/submissions");

const submitCode = async (req, res) => {
  const { language, code, problem_id, problem_name, email } = req.body;
  const newSubmission = new Submission();
  newSubmission["language"] = language;
  newSubmission["Problem_id"] = problem_id;
  newSubmission["User_email"] = email;
  newSubmission["Problem_name"] = problem_name;

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;

  newSubmission["Submitted_At"] = formattedDate;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body" });
  }
  newSubmission["code"] = code;

  let test_cases = [];

  try {
    const TestCases = await getTestCases(problem_id);
    test_cases = TestCases.cases;
  } catch (err) {
    newSubmission["Verdict"] = "Error";
    await newSubmission.save();
    const v = err
    return res.status(500).json({ v });
  }

  let accepted = 0; //accepted test cases
  const total_cases = test_cases.length; //total test cases
  let output; //output variable will hold the output 

  //iterating over each test case
  for (let i = 0; i < test_cases.length; i++) {
    try {
      output = await executeCodeInDocker(language, code, test_cases[i].input);
      let out = '';
      if (output.includes("Success:")) {
        out = (output.replace(/^.*\n/, '').trim()).toString().replace(/\s+/g, ' ').trim();
      }

      console.log(out);

      if (out == test_cases[i].output) {
        accepted = accepted + 1;
      }
    } catch (err) {
      newSubmission["Verdict"] = "Error";
      await newSubmission.save();
      return res.status(500).json({ err });
    }
  }

  //checking if accepted test cases == total test cases
  if (accepted == total_cases) newSubmission["Verdict"] = "AC";
  else newSubmission["Verdict"] = "WA";

  await newSubmission.save();

  return res.status(200).json({ accepted, total_cases });
};

module.exports = {
  submitCode,
};