# CodeSphere | Online Coding Platform

Welcome to CodeSphere, an online coding platform designed to enhance your coding and problem-solving skills. This MERN (MongoDB, Express.js, React.js, Node.js) stack project provides a range of features, including user authentication, problem exploration, code submissions, an online IDE, and more.

## Features

### 1. User Authentication & Management

- Secure Authentication: Users can register, login, and manage their profiles using JWT (JSON Web Token) for secure authentication, ensuring data integrity and preventing unauthorized access.
- Profile Management: Users can edit their profiles, including uploading profile pictures using Cloudinary for cloud storage and efficient image management.

### 3. Problem Set Page

- Explore all problems available on the platform at `/problems`.
- View a list of problems along with their difficulty levels.

### 4. Problem Statement Page

- Access the problem statement page for a specific problem at `/problemStatement/${problemId}`.
- Read the problem description, constraints, and example test cases.
- Code the problem and run/submit the solution.

### 5. Submissions Page

- View all previous submissions at `/submissions`.
- Each submission includes details such as language, code, submission date, and verdict.

### 6. Online IDE

- Access the online Integrated Development Environment (IDE) at `/ide`.
- Practice coding in a sandbox-like environment.

### 7. My Profile Page

- View and update user details at `/myProfile`.
- Access a personalized space for managing profile information.

## Supported Programming Languages

CodeSphere supports the following programming languages:

1. C
2. C++
3. Python

## Styling

A mix of Bootstrap and simple CSS has been used for styling, ensuring a clean and responsive user interface.

## Endpoints

1. **Home Page:**
   - Endpoint: `/home`
   - Description: CodeSphere home page, serving as a central hub for navigation.

2. **Problem Set Page:**
   - Endpoint: `/problems`
   - Description: Displays all problems available on CodeSphere, including their difficulty levels.

3. **Problem Statement Page:**
   - Endpoint: `/problemStatement/${problemId}`
   - Description: Provides the problem statement, description, constraints, and example test cases. Allows users to code, run, and submit solutions.

4. **Submissions Page:**
   - Endpoint: `/submissions`
   - Description: Shows a list of all previous submissions, including details like language, code, submission date, and verdict.

5. **Online IDE:**
   - Endpoint: `/ide`
   - Description: Accesses the online Integrated Development Environment (IDE) for practicing coding.

6. **My Profile Page:**
   - Endpoint: `/myProfile`
   - Description: Allows users to view and update their profile details.

## Technologies Used

- **Frontend Styling:** Bootstrap CSS, CSS
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT Tokens

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
