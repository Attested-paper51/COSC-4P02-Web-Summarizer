import React, { Component } from 'react';
import "./css/HeroStyle.css";

class Hero extends Component 
{
  render() {
    return(
      <div className="hero">
        <div className="hero-div1">
          <div className="hero-title">
            <p className="hero-heading">
              Your shortcut to simplicity.
            </p>
            <p className="hero-subheading">
              Say goodbye to lengthy URLs and information overload — discover the power of simplicity with our intuitive platform.
            </p>
          </div>
        </div>
        <div className="hero-div2">
          <img className="logo" alt="Logo" src="images/img1.png" />
        </div>
      </div>
    );
  };
}

export default Hero;

