import React, { useState } from 'react';
import "./css/SignUpStyle.css";
//import { Link } from 'react-router-dom';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [finalPass, confirmPass] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');


  const handleSubmit = async () => {
    try {
        if (pass !== finalPass) {
            //this will be a popup
            console.log('Passwords do not match!');
            setPassError('Passwords do not match!');
            return;
        }

        // Make a POST request to the Flask backend
        const response = await fetch('http://localhost:5001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, pass}),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);

          if (result.message === 'Email is already registered.') {
            setEmailError('Email is already registered.');
            setEmail('');
          } else if (result.message === 'Email does not exist or is not deliverable.') {
            setEmailError('Email does not exist or is not deliverable.');
            setEmail('');
          } else if (result.message === 'Password invalid.'){
            setPassError('Password invalid.');
            setPass('');
            confirmPass('');
          }
      } else {
          const result = await response.json();
          console.error('Failed to register', result.message);
      }
    } catch (error) {
        console.error('Error:', error.message);
    }

  };

  const handleEmailChange = (e) => {
    setEmailError('');
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassError('');
    setPass(e.target.value);
  }

  const handleConfirmChange = (e) => {
    setPassError('');
    confirmPass(e.target.value);
  }

  return (
    <div className="box">
      <div className="form">
        <div className='form-title'>Create an account</div>
        <div className="form-subtitle">Join us to access to Tailored Summaries, Analytics, API Integration and more!</div>

        <div className="email">
          <label className='email-text'>Enter your email</label> 
          <input className='textfield'
            type="text" 
            required
            value={email}
            onChange={handleEmailChange}
            placeholder='Enter email here' 
          />
          {emailError && <div className="email-error">{emailError}</div>}
        </div>
      
        <div className="password">
          <label className='pass-text'>Enter your password</label> 
          <input className='textfield'
            type="text" 
            required
            value={pass}
            onChange={handlePassChange}
            placeholder='Enter password here' 
          />
        </div>

        <div className="password">
          <label className='pass-text'>Re-enter password</label> 
          <input className='textfield'
            type="text" 
            required
            value={finalPass}
            onChange={handleConfirmChange}
            placeholder='Enter password here' 
          />
          {passError && <div className="pass-error">{passError}</div>}
        </div>

        <button className="signup-btn" onClick={handleSubmit}>
          <div className="signup-overlap">
            <div className="signup">Create an account</div>
          </div>
        </button>
        
      </div>
    </div>
  );
}

export default SignUp;