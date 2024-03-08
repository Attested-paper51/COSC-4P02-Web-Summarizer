import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./css/VerifyUserStyle.css";

const VerifyUser = () => {

  const [user, setUser] = useState('');

  const handleSubmit = (e) => {
      const Username = {user}
      console.log(Username)
  }

  return (
    <div className="verify-box">
      <div className="form">
        <div className='form-title'>Verifying User</div>
        <div className="form-subtitle">Forgot your password? Don't worry, it happens! Enter your email below to reset your password</div>
        <div className="username">
          <label className='user-text'>Your email</label> 
          <input className='textfield'
            type="text" 
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder='Enter email here' 
          />
          <div class="email-error">Email ID not found!</div>
        </div>  

        <Link to="/Reset">
            <button className="reset-btn" onClick={handleSubmit}>
            <div className="reset-overlap">
                <div className="reset">Reset your password</div>
            </div>
            </button>
        </Link>
    
      </div>
    </div>
  );
}

export default VerifyUser;