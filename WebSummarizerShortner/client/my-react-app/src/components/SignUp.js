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
            //console.error('Passwords do not match');
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
          }
      } else {
          const result = await response.json();
          console.error('Failed to register', result.message);
      }
    } catch (error) {
        console.error('Error:', error.message);
    }

  };

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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPass(e.target.value)}
            placeholder='Enter password here' 
          />
        </div>

        <div className="password">
          <label className='pass-text'>Re-enter password</label> 
          <input className='textfield'
            type="text" 
            required
            value={finalPass}
            onChange={(e) => confirmPass(e.target.value)}
            placeholder='Enter password here' 
          />
          <div class="pass-error">Passwords do not match!</div>
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