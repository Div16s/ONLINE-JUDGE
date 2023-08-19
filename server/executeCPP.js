const { exec } = require("child_process");
const path = require("path");
const { stdout, stderr } = require("process");
const { v4: uuid } = require('uuid');
const { reject } = require('assert');
const fs = require('fs');

const outputPath = path.join(__dirname, "codes");

const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);
  
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.exe < input.txt`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};

module.exports =  {executeCpp};