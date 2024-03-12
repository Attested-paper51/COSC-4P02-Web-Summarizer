import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import "./css/VerifyUserStyle.css";

const VerifyUser = () => {

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
    <div className="verify-box">
      <div className="form">
        <div className='form-title'>Verifying User</div>
        <div className="form-subtitle">Forgot your password? Don't worry, it happens! Enter your email below to reset your password</div>
        <div className="username">
          <label className='user-text'>Your email</label> 
          <input className='textfield'
            type="text" 
            required
            value={email}
            onChange={handleEmailChange}
            placeholder='Enter email here' 
          />
          {emailError && <div class="email-error">{emailError}</div>}
        </div>  

            <button className="reset-btn" onClick={handleSubmit}>
            <div className="reset-overlap">
                <div className="reset">Reset your password</div>
            </div>
            </button>
        
    
      </div>
    </div>
  );
}

export default VerifyUser;