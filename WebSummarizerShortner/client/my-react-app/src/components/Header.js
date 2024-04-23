import { Component, useContext } from "react";
import { Link } from 'react-router-dom';
import "./css/HeaderStyle.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { AuthContext } from '../context/AuthContext.js';
import { useTheme } from './ThemeContext.js';

const Header = () => {
  //maybe remove
  // const { userEmail } = useContext(AuthContext);//for user displaying
  const storedEmail = localStorage.getItem('email');
  const storedName = localStorage.getItem('name');

  const { darkMode, setDarkMode } = useTheme();

  // Function to toggle dark mode
  const toggleDarkMode = () => {
      setDarkMode(prevMode => !prevMode);
  };

    return (
      <section className={`header-nav-container ${darkMode ? 'header-dark' : 'header-light'}`}>

        <nav className='header-nav'>
          
          <div className="nav-div1">
            <Link to="/">
              <img
                className="img"
                alt="logo"
                src={`${darkMode ? "images/logo-light.png" : "images/logo-dark.png"}`}
              />
            </Link> 
            <h1 className="nav-title"><Link to="/">shortify</Link></h1>
            <div className="nav-text">
            <h3 className="nav-text-sum"><Link to="/Summarizer">SUMMARIZER</Link></h3>
            <h3 className="nav-text-short"><Link to="/Shortener">URL SHORTENER</Link></h3>
            </div>
          </div>

          <div className="nav-div2">
            {/* <Link to="/Mode"> */}
              <button 
                className="mode" 
                onClick={toggleDarkMode}
                data-testid="mode-button"
              >
                {darkMode ? <FaSun data-testid="sun-icon" className={`mode-icon ${darkMode ? 'header-dark-icon' : 'header-light-icon'}`}/> : <FaMoon data-testid="moon-icon" className={`mode-icon ${darkMode ? 'dark-mode' : 'light-mode'}`} />}
              </button>
            {/* </Link> */}

            {/* To display the currently logged in user, WIP*/}
            {/* Display profile icon and email if user is logged in */}
            {storedEmail !== null && storedEmail !== 'null' && (
            <>
              <Link to="/Dashboard">
                <button className="profile"><IoPersonSharp className={`profile-icon ${darkMode ? 'header-dark-icon' : 'header-light-icon'}`} /></button>
              </Link>
              <div className="profile-email">{storedName}</div>
            </>
          )}

          {/* Display login button if user is not logged in */}
          {(storedEmail === null || storedEmail === 'null') && (
            <Link to="/Login">
              <button className="profile"><IoPersonSharp className={`profile-icon ${darkMode ? 'header-dark-icon' : 'header-light-icon'}`} /></button>
            </Link>
          )}
          </div>
          
        </nav>
      </section>
    );
  
}

export default Header;

