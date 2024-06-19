const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const executeCodeInDocker = async (language, code, input) => {
  const containerName = `${language}-container-${Date.now()}`;
  const dockerPath = path.join(__dirname, language);

  let buildCmd = '';
  let runCmd = '';

  const codeDirPath = path.join(__dirname, 'codes');
  const inputDirPath = path.join(__dirname, 'inputs');
  
  // Create codes and inputs directories if they don't exist
  if (!fs.existsSync(codeDirPath)) {
    fs.mkdirSync(codeDirPath);
  }
  if (!fs.existsSync(inputDirPath)) {
    fs.mkdirSync(inputDirPath);
  }

  let codeFilePath = '';
  let inputFilePath = '';

  switch (language) {
    case 'c':
      codeFilePath = path.join(codeDirPath, `code_${Date.now()}.c`);
      inputFilePath = path.join(inputDirPath, `input_${Date.now()}.txt`);

      try {
        fs.writeFileSync(codeFilePath, code);
        fs.writeFileSync(inputFilePath, input);
      } catch (err) {
        console.log(`Error writing file: ${err}`);
      }
      process.chdir(dockerPath); // navigate to the directory where the Dockerfile is located
      buildCmd = `docker build -t my-${language}-image .`;
      runCmd = `docker run --name ${containerName} -v "${codeFilePath.replace(/\\/g, '/')}:/app/code.c" -v "${inputFilePath.replace(/\\/g, '/')}:/app/input.txt" my-${language}-image`;
      break;
    case 'cpp':
      codeFilePath = path.join(codeDirPath, `code_${Date.now()}.cpp`);
      inputFilePath = path.join(inputDirPath, `input_${Date.now()}.txt`);

      try {
        fs.writeFileSync(codeFilePath, code);
        fs.writeFileSync(inputFilePath, input);
      } catch (err) {
        console.log(`Error writing file: ${err}`);
      }
      process.chdir(dockerPath); // navigate to the directory where the Dockerfile is located
      buildCmd = `docker build -t my-${language}-image .`;
      runCmd = `docker run --name ${containerName} -v "${codeFilePath.replace(/\\/g, '/')}:/app/code.cpp" -v "${inputFilePath.replace(/\\/g, '/')}:/app/input.txt" my-${language}-image`;
      break;
    case 'py':
      codeFilePath = path.join(codeDirPath, `code_${Date.now()}.py`);
      inputFilePath = path.join(inputDirPath, `input_${Date.now()}.txt`);
      try {
        fs.writeFileSync(codeFilePath, code);
        fs.writeFileSync(inputFilePath, input);
      } catch (err) {
        console.log(`Error writing file: ${err}`);
      }
      process.chdir(dockerPath); // navigate to the directory where the Dockerfile is located
      buildCmd = `docker build -t my-${language}-image .`;
      runCmd = `docker run --name ${containerName} -v "${codeFilePath.replace(/\\/g, '/')}:/app/code.py" -v "${inputFilePath.replace(/\\/g, '/')}:/app/input.txt" my-${language}-image`;
      break;
    default:
      throw new Error('Unsupported language!');
  }

  return new Promise((resolve, reject) => {
    exec(buildCmd, (buildError, buildStdout, buildStderr) => {
        if (buildError) {
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
