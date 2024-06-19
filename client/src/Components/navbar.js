import { Link } from "react-router-dom";
import "./navbar.css"
import { useNavigate } from "react-router-dom";
import logo from './csfn-logo.png'
import { useEffect } from "react";

export const Navbar = ({setSearch}) => {
    const navigate = useNavigate();
    //const userInfo = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //console.log(userInfo);

    // useEffect(() => {
    //     if (userInfo) {
    //         navigate('/');
    //     }
    // }, [navigate]);

    const logoutHandler = () => {
        // Remove user information from localStorage
        localStorage.removeItem('userInfo');

        // Navigate the user to the '/' route
        navigate('/');
    }

    return (
        <>
            <nav className="navbar navbar-light navbar-expand-lg" style={{backgroundColor:"#00BB00",borderBottom:"1.5px solid white"}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/home">
                        <img src={logo} className='navbar-logo' style={{width:"230px",height:"38px"}}></img>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="d-flex mx-auto" role="search">
                            <input class="form-control me-2 bg-dark" type="search" placeholder="Discover Problems" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} />
                            {/* <button class="btn btn-outline-dark" type="submit">Search</button> */}
                        </form>
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                {/* <a class="nav-link" aria-current="page" href="/home">Home</a> */}
                                <Link to={"/home"} className="home">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={"/problems"} className="navProblems"> Problems </Link>
                            </li>
                            <li class="nav-item">
                                {/* <a class="nav-link" href="/mySubmissions">My Submissions</a> */}
                                <Link to={"/submissions"} className="navSubmissions">Submissions</Link>
                            </li>
                            <li class="nav-item">
                                {/* <a class="nav-link" href="/ide">Online IDE</a> */}
                                <Link to={'/ide'} className='ide'>IDE</Link>
                            </li>
                            <li class="nav-item nav-dropdown dropdown">
                                <Link class="user user-dropdown dropdown-toggle" role="button" data-bs-toggle="dropdown" >
                                    {userInfo && userInfo.name}
                                </Link>
                                <ul class="dropdown-menu">
                                    <li><Link class="dropdown-item" to="/myProfile" style={{fontFamily: "IBM Plex Mono, monospace",fontWeight:"bold"}}>My Profile</Link></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><button class="btn dropdown-item" style={{fontFamily: "IBM Plex Mono, monospace", fontWeight:"bold"}} onClick={logoutHandler}>LOGOUT➡️</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
