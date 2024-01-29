import { Component } from 'react';
//import "./Header.css"; // Import your styles if you have any

class Header extends Component {
  render() {
    // Define an object with CSS properties
    
    const left = {
      display: 'flex',
      align: 'center',
      margin: 'left',
    };

    // left {
    //   display: flex;
    //   align-items: center;
    //   margin-left: 0.75em;
    // }

    return (
      <header>
        <nav>
          <div class={left}>
          {/* <div title="Title" class="menubutton">
            <ExpandButton bind:open={isMenuOpen} /> */}
          </div>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          
        </nav>
      </header>
    );
  }
}

export default Header;
