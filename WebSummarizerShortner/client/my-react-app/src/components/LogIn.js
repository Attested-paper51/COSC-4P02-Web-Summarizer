import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from '../context/AuthContext.js';
import "./css/LogInStyle.css";
//import { GoogleLogin } from 'react-google-login';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useTheme } from './ThemeContext.js'

const LogIn = () => {

  const { darkMode } = useTheme();
  
  const clientId = "1045986427496-kkjk2ev7bc80fujpp6eaqsavt5e46v0r.apps.googleusercontent.com";
  
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [passError, setPassError] = useState('');
  const navigate = useNavigate();
  
  const [visible, setVisible] = useState(false);

  const {login} = useAuth();

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
          if (result.message === 'User found.'){
            //Navigate to dashboard if the backend finds the user.
            login(email);//wip - maybe remove, authcontext maybe no good..
            //wip
            const name = result.name;
            const user_id = result.username;
            //localStorage.setItem('authenticated',true);
            localStorage.setItem('email',email);
            localStorage.setItem('name',name);
            localStorage.setItem('username', user_id)
            localStorage.setItem('loginMethod',"manual");
            console.log('Email being logged in: ',localStorage.getItem('email'));
            //console.log('Autentication state stored: ',localStorage.getItem('authenticated'));
            navigate('/Dashboard');
          }else if (result.message === 'User not found or password is incorrect.') {
            setPassError(result.message);
            //localStorage.setItem('authenticated',false);
            localStorage.setItem('email',null);
            console.log('Email being logged in: ',localStorage.getItem('email'));
            //console.log('Autentication state stored: ',localStorage.getItem('authenticated'));
            
            setPass('');
            setEmail('');
          }
      } else {
          console.error('Failed to login.');
      }
    } catch (error) {
        console.error('Error:', error.message);
    }

  };

  //Email and password change handling so that the errors disappear when
  //the user types in either field.
  const handleEmailChange = (e) => {
    setPassError('');
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassError('');
    setPass(e.target.value);
  };

  function handleCallbackResponse(response) {
    console.log("Encoded JWT Token: " + response.credential);
    var userObj = jwtDecode(response.credential);
    console.log(userObj);
    
    (async () => {
      var emailGoogle = userObj.email;
      //if the email is in the database already - pop up saying "account already there"
      var name = userObj.name;
      try {

        // Make a POST request to the Flask backend
        const response = await fetch('http://localhost:5001/logingoogle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailGoogle, name}),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          //add some handling here 
          if (result.message === '') {
            
          }
          name = result.name;
          localStorage.setItem('email',emailGoogle);
          localStorage.setItem('loginMethod',"google");
          localStorage.setItem('name',name);
          navigate('/Dashboard');
        }
  
      } catch (error) {
        console.error('Error:', error.message);
      }
    
    
  
    
    })();

  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("gmail-login"),
      { theme: "outline", size: "large", shape: "circle"}
    );
  }, []);
  

  return (
    
    <div className={`login-box ${darkMode ? 'login-dark' : 'login-light'}`}>
      <div className={`form ${darkMode ? 'form-dark' : 'form-light'}`}>
        <div className="form-title">Log in</div>
        <div id="gmail-login"></div>
        { /*<button className="gmail-btn">
            <div className="gmail-overlap">
              <img className="gmail-icon" alt="Log in with Gmail" src="images/gmail.jpg" />
              <div className="login-social">Continue with Gmail</div>
            </div>
          </button> */}
        <button className="fb-btn">
          <div className="fb-overlap">
            <img className="fb-icon" alt="Log in with Facebook" src="images/fb.png" />
            <div className="login-social">Continue with Facebook</div>
          </div>
        </button>
        <div className="email">
          <label className='email-text'>Your email</label> 
          <input className={`textfield ${darkMode ? 'input-url-dark' : 'input-url-light'}`}
            type="text" 
            required
            value={email}
            onChange={handleEmailChange}
            placeholder='Enter email here' 
          />
          {/* <div class="email-error">Incorrect Email!</div> */}
        </div>
      
        <div className="password">
          <label className='pass-text'>Your password</label> 
          <div className='pass-container'>
            <input className={`textfield ${darkMode ? 'input-url-dark' : 'input-url-light'}`}
              type={visible ? "text":"password"}
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder='Enter password here' 
            />
            <div className='hide-pass' onClick = {() => setVisible(!visible)}>
              {visible ? <FaRegEye/> : <FaRegEyeSlash/>}
            </div>
          </div>
          {passError && <div className={`pass-error ${darkMode ? 'error-dark' : 'error-light'}`}>{passError}</div>} 
        </div>
        
          <button className="login-btn" onClick={handleSubmit}>
            <div className={`login-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
              <div className={`login ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Log in</div>
            </div>
          </button>

        <Link to="/Verify">
          <div className="forgot">
            Forgot your password?
          </div>
        </Link>
        
      </div>
      <div className={`account ${darkMode ? 'account-dark' : 'account-light'}`}>
          <div className="join">
            Upgrade to Pro for FREE and unlock Tailored Summaries, Analytics and API Integration!
          </div>
          <div className="account-img">
            <img className="logo" alt="Logo" src="images/img2.png" />
          </div>
      
          <Link to="/Signup">
            <button className="create-btn">
              <div className={`create-overlap ${darkMode ? 'btn2-dark' : 'btn2-light'}`}>
                <div className={`create ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Create an account</div>
              </div>
            </button>
          </Link>

        </div>
    </div>
  );
}

export default LogIn;