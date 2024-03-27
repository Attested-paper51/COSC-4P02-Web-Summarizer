import { Component, useContext } from "react";
import { Link } from 'react-router-dom';
import "./css/HeaderStyle.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { AuthContext } from '../context/AuthContext.js';
import { useTheme } from './ThemeContext.js';

const Header = () => {
  //maybe remove
  const { userEmail } = useContext(AuthContext);//for user displaying
  const storedEmail = localStorage.getItem('email');
  const storedName = localStorage.getItem('name');

  const { darkMode, toggleDarkMode } = useTheme();

    return (
      <section className={`header-nav-container ${darkMode ? 'head-dark-mode' : 'head-light-mode'}`}>

        <nav className='header-nav'>
          
          <div className="nav-div1">
            <Link to="/">
              <img
                className="img"
                alt="logo"
                src={`${darkMode ? "images/logo-light.png" : "images/logo-dark.png"}`}
              />
            </Link> 
            <h1 className="nav-title"><Link to="/">shortify</Link></h1>
            <div className="nav-text">
            <h3 className="nav-text-sum"><Link to="/Summarizer">SUMMARIZER</Link></h3>
            <h3 className="nav-text-short"><Link to="/Shortener">URL SHORTENER</Link></h3>
            </div>
          </div>

          <div className="nav-div2">
            {/* <Link to="/Mode"> */}
              <button className="mode" onClick={toggleDarkMode}>{darkMode ? <FaSun className={`mode-icon ${darkMode ? 'head-dark-mode' : 'head-light-mode'}`}/> : <FaMoon className={`mode-icon ${darkMode ? 'dark-mode' : 'light-mode'}`} />}</button>
            {/* </Link> */}

            {/* To display the currently logged in user, WIP*/}
            {/* Display profile icon and email if user is logged in */}
            {storedEmail !== null && storedEmail !== 'null' && (
            <>
              <Link to="/Dashboard">
                <button className="profile"><IoPersonSharp className={`profile-icon ${darkMode ? 'head-dark-mode' : 'head-light-mode'}`} /></button>
              </Link>
              <div className="profile-email">{storedName}</div>
            </>
          )}

          {/* Display login button if user is not logged in */}
          {(storedEmail === null || storedEmail === 'null') && (
            <Link to="/Login">
              <button className="profile"><IoPersonSharp className={`profile-icon ${darkMode ? 'head-dark-mode' : 'head-light-mode'}`} /></button>
            </Link>
          )}
          </div>
          
        </nav>
      </section>
    );
  
}

export default Header;

// import React, { Component } from 'react';

// class Header extends Component {
//   render() {
//     // css properties
//     const navStyle = {
//       backgroundColor: '#333',
//       color: 'white',
//       padding: '1em',
//       textAlign: 'center',
//     };

//     const ulStyle = {
//       listStyleType: 'none',
//       margin: 0,
//       padding: 0,
//       display: 'flex',
//       justifyContent: 'space-around',
//     };

//     const liStyle = {
//       display: 'inline-block',
//       marginRight: '1em',
//     };

//     return (
//       <header style={navStyle}>
//         <nav>
//           <div>
//             <ul style={ulStyle}>
//               <li style={liStyle}><a href="#">Home</a></li>
//               <li style={liStyle}><a href="#">About</a></li>
//               <li style={liStyle}><a href="#">Contact</a></li>
//             </ul>
//           </div>
//         </nav>
//       </header>
//     );
//   }
// }

// export default Header;


// import React, { Component } from 'react';
// import "./HeaderStyle.css";

// class Header extends Component {
//   render() {
//     return(
//     <div className="index">
//       <div className="div">
//         <div className="logo">
//           <img
//             className="star"
//             alt="Star"
//             src="https://cdn.animaapp.com/projects/65b1a55658133fdd7aa24152/releases/65bbd6bd8eac5fe801568252/img/star-1.svg"
//           />
//           <div className="text-wrapper">Logo</div>
//         </div>
//         {/* <div className="search-box">
//           <img
//             className="img"
//             alt="Img"
//             src="https://cdn.animaapp.com/projects/65b1a55658133fdd7aa24152/releases/65bbd6bd8eac5fe801568252/img/--.svg"
//           />
//           <p className="search-for-anything">
//             <span className="span">Search </span>
//             <span className="span">for anything</span>
//           </p>
//         </div> */}
//         <div className="nav-links">
//           <div className="text-wrapper-2">Home</div>
//           <div className="frame">
//             <div className="text-wrapper-2">Products</div>
//             <img
//               className="akar-icons-chevron"
//               alt="Akar icons chevron"
//               src="https://cdn.animaapp.com/projects/65b1a55658133fdd7aa24152/releases/65bbd6bd8eac5fe801568252/img/akar-icons-chevron-down.svg"
//             />
//           </div>
//           <div className="text-wrapper-2">About</div>
//           <div className="text-wrapper-2">Pricing</div>
//         </div>
//         <button className="button">
//           <div className="buy-now">Buy Now</div>
//         </button>
//       </div>
//     </div>
//   );
// };
// }

// export default Header;