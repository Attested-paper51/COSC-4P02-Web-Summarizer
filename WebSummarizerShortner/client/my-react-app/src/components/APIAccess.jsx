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
          <div>
            <h1>Summarizer API Documentation</h1>
            <h3> Overview </h3>
            <p>This API allows users to summarize text, web pages, or YouTube video content. Users can specify the type of content, desired tone, style, and length for the summary.</p>
            <h3> Base URL </h3>
            <p>The base URL for the API is the endpoint where the API is hosted. For local testing, use: http://127.0.0.1:5000/api/summarize</p>
            <h3> Authentication </h3>
            <p>This version of the API does not require authentication at the moment.</p>
            <h3>Endpoints</h3>
            <h4>POST /api/summarize</h4>
            <p>Summarizes the provided content based on the specified parameters.</p>
            <h4>Request Body</h4>
            <ul>
              <li><span style={{ color: 'green' }}>key</span>: The key for authentication. See the Authentication section to learn how to safely handle keys. (Required)</li>
              <li><span style={{ color: 'green' }}>text</span>: The text to summarize or the URL of the webpage/YouTube video. (Required)</li>
              <li><span style={{ color: 'green' }}>type</span>: The type of content - 0 for Text, 1 for Website URL, 2 for YouTube URL. (Required)</li>
              <li><span style={{ color: 'green' }}>tone</span>: The desired tone of the summary - options are "Standard", "Formal", "Casual", "Sarcastic", "Aggressive", "Sympathetic". (Required)</li>
              <li><span style={{ color: 'green' }}>style</span>: The desired style of the summary - options are "Paragraph", "Bullet Points", "Numbered List". (Required)</li>
              <li><span style={{ color: 'green' }}>length</span>: The desired length of the summary - options are 1 (short), 2 (medium), 3 (long). (Required)</li>
              <li><span style={{ color: 'green' }}>option</span>: Additional options for YouTube URLs - "Full Video", "Timestamp". (Required for YouTube URLs)</li>
              <li><span style={{ color: 'green' }}>citation</span>: Additional options for citing website URLs in the chosen styles - “MLA”, “APA”, “Chicago”. These options are handed to the AI, so any citation format can be handled. (Optional)</li>
            </ul>
            <h4>Response</h4>
            <ul>
              <li>summary: The summarized content.</li>
              <li>error: Error message, if applicable.</li>
            </ul>
            <h4>Example Request</h4>
            <h5>python</h5>
            <code>
              import requests<br/>
              <br/>
              url = 'http://127.0.0.1:5000/api/summarize'<br/>
              data = {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;'text': 'Your text or URL here',<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;'type': 0,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;'tone': 'Standard',<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;'style': 'Paragraph',<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;'length': 1,<br/>
              {'}'}<br/>
              response = requests.post(url, json=data)<br/>
              print(response.json())<br/>
            </code>
            <h4>Example Response</h4>
          </div>
        )}

        {showShortSection && (
          <div className='short-section'>shortener api</div>
        )}

    </div>
    
  );
}

export default APIAccess;