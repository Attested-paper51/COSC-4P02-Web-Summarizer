import React, { Component } from 'react';
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        <nav className='footer-text'>
            <h3><a href="/#">Help</a></h3>
            <h3><a href="/#">Feedback</a></h3>
        </nav>
      </footer>
    );
  };
}

export default Footer;