import { Link } from "react-router-dom";
import "./navbar.css"
import { useNavigate } from "react-router-dom";
import logo from './logo.png'
export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <>
            <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/home">
                        <img src={logo} className='navbar-logo'></img>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="d-flex mx-auto" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-light" type="submit">Search</button>
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
                                <Link class="user-dropdown nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    User
                                </Link>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/myProfile">My Profile</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><button class="btn dropdown-item" onClick={() => {
                                        localStorage.removeItem('userInfo');
                                        navigate('/');
                                    }}>LOGOUT</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
