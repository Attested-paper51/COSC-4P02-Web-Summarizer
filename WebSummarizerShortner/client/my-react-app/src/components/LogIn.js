import React, { Component } from 'react';
import "./css/LogInStyle.css";
import img from "./images/img2.png"

class LogIn extends Component {
  render() {
    return(
      <div className="box">
        <div className="form">
          <div className="username">
            <div className="user-text">Your email</div>
            <div className="textfield">
              {/* <div className="text-wrapper">USERNAME</div>
              <img className="img" alt="User" src="user.svg" /> */}
            </div>
          </div>
          <div className="password">
            <div className="pass-text">Your password</div>
            <div className="textfield">
              {/* <div className="text-wrapper">PASSWORD</div>
              <img className="img" alt="Lock" src="lock.svg" /> */}
            </div>
          </div>
          <button className="login-btn">
            <div className="login-overlap">
              <div className="login">Log in</div>
            </div>
          </button>
          <div className="forgot">
            Forgot your password?
          </div>
        </div>
        <div className="account">
            <div className="join">
              Upgrade to Pro for FREE and unlock Tailored Summaries, Analytics and API Integration!
            </div>
            <div className="account-img">
              <img className="logo" alt="Logo" src={img} />
            </div>
            {/* <div className="dont">
              Don't have an account?
            </div> */}
            <button className="create-btn">
              <div className="create-overlap">
                <div className="create">Create an account</div>
              </div>
            </button>
          </div>
      </div>
    );
  };
}

export default LogIn;