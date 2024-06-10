import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { landingPage as LandingPage } from "./pages/LandingPage/landingPage";
import { LoginPage } from "./pages/LoginPage/LoginPage.js";
import { SignupPage } from "./pages/SignupPage/SignupPage.js";
import { Home } from "./pages/Home/home";
import { ProblemsSet as ProblemSet } from "./pages/ProblemSet/problemsSet.js";
import { ProblemStatement } from "./pages/ProblemStatement/problemStatement.js";
import { IDE } from "./pages/IDE/ide";
import { UserProfileEdit } from './pages/MyProfile/MyProfile';
import { Submissions } from './pages/Submissions/Submission';
import { Footer } from './pages/Footer/footer';
import { Navbar } from './Components/navbar';
import { useRecoilValue } from 'recoil';
import { userAtom } from './atoms/userAtom';
import { SubmissionInfo } from './pages/SubmissionInfo/SubmissionInfo.js';

function App() {
  const user = useRecoilValue(userAtom);
  const [search, setSearch] = useState('');

  
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={user ? <Navigate to='/home' /> : <LoginPage />} />
            <Route path='/signup' element={user ? <Navigate to='/home' /> : <SignupPage />} />
            <Route path='/home'
              element={user ? <>
                <Navbar setSearch={setSearch} />
                <Home />
              </> : <Navigate to='/login' />
              } />
            <Route path='/problems' element={user ? <>
              <Navbar setSearch={setSearch} />
              <ProblemSet search={search} />
            </> : <Navigate to='/login' />} />
            <Route path='/problemStatement/:problemID' element={user ? <><Navbar setSearch={setSearch} />
              <ProblemStatement /></> : <Navigate to='/login' />} />
            <Route path='/ide' element={<><Navbar setSearch={setSearch} /><IDE /></>} />
            <Route path='/myProfile' element={user ? <><Navbar setSearch={setSearch} />
              <UserProfileEdit /></> : <Navigate to='/login' />} />
            <Route path='/submissions' element={user ? <><Navbar setSearch={setSearch} />
              <Submissions /></> : <Navigate to='/login' />} />
            <Route path='/submission/:submission_id' element={user ? <>
              <Navbar setSearch={setSearch} />
              <SubmissionInfo />
            </> : <Navigate to='/login' />}/>
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;