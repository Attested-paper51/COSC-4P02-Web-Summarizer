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


import { Component } from "react";
import { Link } from 'react-router-dom';
import "./css/HeaderStyle.css";

class Header extends Component {
  render() {
    return (
      <section className="header-nav-container">

        <nav className='header-nav'>
          
          <div className="nav-div1">
            <Link to="/">
              <img
                className="img"
                alt="logo"
                src="images/logo.png"
              />
            </Link> 
            <h1 className="nav-title"><Link to="/">Shortify</Link></h1>
            <h3 className="nav-text-sum"><Link to="/Summarizer">Summarizer</Link></h3>
            <h3 className="nav-text-short"><Link to="/Shortener">URL Shortener</Link></h3>
          </div>

          <div className="nav-div2">
            <Link to="/Mode">
              <img 
                className="darkmode"
                alt="darkmode"
                src="images/darkmode.png"
              />
            </Link>

            <Link to="/Login">
              <img 
                className="profile"
                alt="profile"
                src="images/profile.png"
              />
            </Link>
          </div>
          
        </nav>
      </section>
    );
  };
}

export default Header;