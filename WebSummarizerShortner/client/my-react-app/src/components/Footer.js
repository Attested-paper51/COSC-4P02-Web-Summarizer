import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./css/FooterStyle.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        <nav className='footer-text'>
            <h3><Link to="/#">Help</Link></h3>
            <h3><Link to="/Feedback">Feedback</Link></h3>
        </nav>
      </footer>
    );
  };
}

export default Footer;