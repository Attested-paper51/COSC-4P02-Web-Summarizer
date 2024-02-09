import React, { Component } from 'react';
import "./css/LandingPageStyle.css";

class LandingPage extends Component {

  render() {
    return (
      <div className='main'>
        <a href="/#Summarizer" className="summarizer">
          <div >
            <img 
              className="summarizer-img"
              alt="logo"
              src="images/summarizer.png"
            />
            <h1 className='summarizer.title'>Summarizer</h1>
            <p className='summarizer-para'>Get AI’s help from Shortify to get summarized text with perfection. Create an account to access Pro features!</p>
          </div> 
        </a> 
        
        <a href="/#Shortener" className="shortener">
          <body>
            <img 
              className="shortener-img"
              alt="logo"
              src="images/shortner.png"
            />
            <h1 className='summarizer.title'>URL Shortener</h1>
            <p className='summarizer-para'>Create a Shortened link with one click!</p>
          </body>
        </a> 

      </div>
    );
  };
}

export default LandingPage;