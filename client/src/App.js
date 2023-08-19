import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {landingPage as LandingPage} from "./pages/LandinPage/landingPage";
import {LoginPage} from "./pages/LoginPage/LoginPage.js";
import {SignupPage} from "./pages/SignupPage/SignupPage.js";
import {home as Home} from "./pages/Home/home";
import {ProblemsSet as ProblemSet} from "./pages/ProblemSet/problemsSet.js";
import {ProblemStatement} from "./pages/ProblemStatement/problemStatement.js";
import {IDE} from "./pages/IDE/ide";
import {MyProfile} from './pages/MyProfile/MyProfile';
//import {Submissions} from "./pages/submissions";

function App() {

 return (
   <div className="App">
     <Router>
       <Routes>
         <Route path='/' element={<LandingPage />} />
         <Route path='/login' element={<LoginPage />} />
         <Route path='/signup' element={<SignupPage/>}/>
         <Route path='/home' element={<Home />} />
         <Route path='/problems' element={<ProblemSet />} />
         <Route path='/problemStatement/:problemID' element={<ProblemStatement />} />
         <Route path='/ide' element={<IDE />} />
         <Route path='/myProfile' element={<MyProfile />} />
         {/* <Route path='/submissions' element={<Submissions />} /> */}
       </Routes>
     </Router>
   </div>
 );
}

export default App;