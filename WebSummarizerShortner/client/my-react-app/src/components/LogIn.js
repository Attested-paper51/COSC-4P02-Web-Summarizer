import React, { useState } from 'react';
import "./css/LogInStyle.css";
import img from "./images/img2.png"
import gmail from "./images/gmail.jpg"
import fb from "./images/fb.png"


const LogIn = () => {

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  
  // const [CopyURL, setCopyURL] = useState('Copy URL')
  // const handleCopy = () => {
  //     navigator.clipboard.writeText(shortened)
  //     setCopyURL('Copied')
  //     setTimeout(() => {
  //         setCopyURL('Copy URL');
  //     }, 3000); // Reverts back to 'Submit' after 3 seconds
  // }

  const handleSubmit = (e) => {
      const User = {user} 
      const Pass = {pass}
      console.log(User)
      console.log(Pass)
  }

  return (
    <div className="box">
      <div className="form">
        <div className="form-title">Log in</div>
        <button className="gmail-btn">
          <div className="gmail-overlap">
            <img className="gmail-icon" alt="Log in with Gmail" src={gmail} />
            <div className="login-social">Continue with Gmail</div>
          </div>
        </button>
        <button className="fb-btn">
          <div className="fb-overlap">
          < img className="fb-icon" alt="Log in with Facebook" src={fb} />
            <div className="login-social">Continue with Facebook</div>
          </div>
        </button>
        <div className="username">
          <label className='user-text'>Your email</label> 
          <input className='textfield'
            type="text" 
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder='Enter email here' 
          />
          {/* <div className="user-text">Your email</div>
          <textfield className="textfield"></textfield> */}
        </div>
      
        <div className="password">
          <label className='pass-text'>Your password</label> 
          <input className='textfield'
            type="text" 
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder='Enter password here' 
          />
          {/* <div className="pass-text">Your password</div>
          <div className="textfield"></div> */}
        </div>
        <button className="login-btn" onClick={handleSubmit}>
          <div className="login-overlap">
            <div className="login">Log in</div>
          </div>
        </button>
        <div className="forgot">
          <a href="#">Forgot your password?</a>
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
}

export default LogIn;