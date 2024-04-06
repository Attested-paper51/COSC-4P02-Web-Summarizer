import React, { useState } from 'react';
import "./css/APIAccessStyle.css";
import { useTheme } from './ThemeContext.js'

const APIAccess = () => {

  const { darkMode } = useTheme();

  const [showSumSection, setShowSumSection] = useState(true); // State for Web Summarizer section
  const [showShortSection, setShowShortSection] = useState(false); // State for URL Shortener section
  const [activeButton, setActiveButton] = useState('sum'); // State for active button

  const handleSumButtonClick = () => {
    setShowSumSection(true);
    setShowShortSection(false);
    setActiveButton('sum');
  };

  const handleShortButtonClick = () => {
    setShowShortSection(true);
    setShowSumSection(false);
    setActiveButton('short');
  };


  return (

    <div className="api-wrapper">
        
        <h1>API Access</h1>
        <div className='hist-section'>
          <button className={`sum-btn ${activeButton === 'sum' ? 'active' : ''}`} onClick={handleSumButtonClick}>API Access for Web Summarizer</button>
          <button className={`short-btn ${activeButton === 'short' ? 'active' : ''}`} onClick={handleShortButtonClick}>API Access for URL Shortener</button>
        </div>

        {showSumSection && (
          <div className='sum-section'>summarizer api</div>
        )}

        {showShortSection && (
          <div className='short-section'>shortener api</div>
        )}

    </div>
    
  );
}

export default APIAccess;