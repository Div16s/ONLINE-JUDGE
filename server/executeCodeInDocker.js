const Dockerode = require('dockerode');
const docker = require('dockerode');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dockerClient = new Dockerode();

 const outputPath = path.join(__dirname, 'codes');
//const outputPath = '/code'; // Set it to the directory in your Docker container

const runCCodeInDocker = async (code) => {
    return new Promise((resolve, reject) => {
      const jobId = uuid();
      const containerName = `oj-${jobId}`;
      const codeFilePath = path.join(outputPath, `${jobId}.c`);
      const inputFilePath = path.join(outputPath, 'input.txt');
      const outputFilePath = path.join(outputPath, 'output.txt');
  
      fs.writeFileSync(codeFilePath, code);
  
      const runCommand = `gcc /code/${jobId}.c -o /code/${jobId} && /code/${jobId} < /code/input.txt > /code/output.txt`;
  
      dockerClient.createContainer(
        {
          Image: 'gcc:latest', // Use the image name you downloaded
          Cmd: ['sh', '-c', `cp /code/${jobId}.c /code/${jobId} && ${runCommand}`],
          HostConfig: {
            Binds: [
              `${codeFilePath}:/code/${jobId}.c`,
              `${inputFilePath}:/code/input.txt`,
              `${outputFilePath}:/code/output.txt`,
            ],
          },
          name: containerName,
        },
        (err, container) => {
          if (err) {
            reject(err);
          } else {
            container.start((err, data) => {
              if (err) {
                reject(err);
              } else {
                container.wait((err, data) => {
                  if (err) {
                    reject(err);
                  } else {
                    container.remove(() => {
                      fs.unlinkSync(codeFilePath);
                      const output = fs.readFileSync(outputFilePath, 'utf-8');
                      resolve(output);
                    });
                  }
                });
              }
            });
          }
        }
      );
    });
  };

  const runCPPCodeInDocker = async (code, language) => {
    return new Promise((resolve, reject) => {
        const jobId = uuid();
        const containerName = `oj-${jobId}`;
        const codeFilePath = path.join(outputPath, `${jobId}.${language}`);
        const inputFilePath = path.join(outputPath, 'input.txt');
        const outputFilePath = path.join(outputPath, 'output.txt');

        fs.writeFileSync(codeFilePath, code);

        const compileAndRunCommand = (language === 'cpp')
            ? `g++ /code/${jobId}.${language} -o /code/${jobId} && /code/${jobId} < /code/input.txt > /code/output.txt`
            : `gcc /code/${jobId}.${language} -o /code/${jobId} && /code/${jobId} < /code/input.txt > /code/output.txt`;

        dockerClient.createContainer(
            {
                Image: 'gcc:latest', // Use the image name you downloaded
                Cmd: ['sh', '-c', `cp /code/${jobId}.${language} /code/${jobId} && ${compileAndRunCommand}`],
                HostConfig: {
                    Binds: [
                        `${codeFilePath}:/code/${jobId}.${language}`,
                        `${inputFilePath}:/code/input.txt`,
                        `${outputFilePath}:/code/output.txt`,
                    ],
                },
                name: containerName,
            },
            (err, container) => {
                if (err) {
                    reject(err);
                } else {
                    container.start((err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            container.wait((err, data) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    container.remove(() => {
                                        fs.unlinkSync(codeFilePath);
                                        const output = fs.readFileSync(outputFilePath, 'utf-8');
                                        resolve(output);
                                    });
                                }
                            });
                        }
                    });
                }
            }
        );
    });
};

// const runCPPCodeInDocker = async (code, language, input) => {
//     return new Promise((resolve, reject) => {
//         const jobId = uuid();
//         const containerName = `oj-${jobId}`;
//         const codeFilePath = path.join(outputPath, `${jobId}.${language}`);
//         const inputFilePath = path.join(outputPath, 'input.txt');
//         const outputFilePath = path.join(outputPath, 'output.txt');

//         const compileAndRunCommand = (language === 'cpp')
//             ? `g++ ${codeFilePath} -o /code/${jobId} && /code/${jobId} < /code/input.txt > /code/output.txt`
//             : `gcc ${codeFilePath} -o /code/${jobId} && /code/${jobId} < /code/input.txt > /code/output.txt`;

//         dockerClient.createContainer(
//             {
//                 Image: 'gcc:latest', // Use the image name you downloaded
//                 Cmd: ['sh', '-c', compileAndRunCommand],
//                 HostConfig: {
//                     Binds: [
//                         // { Stream: Buffer.from(code), path: `${outputPath}/${jobId}.${language}` },
//                         // { Stream: Buffer.from(input), path: '/code/input.txt' },
//                         // `${outputFilePath}:/code/output.txt`,
//                         `${codeFilePath}:${outputPath}/${jobId}.${language}`,
//                         `${inputFilePath}:/code/input.txt`,
//                         `${outputFilePath}:/code/output.txt`,
                        
//                     ],
//                 },
//                 name: containerName,
//             },
//             (err, container) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     container.start((err, data) => {
//                         if (err) {
//                             reject(err);
//                         } else {
//                             container.wait((err, data) => {
//                                 if (err) {
//                                     reject(err);
//                                 } else {
//                                     container.remove(() => {
//                                         const output = fs.readFileSync(outputFilePath, 'utf-8');
//                                         resolve(output);
//                                     });
//                                 }
//                             });
//                         }
//                     });
//                 }
//             }
//         );
//     });
// };

