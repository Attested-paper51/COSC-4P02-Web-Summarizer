import React, { Component } from 'react';

class Header extends Component {
  render() {

    // css properties
    const headerStyle = {
      backgroundColor: '#374375',
      color: '#FFFCF5',
      padding: '1em',
      display: 'flex', display: '-webkit-box',
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'center',
      alignItems: 'center',
      gap: '2em',
    };

    const navStyle = {
      // position: 'fixed',

      display: 'flex', display: '-webkit-box',
      justifyContent: 'space-between',
    };

    const ulStyle = {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
      display: 'flex', display: '-webkit-box',
      justifyContent: 'space-evenly',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
    };

    const liStyle = {
      // display: 'inline-block',
      // marginRight: '1em',
    };

    return (
      <header style={headerStyle}>

        <div className='div1'> logo </div>

        <div> shortify </div>

        <nav style={navStyle}>
          <ul style={ulStyle}>
            <li style={liStyle}><a href="#">Summarizer</a></li>
            <li style={liStyle}><a href="#">URL Shortener</a></li>
          </ul>
        </nav>

        <div> Mode </div>

        <div> Account </div>

      </header>
    );
  }
}

export default Header;
