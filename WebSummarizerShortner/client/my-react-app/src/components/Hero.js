import React from 'react';
import "./css/HeroStyle.css";
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.js';

/**
 * 
 * @returns Hero section of the page
 */
const Hero = () => {
  
  const { darkMode } = useTheme();

  return(
    <div className={`hero ${darkMode ? 'hero-dark' : 'hero-light'}`}  data-testid="hero-container">
      <div className="hero-div1">
        <div className="hero-title">
          <p className="hero-heading">
            Your shortcut to simplicity.
          </p>
          <p className="hero-subheading">
            Say goodbye to lengthy URLs and information overload — discover the power of simplicity with our intuitive platform.
          </p>
            <button className="try-btn">
            <Link to="/Summarizer">
              <div className={`try-overlap ${darkMode ? 'hero-try-dark' : 'hero-try-light'}`}>
                <div className="try">Try it now!</div>
              </div>
              </Link>
            </button>
        </div> 
      </div>
      <div className="hero-div2">
        <img className="logo" alt="Logo" src="images/hero-light-wbg.png" />
      </div>
    </div>
  );
};


export default Hero;

