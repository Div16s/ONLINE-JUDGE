const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid"); // renaming v4 as uuid
const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

async function generateFile(format, code) {
  const jobId = uuid();
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCodes, filename);
  fs.writeFileSync(filepath, code);
  return filepath;
}

async function generateInput(content){
  try {
    const filename = `input.txt`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, content);
    return filepath;
  } catch (error) {
    console.log("Error writing to input.txt:", error);
    throw error;
  }
}

module.exports  = { generateFile,generateInput };