// const runCPPCodeInDocker = async (code, language, input) => {
//     return new Promise((resolve, reject) => {
//         // Create the directories if they don't exist
//         fs.mkdirSync('/code', { recursive: true });
//         const jobId = uuid();
//         const containerName = `oj-${jobId}`;
//         const codeFilePath = `/code/${jobId}.${language}`;
//         const inputFilePath = '/code/input.txt';
//         const outputFilePath = '/code/output.txt';

//         const compileAndRunCommand = (language === 'cpp')
//             ? `g++ ${codeFilePath} -o /code/${jobId} && /code/${jobId} < ${inputFilePath} > ${outputFilePath}`
//             : `gcc ${codeFilePath} -o /code/${jobId} && /code/${jobId} < ${inputFilePath} > ${outputFilePath}`;

//         dockerClient.createContainer(
//             {
//                 Image: 'gcc:latest', // Use the image name you downloaded
//                 //Cmd: ['sh', '-c', 'mkdir -p /code && touch /code/output.txt'],
//                 Cmd: ['sh', '-c', compileAndRunCommand],
//                 HostConfig: {
//                     Binds: [
//                      `${outputPath}:${outputPath}`,
//                     ],
//                 },
//                 name: containerName,
//             },
//             (err, container) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     container.start((err, data) => {
//                         if (err) {
//                             reject(err);
//                         } else {
//                             // Write the user's code and input to the files
//                             fs.writeFileSync(codeFilePath, code);
//                             fs.writeFileSync(inputFilePath, input);

//                             container.wait((err, data) => {
//                                 if (err) {
//                                     reject(err);
//                                 } else {
//                                     container.remove(() => {
//                                         const output = fs.readFileSync(outputFilePath, 'utf-8');
//                                         resolve(output);
//                                     });
//                                 }
//                             });
//                         }
//                     });
//                 }
//             }
//         );
//     });
// };

// const runCPPCodeInDocker = async (code, language, input) => {
//     return new Promise((resolve, reject) => {
//         const jobId = uuid();
//         const containerName = `oj-${jobId}`;
//         const codeFilePath = `/code/${jobId}.${language}`;
//         const inputFilePath = '/code/input.txt';
//         const outputFilePath = '/code/output.txt';

//         //fs.mkdirSync('/code', { recursive: true });

//         const compileAndRunCommand = (language === 'cpp')
//             ? `g++ ${codeFilePath} -o ${outputFilePath.replace('/code/', '/code/')} && ${outputFilePath.replace('/code/', '/code/')} < ${inputFilePath} > ${outputFilePath}`
//             : `gcc ${codeFilePath} -o ${outputFilePath.replace('/code/', '/code/')} && ${outputFilePath.replace('/code/', '/code/')} < ${inputFilePath} > ${outputFilePath}`;

//         dockerClient.createContainer(
//             {
//                 Image: 'gcc:latest', // Use the image name you downloaded
//                 Cmd: ['sh', '-c', compileAndRunCommand],
//                 HostConfig: {
//                     Binds: [
//                         `${codeFilePath}:${codeFilePath}`,
//                         `${inputFilePath}:${inputFilePath}`,
//                         `${outputFilePath}:${outputFilePath}`,
//                     ],
//                 },
//                 name: containerName,
//             },
//             (err, container) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     container.start((err, data) => {
//                         if (err) {
//                             reject(err);
//                         } else {
//                             // Write the user's code and input to the files within the container
//                             const inputBuffer = Buffer.from(input, 'utf-8');
//                             const codeBuffer = Buffer.from(code, 'utf-8');

//                             container.exec({
//                                 Cmd: ['sh', '-c', `cat > ${codeFilePath}`],
//                                 AttachStdin: true,
//                             }, (err, exec) => {
//                                 if (err) {
//                                     reject(err);
//                                 } else {
//                                     exec.start({ stdin: true },(err, stream) => {
//                                         if (err) {
//                                             reject(err);
//                                         } else {
//                                             stream.write(codeBuffer);
//                                             stream.end();
//                                         }
//                                     });
//                                 }
//                             });

//                             container.exec({
//                                 Cmd: ['sh', '-c', `cat > ${inputFilePath}`],
//                                 AttachStdin: true,
//                             }, (err, exec) => {
//                                 if (err) {
//                                     reject(err);
//                                 } else {
//                                     exec.start({ stdin: true },(err, stream) => {
//                                         if (err) {
//                                             reject(err);
//                                         } else {
//                                             stream.write(inputBuffer);
//                                             stream.end();
//                                         }
//                                     });
//                                 }
//                             });

//                             container.wait((err, data) => {
//                                 if (err) {
//                                     reject(err);
//                                 } else {
                                    
//                                         const output = fs.readFileSync(outputFilePath, 'utf-8');
//                                         resolve(output);
                                    
//                                 }
//                             });
//                         }
//                     });
//                 }
//             }
//         );
//     });
// };

  
  module.exports = { runCCodeInDocker, runCPPCodeInDocker };