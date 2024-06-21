# CodeSphere | Online Coding Platform

Welcome to CodeSphere, an online coding platform designed to enhance your coding and problem-solving skills. This MERN (MongoDB, Express.js, React.js, Node.js) stack project provides a range of features, including user authentication, problem exploration, code submissions, an online IDE, and more.

## Features

### 1. User Authentication & Management

- Secure Authentication: Users can register, login, and manage their profiles using JWT (JSON Web Token) for secure authentication, ensuring data integrity and preventing unauthorized access.
- Profile Management: Users can edit their profiles, including uploading profile pictures using Cloudinary for cloud storage and efficient image management.

### 2. Problem Set Page

- Explore all problems available on the platform at `/problems`.
- View a curated list of coding problems categorized by difficulty levels (easy, medium, hard).

### 3. Problem Statement Page & Submission

- Access the problem statement page for a specific problem at `/problemStatement/${problemId}`.
- Read the problem description, constraints, and example test cases.
- Test the code with custom inputs and view the outputs immediately using input/output section.
- Upon submission, the code is evaluated against predefined test cases, and users receive instant feedback (Accepted, Wrong Answer, etc.).
- Comprehensive error messages and debugging information are provided to help users understand and fix issues in their code.

### 4. Submissions Page

- View all previous submissions at `/submissions`.
- Each submission includes details such as language, code, submission date, and verdict.

### 5. Online IDE

- Access the online Integrated Development Environment (IDE) at `/ide`.
- Practice coding in a sandbox-like environment, an integrated code editor supports writing and running code with real-time feedback on custom inputs.

### 6. Secure and Scalable Code Execution Environment

- Docker Integration: Code execution is managed within isolated Docker containers for security and resource management.
- Multi-Language Support: The platform supports code execution in C, C++, and Python, with dedicated Docker containers for each language.
- Docker-in-Docker Concept: The platform leverages the Docker-in-Docker (DinD) concept, allowing Docker containers to run inside main Docker container(backend application container). This ensures a secure, 
  isolated, and scalable environment for executing user code.

## Supported Programming Languages

CodeSphere supports the following programming languages:

1. C
2. C++
3. Python

## Styling

A mix of Chakra UI and simple CSS has been used for styling, ensuring a clean and responsive user interface.

## Endpoints

1. **Problem Set Page:**
   - Endpoint: `/problems`
   - Description: Displays all problems available on CodeSphere, including their difficulty levels.

2. **Problem Statement Page:**
   - Endpoint: `/problemStatement/${problemId}`
   - Description: Provides the problem statement, description, constraints, and example test cases. Allows users to code, run, and submit solutions.

3. **Submissions Page:**
   - Endpoint: `/submissions`
   - Description: Shows a list of all previous submissions, including details like language, code, submission date, and verdict.

4. **Online IDE:**
   - Endpoint: `/ide`
   - Description: Accesses the online Integrated Development Environment (IDE) for practicing coding.

5. **My Profile Page:**
   - Endpoint: `/myProfile`
   - Description: Allows users to view and update their profile details.

## Technologies Used

- **Frontend Styling:** Chakra UI, CSS
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT Tokens
- **Cloud Services:** Cloudinary
- **Containerization:** Docker

## Getting Started

To run CodeSphere locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Div16s/ONLINE-JUDGE

2. Navigate to the project directory:

   ```bash
   cd ONLINE-JUDGE

3. Install dependencies:

   ```bash
   npm install

4. Set up a MongoDB database and update the connection string in the server configuration.

5. Start the server:

   ```bash
   node server.js

6. Start the client:

   ```bash
   npm start

Feel free to contribute to the project by submitting bug reports, feature requests, or pull requests. Let's build a vibrant coding community on CodeSphere!
