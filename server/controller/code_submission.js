const { generateFile, generateInput } = require("../generateFile");
const { getTestCases } = require("../getTestCases");
const { executeC, executeCpp, executePython} = require("../executeCode");
const { runCPPCodeInDocker } = require('../executeCodeInDocker.js');
const { Submission } = require("../models/submissions");
const fs = require("fs-extra");
const path = require("path");

const outputPath = path.join(__dirname, "..", "codes");

const submitCode = async (req, res) => {
  const { language, code, problem_id, problem_name, email } = req.body;
  const newSubmission = new Submission();
  newSubmission["language"] = language;
  newSubmission["Problem_id"] = problem_id;
  newSubmission["User_email"] = email;
  newSubmission["Problem_name"] = problem_name;

  const time = new Date().toLocaleString();

  newSubmission["Submitted_At"] = time;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body" });
  }
  newSubmission["code"] = code;
  // console.log(problem_id);
  // console.log(problem_name);

  // const TestCases = await getTestCases(problem_id);
  // let tc = TestCases.cases;
  // console.log(tc.length);

  let test_cases = [];
  let filepath = "";
  try {
    const TestCases = await getTestCases(problem_id);
    //filepath = await generateFile(language, code);
    // console.log(language);
    // console.log(filepath);
    test_cases = TestCases.cases;
  } catch (err) {
    newSubmission["Verdict"] = "Error";
    await newSubmission.save();
    const v = err
    return res.status(500).json({ v });
  }

  let accepted = 0;
  const total_cases = test_cases.length;
  let output;
  for (let i = 0; i < test_cases.length; i++) {
    try {
      const inputFile = await generateInput(test_cases[i].input);
      // console.log(inputFile);
      if(language==='cpp'){
         //output = await executeCpp(filepath);
        output = await runCPPCodeInDocker(code,'cpp');
        // console.log("Output ",output);
      }
      else if(language==='py'){
        output = await executePython(filepath);
      }
      else if (language==='c'){
        output = await executeC(filepath);
      }
      const out = output.toString().replace(/\s+/g, ' ').trim();
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
  //fs.emptyDirSync(outputPath);
  if (accepted == total_cases) newSubmission["Verdict"] = "AC";
  else newSubmission["Verdict"] = "WA";
  await newSubmission.save();
  console.log(total_cases);
  return res.status(200).json({ accepted, total_cases });
};

module.exports = {
  submitCode,
};