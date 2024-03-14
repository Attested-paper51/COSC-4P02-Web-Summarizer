import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./css/PasswordStyle.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Password = () => {

  const [pass, setPass] = useState('');
  const [finalPass, confirmPass] = useState('');
  const [visible, setVisible] = useState(false);

  const [passError, setPassError] = useState('');
  const [finalError, setFinalError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = new URLSearchParams(location.search).get('email') || '';
  const handleSubmit = async () => {
    if (pass !== finalPass) {
      setFinalError('Passwords do not match!');
      return;
  }

    const response = await fetch('http://localhost:5001/reset', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,pass }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      if (result.message === 'Password changed successfully.'){
        //Navigate to dashboard if password change successful
        navigate('/Dashboard');
      }else if (result.message === 'New password requirements not met.') {
        setPassError(result.message);
        setPass('');
        confirmPass('');
      }

    }else {
      console.error('Failed to reset.');
    }
  }

  const handlePassChange = (e) => {
    setPassError('');
    setFinalError('');
    setPass(e.target.value);
  }

  const handleConfirmChange = (e) => {
    setPassError('');
    setFinalError('');
    confirmPass(e.target.value);
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
            onChange={handlePassChange}
            placeholder='Enter password here' 
          />
          {passError && <div class="pass-error">{passError}</div>}
        </div>

        <div className="password">
          <label className='pass-text'>Re-enter new password</label> 
          <div className='pass-container'>
            <input className='textfield'
                type={visible ? "text":"password"}
                required
                value={finalPass}
                onChange={handleConfirmChange} 
                placeholder='Enter password here' 
              />
              <div className='hide-pass' onClick = {() => setVisible(!visible)}>
                  {visible ? <FaRegEye/> : <FaRegEyeSlash/>}
              </div>
          </div>
              
          {finalError && <div class="pass-error">{finalError}</div>}
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