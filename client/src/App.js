import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { landingPage as LandingPage } from "./pages/LandingPage/landingPage";
import { LoginPage } from "./pages/LoginPage/LoginPage.js";
import { SignupPage } from "./pages/SignupPage/SignupPage.js";
import { home as Home } from "./pages/Home/home";
import { ProblemsSet as ProblemSet } from "./pages/ProblemSet/problemsSet.js";
import { ProblemStatement } from "./pages/ProblemStatement/problemStatement.js";
import { IDE } from "./pages/IDE/ide";
import { MyProfile } from './pages/MyProfile/MyProfile';
import { Submissions } from './pages/Submissions/Submission';
import { Footer } from './pages/Footer/footer';
import { Navbar } from './Components/navbar';
//import {Submissions} from "./pages/submissions";

function App() {
  const [search, setSearch] = useState('')
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/home'
              element={<>
                <Navbar setSearch={setSearch} />
                <Home />
              </>
              } />
            <Route path='/problems' element={<>
              <Navbar setSearch={setSearch} />
              <ProblemSet search={search} />
            </>} />
            <Route path='/problemStatement/:problemID' element={<><Navbar setSearch={setSearch} />
              <ProblemStatement /></>} />
            <Route path='/ide' element={<><Navbar setSearch={setSearch} /><IDE /></>} />
            <Route path='/myProfile' element={<><Navbar setSearch={setSearch} />
              <MyProfile /></>} />
            <Route path='/submissions' element={<><Navbar setSearch={setSearch} />
              <Submissions /></>} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;