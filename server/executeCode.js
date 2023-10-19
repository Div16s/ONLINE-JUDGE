const { exec } = require("child_process");
const path = require("path");
const { stdout, stderr } = require("process");
const { v4: uuid } = require('uuid');
const { reject } = require('assert');
const fs = require('fs');

const outputPath = path.join(__dirname, "codes");

const executeC = async (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];;
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    const startTime = performance.now(); // Start measuring time
    exec(
      `gcc "${filepath}" -o "${outPath}" && cd "${outputPath}" && .\\${jobId}.out < input.txt`,
      (error, stdout, stderr) => {
        const endTime = performance.now(); // Stop measuring time
        const executionTime = endTime - startTime; // Calculate execution time in milliseconds
        if (error) {
          reject({ error, stderr, executionTime});
        }
        if (stderr) {
          reject({stderr, executionTime});
        }
        resolve({stdout, executionTime});
      }
    );
  });
};

const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);
  
  return new Promise((resolve, reject) => {
    const startTime = performance.now(); // Start measuring time
    exec(
      `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && .\\${jobId}.exe < input.txt`,
      (error, stdout, stderr) => {
        const endTime = performance.now(); // Stop measuring time
        const executionTime = endTime - startTime; // Calculate execution time in milliseconds
        if (error) {
          reject({ error, stderr, executionTime });
        }
        if (stderr) {
          reject({stderr, executionTime});
        }
        resolve({stdout, executionTime});
      }
    );
  });
};


const executePython = async (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];

  return new Promise((resolve, reject) => {
    const startTime = performance.now(); // Start measuring time
    // Execute the Python script with input and display output in the terminal
    exec(`python "${filepath}" `, (error, stdout, stderr) => {
      const endTime = performance.now(); // Stop measuring time
      const executionTime = endTime - startTime; // Calculate execution time in milliseconds
      if (error) {
        reject({ error, stderr, executionTime });
      }
      if (stderr) {
        reject({stderr, executionTime});
      }
      resolve({stdout, executionTime});
    });
  });
};

const executeJava = async (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const classDir = path.dirname(filepath);

  console.log("Class Directory:", classDir);

  return new Promise((resolve, reject) => {
    const command = `java -cp "${classDir}" ${jobId} < input.txt`;

    console.log("Command:", command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

module.exports =  {executeC, executeCpp, executePython, executeJava};