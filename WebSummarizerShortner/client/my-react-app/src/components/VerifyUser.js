import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import "./css/VerifyUserStyle.css";
import { useTheme } from '../context/ThemeContext.js'

/**
 * VerifyUser page to verify whether a user's inputted email exists in the database before redirecting to the Password Reset page
 * @returns /Verify page
 */
const VerifyUser = () => {

  const { darkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  //Verify a user's inputted email is in the database
  const handleSubmit = async() => {
    //Fetch call to the flask server
    //const response = await fetch('http://4p02shortify.com:5001/verify', { //Server use only
    const response = await fetch('http://localhost:5001/verify', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const result = await response.json();
      //If the email is found 
      if (result.message === 'Email found.'){
        //Navigate to password reset if the backend finds the user.
        navigate(`/Reset?email=${encodeURIComponent(email)}`);
      }else if (result.message === 'Email not found!') {
        setEmailError(result.message);
        setEmail('');
        //If the email entered is a Google/FB account email
      }else if (result.message === 'Cannot reset the password of a Google/FB authenticated account.') {
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
    <div className={`verify-box ${darkMode ? 'login-dark' : 'login-light'}`} data-testid='verify-box-container'>
      <div className={`form ${darkMode ? 'form-dark' : 'form-light'}`} >
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