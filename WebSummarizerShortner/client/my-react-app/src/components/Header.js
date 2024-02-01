import React, { Component } from 'react';

class Header extends Component {
  render() {
    // css properties
    const navStyle = {
      backgroundColor: '#333',
      color: 'white',
      padding: '1em',
      textAlign: 'center',
    };

    const ulStyle = {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'space-around',
    };

    const liStyle = {
      display: 'inline-block',
      marginRight: '1em',
    };

    return (
      <header style={navStyle}>
        <nav>
          <div>
            <ul style={ulStyle}>
              <li style={liStyle}><a href="#">Home</a></li>
              <li style={liStyle}><a href="#">About</a></li>
              <li style={liStyle}><a href="#">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
