import { Link, NavLink } from "react-router-dom";
// import Logo from "../../assets/images/Logo.png";
import "../styles/layout-styles/Nav.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { isAuthenticated } = useContext(AuthContext);
  const isMyPostsPage = location.pathname === "/my-posts";
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
          <button className="navbutton" >
          <Link to={isAuthenticated ? "/account" : "/login"} style={{color: "black"}}>
                  {isAuthenticated === undefined ? "Login" : isAuthenticated ? "Account" : isMyPostsPage ? "Account" : "Login"}
              </Link>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
