import React from 'react';
import "./css/LandingPageStyle.css";
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext.js';

const LandingPage = () => 
{
  const { darkMode } = useTheme();

  return (
    <div className={`main ${darkMode ? 'landing-dark' : 'landing-light'}`}>
      <Link to="/Summarizer" className={`summarizer ${darkMode ? 'sumshort-dark' : 'sumshort-light'}`}>
        <div className='main-summarizer'>
          <img 
            className="summarizer-img"
            alt="logo"
            src="images/summarizer.png"
          />
          <h1 className='title'>Summarizer</h1>
          <p className='para'>
            <b>Experience instant clarity with our Summarizer tool!</b> <br></br><br></br>
            Sign up now to access pro Summarizer features like customizable summarization levels, API Access and more! 
          </p>
        </div> 
      </Link>
    
      <Link to="/Shortener" className={`shortener ${darkMode ? 'sumshort-dark' : 'sumshort-light'}`}>
        <div className='main-shortener'>
          <img 
            className="shortener-img"
            alt="logo"
            src="images/shortner.png"
          />
          <h1 className='title'>URL Shortener</h1>
          <p className='para'>
            <b>Amplify your impact with our URL Shortener tool!</b> <br></br><br></br> 
            Perfect for social media posts, our tool ensures your content gets noticed without cluttering your message. 
          </p>
        </div>
      </Link> 
    </div>
  );
}

export default LandingPage;