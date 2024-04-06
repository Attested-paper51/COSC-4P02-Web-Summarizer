import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import "./css/VerifyUserStyle.css";
import { useTheme } from './ThemeContext.js'

const VerifyUser = () => {

  const { darkMode } = useTheme();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async() => {
    const response = await fetch('http://localhost:5001/verify', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      if (result.message === 'Email found.'){
        //Navigate to password reset if the backend finds the user.
        navigate(`/Reset?email=${encodeURIComponent(email)}`);
      }else if (result.message === 'Email not found!') {
        setEmailError(result.message);
        setEmail('');
      }

    }else {
      console.error('Failed to verify.');
    }


  };

  //Email change handling so that the errors disappear when
  //the user types in the field.
  const handleEmailChange = (e) => {
    setEmailError('');
    setEmail(e.target.value);
  };

  return (
    <div className={`verify-box ${darkMode ? 'login-dark' : 'login-light'}`}>
      <div className={`form ${darkMode ? 'form-dark' : 'form-light'}`}>
        <div className='form-title'>Verifying User</div>
        <div className="form-subtitle">Forgot your password? Don't worry, it happens! Enter your email below to reset your password</div>
        
        <div className="email">
          <label className='email-text'>Your email</label> 
          <input className={`textfield ${darkMode ? 'input-url-dark' : 'input-url-light'}`}
            type="text" 
            required
            value={email}
            onChange={handleEmailChange}
            placeholder='Enter email here' 
          />
          {emailError && <div class={`email-error ${darkMode ? 'error-dark' : 'error-light'}`}>{emailError}</div>}

        </div>  

        <button className="reset-btn" onClick={handleSubmit}>
        <div className={`reset-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
            <div className={`reset ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Reset your password</div>
        </div>
        </button>
        
      </div>
    </div>
  );
}

export default VerifyUser;