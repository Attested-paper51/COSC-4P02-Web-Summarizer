import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import "./css/LogInStyle.css";


//Need to make sure that if the user's pw is entered incorrectly it doesn't
//redirect
const LogIn = () => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [passError, setPassError] = useState('');
  const navigate = useNavigate();
  
  // const [CopyURL, setCopyURL] = useState('Copy URL')
  // const handleCopy = () => {
  //     navigator.clipboard.writeText(shortened)
  //     setCopyURL('Copied')
  //     setTimeout(() => {
  //         setCopyURL('Copy URL');
  //     }, 3000); // Reverts back to 'Submit' after 3 seconds
  // }

  const handleSubmit = async () => {
    try {

        // Make a POST request to the Flask backend
        const response = await fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, pass}),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);

          if (result.message === 'User not found or password is incorrect.') {
            setPassError(result.message);
            setPass('');
            setEmail('');
          }else if ( result.message === 'User found.'){
            navigate('/Dashboard');
          }
      } else {
          console.error('Failed to login.');
      }
    } catch (error) {
        console.error('Error:', error.message);
    }

  };

  const handleEmailChange = (e) => {
    setPassError('');
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassError('');
    setPass(e.target.value);
  }

  return (
    <div className="login-box">
      <div className="form">
        <div className="form-title">Log in</div>
        <button className="gmail-btn">
          <div className="gmail-overlap">
            <img className="gmail-icon" alt="Log in with Gmail" src="images/gmail.jpg" />
            <div className="login-social">Continue with Gmail</div>
          </div>
        </button>
        <button className="fb-btn">
          <div className="fb-overlap">
            <img className="fb-icon" alt="Log in with Facebook" src="images/fb.png" />
            <div className="login-social">Continue with Facebook</div>
          </div>
        </button>
        <div className="email">
          <label className='email-text'>Your email</label> 
          <input className='textfield'
            type="text" 
            required
            value={email}
            onChange={handleEmailChange}
            placeholder='Enter email here' 
          />
          
        </div>
      
        <div className="password">
          <label className='pass-text'>Your password</label> 
          <input className='textfield'
            type="text" 
            required
            value={pass}
            onChange={handlePassChange}
            placeholder='Enter password here' 
          />
          {passError && <div className="pass-error">{passError}</div>}
        </div>

        
          <button className="login-btn" onClick={handleSubmit}>
            <div className="login-overlap">
              <div className="login">Log in</div>
            </div>
          </button>

        
        
        <Link to="/Verify">
          <div className="forgot">
            Forgot your password?
          </div>
        </Link>
        
      </div>
      <div className="account">
          <div className="join">
            Upgrade to Pro for FREE and unlock Tailored Summaries, Analytics and API Integration!
          </div>
          <div className="account-img">
            <img className="logo" alt="Logo" src="images/img2.png" />
          </div>
      
          <Link to="/Signup">
            <button className="create-btn">
              <div className="create-overlap">
                <div className="create">Create an account</div>
              </div>
            </button>
          </Link>

        </div>
    </div>
  );
}

export default LogIn;