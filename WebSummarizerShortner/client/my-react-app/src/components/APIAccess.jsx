import React, { useState } from 'react';
import "./css/APIAccessStyle.css";
import { useTheme } from './ThemeContext.js'
import PopUp from './PopUp.js';
import { FaRegCopy, FaCopy } from 'react-icons/fa';

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

  const[APIKeyPopup, setAPIKeyPopup] = useState(false);
  const [APIKey, setAPIKey] = useState('');
  const [CopyAPIKey, setCopyAPIKey] = useState(false)
  const handleCopy = () => {
        navigator.clipboard.writeText(APIKey)
        setCopyAPIKey(true)
        setTimeout(() => {
          setCopyAPIKey(false);
        }, 3000); // Reverts back to 'Submit' after 3 seconds
  }

  const handleFetchAPIKey = async () => {
    const email = localStorage.getItem('email');

    try { 
      const response = await fetch('http://localhost:5001/getapikey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result.key);
          setAPIKey(result.key);
          setAPIKeyPopup(true);

        }

    }catch (error) {

    }
  
  }


  return (

    <div className="api-wrapper">
        
        <h1 className='title'>API Access</h1>
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
            <p>The base URL for the API is the endpoint where the API is hosted. For local testing, use: <span> http://127.0.0.1:5000/api/summarize</span></p>
            <h3> Authentication </h3>
            <p>The API requires an API key for authentication to ensure secure access to its features.</p>
            
            {/* <button className='api-key' onClick={() => setAPIKeyPopup(true)}> */}
            <button className='api-key' onClick={handleFetchAPIKey}>
            <div className={`btn-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
              <div className={`get-api ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Get API Key</div>
            </div>
            </button>
            
            <h4>Securing the API Key</h4>
            <p>It's crucial to keep your API key secure and not expose it in your code or version control systems. To manage your API key securely, we recommend using environment variables. This approach keeps your key out of your source code and provides flexibility in changing the key without modifying your application code.</p>
            <h4>Setting up the Environment Variable</h4>
            <ol>
              <li><strong>Create a <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>.env</span> file:</strong> This  guyfile will store your environment variables. Place this file in the root directory of your project. Ensure that <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>.env</span> is added to your <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>.gitignore</span> file to prevent it from being uploaded to version control.</li>
              <li>
                <strong>Add the API Key to the <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>.env</span> file:</strong> Inside the <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>.env</span> file, you can assign your API key to a variable. For example:<br/>
                <code>
                <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>SHORTIFY_KEY=your_api_key_here</span><br/>
                </code>
              </li>
            </ol>
            <h4>Accessing the API Key in Your Application</h4>
            <p>Use the <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>dotenv</span> package to load and access environment variables in your application. Here's how you can do it:<br /> <i>python</i></p>
            <code>
              <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>
                import os<br/>
                from dotenv import load_dotenv<br/>
                <br/>
                # Load environment variables<br/>
                load_dotenv()<br/>
                # Access the API key<br/>
                api_key = os.getenv("SHORTIFY_KEY")<br/>
                <br/>
              </span>
            </code>
            <h4>Using the API Key in Requests</h4>
            <p>When making a request to the API, include the API key in the request body as shown in the example below:<br/><i>python</i></p>
            <code>
              <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>
                # Load environment variables<br/>
                load_dotenv()<br/>
                <br/>
                # Set key<br/>
                api_key = os.getenv("SHORTIFY_KEY")<br/>
                <br/>
                # The URL of the API endpoint<br/>
                url = 'http://127.0.0.1:5000/api/summarize'<br/>
                <br/>
                # The data to be sent to the API <br/>
                data = {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'key': api_key, <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'input': "Example text",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'type': 0,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'tone': 'Standard',<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'style': 'Paragraph',<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'length': 'short',<br/>
                {'}'}<br/>
                response = requests.post(url, json=data)<br/>
                print(response.json())<br/>
                <br/>
              </span>
            </code>
            <p>By following these steps, users can securely authenticate with the API using their unique API key, ensuring that their integration with the API is secure and reliable.</p>
            <h3>Endpoints</h3>
            <h4>POST /api/summarize</h4>
            <p>Summarizes the provided content based on the specified parameters.</p>
            <h4>Request Body</h4>
            <ul>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>key</span>: The key for authentication. See the Authentication section to learn how to safely handle keys. (Required)</li>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>input</span>: The text to summarize or the URL of the webpage/YouTube video. (Required)</li>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>type</span>: The type of content - 0 for Text, 1 for Website URL, 2 for YouTube URL. (Required)</li>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>tone</span>: The desired tone of the summary - options are "Standard", "Formal", "Casual", "Sarcastic", "Aggressive", "Sympathetic". (Required)</li>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>style</span>: The desired style of the summary - options are "Paragraph", "Bullet Points", "Numbered List". (Required)</li>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>length</span>: The desired length of the summary - options are "short", "medium", "long". (Required)</li>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>option</span>: Additional options for YouTube URLs - "Full Video", "Timestamp". (Required for YouTube URLs)</li>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>citation</span>: Additional options for citing website URLs in the chosen styles - “MLA”, “APA”, “Chicago”. (Optional)</li>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>startTime</span>: The start time for partial YouTube videos when using the Timestamp option. Enter in <i>HH:MM</i> format, for hours and minutes of the YouTube Video. (Required for Timestamp option for YouTube URLs)</li>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>endTime</span>: The ending time for partial YouTube videos when using the Timestamp option. Enter in <i>HH:MM</i> format, for hours and minutes of the YouTube Video. (Required for Timestamp option for YouTube URLs)</li>
            </ul>
            <h4>Response</h4>
            <ul>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>summary</span>: The summarized content.</li>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>error</span>: Error message, if applicable.</li>
            </ul>
            <h4>Example Request</h4>
            <p>python</p>
            <code>
              <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>
                import requests<br/>
                <br/>
                url = 'http://127.0.0.1:5000/api/summarize'<br/>
                # The data to be sent to the API<br/>
                data = {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'key' : api_key,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'input': "https://www.youtube.com/watch?v=qYvXk_bqlBk",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'type': 2,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'tone': 'Standard',<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'style': 'Paragraph',<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'length': 'short',<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'option' : "Timestamp",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'startTime' : "00:10",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'endTime' : "00:15"<br/>
                {'}'}<br/>
                response = requests.post(url, json=data)<br/>
                print(response.json())<br/>
                <br/>
              </span>
            </code>
            <h4>Example Response</h4>
            <p>json</p>
            <code>
              <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>
                {'{'}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;"summary": "Your summarized text will appear here."<br/>
                {'}'}<br/>
              </span>
              <br/>
            </code>
            <h3>Error Handling</h3>
            <ul>
              <li>If the required fields are not provided or are invalid, the API will return an error message.</li>
              <li>If the <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>type</span> is not 0, 1, or 2, the API will return an error message.</li>
              <li>If there's an internal error during the summarization process, the API will return an error message.</li>
            </ul>
          </div>
        )}

        {showShortSection && (
          <div>
            <h1> URL Shortener API Documentation</h1>
            <h3> Overview </h3>
            <p>The URL Shortener API allows a user to utilize the URL shortening functionality implemented in this project. There are two provided functionalities, URL shortening, and short URL resolving - returning a short URL to its original form. </p>
            <h3> Base URLs </h3>
            <p>
              The URL shortening functionality relies on the following base URL: <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>http://127.0.0.1:5002/apishorten</span> <br /> 
              The short URL resolution functionality relies on the following base URL: <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>http://127.0.0.1:5002/apiresolve</span>
            </p>
            <h3> Authentication </h3>
            <p> The API key must be provided when making requests to the API.  </p>

            <button className='api-key' onClick={handleFetchAPIKey}>
            <div className={`btn-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
              <div className={`get-api ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Get API Key</div>
            </div>
            </button>

            <h3>Endpoints</h3>
            <h4>POST /apiapishorten</h4>
            <p>Shortens the provided original URL, provided that the URL begins with https://, http:// or www. This API does not support other URL types, and will return an error if this syntax is not followed.</p>
            <h4>Request Body</h4>
            <ul>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>key</span>: The API key provided for you. </li>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>originalURL</span>: The URL you wish to shorten. </li>
            </ul>
            <h4>Response</h4>
            <ul>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>Message</span>: Either the returned shortened URL, or a string describing what went wrong if an error occurred. </li>
            </ul>
            <h4>Request Format:</h4>
            <p>python</p>
            <code>
              <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>
                import requests<br/>
                <br/>
                #The URL of the API endpoint<br/>
                url = 'http://localhost:5002/apishorten' <br/>
                data = {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'key': apiKey,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'originalURL': originalURL, <br/>
                {'}'}<br/>
                #Make a post request to URL<br/>
                response = requests.post(url,json=data) <br/>
                # The response embedded in message<br/>
                return response.json()['message'] <br/>
                <br/>
              </span>
            </code>
            <h4>Request Response Example:</h4>
            <p>json</p>
            <code>
              <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>
                {'{'}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;  "message": "https://localhost:5002/–short–"<br/>
                {'}'}<br/>
              </span>
              <br/>
            </code>
            <h4>POST /apiresolve</h4>
            <p>Resolves the given shortened URL. This URL must be a short link generated by our system previously, aka it must be in our database. It will return the original link inputted if done correctly. </p>
            <h4>Request Body</h4>
            <ul>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>key</span>: The API key provided for you. </li>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>shortURL</span>: The short URL you wish to receive the original link from.  </li>
            </ul>
            <h4>Response</h4>
            <ul>
              <li><span className={`${darkMode ? 'span-dark' : 'span-light'}`}>Message</span>: Either the returned original URL, or a string describing what went wrong if an error occurred. </li>
            </ul>

            <h4>Request Format:</h4>
            <p>python</p>
            <code>
              <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>
                import requests<br/>
                <br/>
                #The URL of the API endpoint<br/>
                url = 'http://localhost:5002/apiresolve' <br/>
                data = {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'key': apiKey,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;'originalURL': shortURL, <br/>
                {'}'}<br/>
                #Make a post request to URL<br/>
                response = requests.post(url,json=data)<br/> 
                # The response embedded in message<br/>
                return response.json()['message']<br/> 
                <br/>
              </span>
            </code>
            <h4>Request Response Example:</h4>
            <p>json</p>
            <code>
              <span className={`${darkMode ? 'span-dark' : 'span-light'}`}>
                {'{'}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;  "message": "https://www.originalURL.com"<br/>
                {'}'}<br/>
              </span>
              <br/>
            </code>

            <h3>Error Handling</h3>
            <p>Errors are displayed in the ‘message’ response. </p>
            <p><u>Shortening</u></p>
            <ul> 
              <li>If the API key is not valid: “API Key is not valid”</li>
              <li>If the URL doesn’t start with http://, https:// or www. : “Original URL not valid."</li>
            </ul>
            <p><u>Resolving</u></p>
            <ul>
              <li>If the API key is not valid: “API Key is not valid”</li>
              <li>If the short URL inputted is not valid (not in the database): “Short URL incorrect”</li>
            </ul>
          </div>
        )}

            <PopUp trigger={APIKeyPopup} setTrigger={setAPIKeyPopup} title='API key created'>
                <label className='pop-label'>Your API key</label>
                <div className='api-container'>
                  <input 
                    className='api-textfield'
                    type="text" 
                    value={APIKey}
                    readOnly
                  />
                  <div className='copy'>
                    {/* Display 'FaCopy' icon if copied, otherwise display 'FaRegCopy' */}
                    {CopyAPIKey ? <FaCopy className={`${darkMode ? 'copy-dark' : 'copy-light'}`} onClick={handleCopy} /> : <FaRegCopy className={`${darkMode ? 'copy-dark' : 'copy-light'}`} onClick={handleCopy} />}
                  </div>
                </div>
                <button className='close-btn' onClick={() => setAPIKeyPopup(false)}>
                  <div className={`close-btn-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                      <div className={`close ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Close</div>
                  </div>
                </button>
            </PopUp>

    </div>
    
  );
}

export default APIAccess;