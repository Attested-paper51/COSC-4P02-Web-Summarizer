import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./css/FooterStyle.css";

class Footer extends Component {
  render() {
    return (
      <div className='footer-container'>
        <footer>
          <nav className='footer-text'>
              <h3 className='footer-help'><Link to="/#">Help</Link></h3>
              <h3 className='footer-feedback'><Link to="/Feedback">Feedback</Link></h3>
          </nav>
        </footer>
      </div>
    );
  };
}

export default Footer;