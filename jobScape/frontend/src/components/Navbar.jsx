import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${show ? 'show_navbar' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="/" className="logo-link">
              <img src="/js.png" alt="JobScape Logo" className="logo-img" />
              <span className="logo-text">JobScape</span>
            </Link>
          </div>
          
          <div className="nav-links">
            <ul>
              <li>
                <Link 
                  to="/" 
                  className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
                  onClick={() => setShow(false)}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link 
                  to="/jobs" 
                  className={`nav-link ${isActiveLink('/jobs') ? 'active' : ''}`}
                  onClick={() => setShow(false)}
                >
                  JOBS
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link 
                      to="/dashboard" 
                      className={`nav-link ${isActiveLink('/dashboard') ? 'active' : ''}`}
                      onClick={() => setShow(false)}
                    >
                      DASHBOARD
                    </Link>
                  </li>
                  <li className="nav-user">
                    <div className="user-menu">
                      <button className="user-btn">
                        <FaUserCircle />
                        <span>{user?.name}</span>
                      </button>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/register" 
                      className={`nav-link ${isActiveLink('/register') ? 'active' : ''}`}
                      onClick={() => setShow(false)}
                    >
                      REGISTER
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/login" 
                      className={`nav-link ${isActiveLink('/login') ? 'active' : ''}`}
                      onClick={() => setShow(false)}
                    >
                      LOGIN
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
            
            <button
              className="hamburger"
              onClick={() => setShow(!show)}
              aria-label="Toggle navigation"
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;