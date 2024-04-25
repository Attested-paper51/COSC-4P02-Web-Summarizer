import React from 'react';
import { Link } from 'react-router-dom';
import "./css/FooterStyle.css";
import { useTheme } from '../context/ThemeContext.js';
/**
 * 
 * @returns Footer of the website
 */
const Footer = () => {

  const {darkMode} = useTheme();
  return (
    <div className='footer'>
      <footer className={`footer-container ${darkMode ? 'footer-dark' : 'footer-light'}`}>
        <nav className='footer-text'>
            {/* <h3 className='footer-help'><Link to="/#">Help</Link></h3> */}
            <h3 className='footer-feedback'><Link to="/Feedback">Feedback</Link></h3>
        </nav>
      </footer>
    </div>
  );
};


export default Footer;