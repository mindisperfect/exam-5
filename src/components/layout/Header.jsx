import { Link, NavLink, useNavigate } from "react-router-dom";
// import Logo from "../../assets/images/Logo.png";
import "../styles/layout-styles/Nav.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";
import { EXPIRE_DATE, ROLE, TOKEN } from "../../const";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const { setIsAuthenticated, setRole } = useContext(AuthContext);
  const isMyPostsPage = location.pathname === "/my-posts";
  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    Cookies.remove(TOKEN);
    Cookies.remove(ROLE);
    Cookies.remove(EXPIRE_DATE);
    navigate("/");
  };
  return (
    <nav id="navbar" className="navbarshrink">
      <div className="container navcontainer">
        <div className="navlogo">
          <Link to="/">
            {isAuthenticated ? <h1 style={{color: "white"}}>My Blogs</h1> : <h1 style={{color: "white"}}>Najot news</h1>}
          </Link>
        </div>
        <div className="hamburger">
          <i className="uil uil-bars"></i>
        </div>
        <div className="navlinks">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/about">About Us</NavLink> 
          <NavLink to="/register">Register</NavLink>
          <div className="buttons">
          <button className="navbutton" >
          <Link to={isAuthenticated ? "/account" : "/login"} style={{color: "black"}}>
                  {isAuthenticated === undefined ? "Login" : isAuthenticated ? "Account" : isMyPostsPage ? "Account" : "Login"}
              </Link>
          </button>
          </div>
          {isAuthenticated ? <button style={{backgroundColor: "red", color: "white", padding: "20px 32px"}} onClick={logout} >
                  Logout
                </button> : null}
        </div>
      </div>
    </nav>
  );
}

export default Header;
