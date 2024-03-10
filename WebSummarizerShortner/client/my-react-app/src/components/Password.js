import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import "./css/PasswordStyle.css";

const Password = () => {

  const [pass, setPass] = useState('');
  const [finalPass, confirmPass] = useState('');

  const handleSubmit = (e) => {
      const Password = {pass}
      const ConfirmPassword = {finalPass}
      console.log(Password)
      console.log(ConfirmPassword)
  }

  return (
    <div className="pass-box">
      <div className="form">
        <div className='form-title'>Reset account password</div>
        {/* <div className="form-subtitle">Join us to access to Tailored Summaries, Analytics, API Integration and more!</div> */}
        {/* <div className="username">
          <label className='user-text'>Enter your email</label> 
          <input className='textfield'
            type="text" 
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder='Enter email here' 
          />
        </div> */}
      
        <div className="password">
          <label className='pass-text'>Enter new password</label> 
          <input className='textfield'
            type="text" 
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder='Enter password here' 
          />
        </div>

        <div className="password">
          <label className='pass-text'>Re-enter new password</label> 
          <input className='textfield'
            type="text" 
            required
            value={finalPass}
            onChange={(e) => confirmPass(e.target.value)} 
            placeholder='Enter password here' 
          />
          <div class="pass-error">Passwords do not match!</div>
        </div>

        <button className="reset-btn" onClick={handleSubmit}>
          <div className="reset-overlap">
            <div className="reset">Reset password</div>
          </div>
        </button>
        
      </div>
    </div>
  );
}

export default Password;