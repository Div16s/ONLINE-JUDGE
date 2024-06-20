const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const executeCodeInDocker = async (language, code, input) => {
  const containerName = `${language}-container-${Date.now()}`;
  const dockerPath = path.join(__dirname, language);
  console.log("DockerPath: ", dockerPath);

  let buildCmd = '';
  let runCmd = '';

  const codeDirPath = path.join(__dirname, language);
  const inputDirPath = path.join(__dirname, language);

  let codeFilePath = '';
  let inputFilePath = '';

  switch (language) {
    case 'c':
      codeFilePath = path.join(codeDirPath, 'code.c');
      inputFilePath = path.join(inputDirPath, 'input.txt');

      try {
        fs.writeFileSync(codeFilePath, code);
        fs.writeFileSync(inputFilePath, input);
      } catch (err) {
        console.log(`Error writing file: ${err}`);
      }
      process.chdir(dockerPath); // navigate to the directory where the Dockerfile is located
      buildCmd = `docker build -t my-${language}-image .`;
      runCmd = `docker run --rm --name ${containerName} my-${language}-image`;
      break;
    case 'cpp':
      codeFilePath = path.join(codeDirPath, 'code.cpp');
      inputFilePath = path.join(inputDirPath, 'input.txt');

      try {
        fs.writeFileSync(codeFilePath, code);
        fs.writeFileSync(inputFilePath, input);
      } catch (err) {
        console.log(`Error writing file: ${err}`);
      }
      process.chdir(dockerPath);
      buildCmd = `docker build -t my-${language}-image .`;
      runCmd = `docker run --rm --name ${containerName} my-${language}-image`;
      break;
    case 'py':
      codeFilePath = path.join(codeDirPath, 'code.py');
      inputFilePath = path.join(inputDirPath, 'input.txt');

      try {
        fs.writeFileSync(codeFilePath, code);
        fs.writeFileSync(inputFilePath, input);
      } catch (err) {
        console.log(`Error writing file: ${err}`);
      }
      process.chdir(dockerPath); 
      buildCmd = `docker build -t my-${language}-image .`;
      runCmd = `docker run --rm --name ${containerName} my-${language}-image`;
      break;
    default:
      throw new Error('Unsupported language!');
  }

  return new Promise((resolve, reject) => {
    exec(buildCmd, (buildError, buildStdout, buildStderr) => {
        if (buildError) {
            fs.unlinkSync(codeFilePath);
            fs.unlinkSync(inputFilePath);
            return reject(buildError);
        }
        exec(runCmd, (runError, runStdout, runStderr) => {
            fs.unlinkSync(codeFilePath);
            fs.unlinkSync(inputFilePath);
            if (runError) {
                return reject(runError);
            }
            resolve(runStdout || runStderr);
        });
    });
   })
};

module.exports = {
  executeCodeInDocker,
};
