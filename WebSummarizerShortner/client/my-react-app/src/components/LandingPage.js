import React from 'react';
import "./css/LandingPageStyle.css";
import { Link } from 'react-router-dom';

const LandingPage = () => 
{
  return (
    <div className='main'>
      <Link to="/Summarizer" className="summarizer">
        <div className='main-summarizer'>
          <img 
            className="summarizer-img"
            alt="logo"
            src="images/summarizer.png"
          />
          <h1 className='title'>Summarizer</h1>
          <p className='para'>Get AI’s help from Shortify to get summarized text with perfection. Create an account to access Pro features!</p>
        </div> 
      </Link>
    
      <Link to="/Shortener" className="shortener">
        <div className='main-shortener'>
          <img 
            className="shortener-img"
            alt="logo"
            src="images/shortner.png"
          />
          <h1 className='title'>URL Shortener</h1>
          <p className='para'>Create a Shortened link with one click!</p>
        </div>
      </Link> 
    </div>
  );
}

export default LandingPage;