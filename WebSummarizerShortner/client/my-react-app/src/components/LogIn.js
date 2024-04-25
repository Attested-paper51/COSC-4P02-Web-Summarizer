import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import "./css/LogInStyle.css";
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext.js';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import DialogBox from '../components/DialogBox.js';

/**
 * LogIn contains the functionality for the login page, allowing users to log in using their manual email and password, or Google/FB authentication
 * @returns Login page
 */
const LogIn = () => {

  const { darkMode } = useTheme();
  
  const clientId = "1045986427496-kkjk2ev7bc80fujpp6eaqsavt5e46v0r.apps.googleusercontent.com";
  
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [passError, setPassError] = useState('');
  const navigate = useNavigate();
  
  const [visible, setVisible] = useState(false);

 
  //Error config
  const [dialogConfig, setDialogConfig] = useState({
    open: false,
    onClose: null,
    title: "",
    content: "",
    showCancelButton: false,
    showConfirmButton: false,
    confirmText: "",
    onConfirm: null,
});

const openDialog = (config) => {
    setDialogConfig({ ...config, open: true })
}

const handleClose = () => {
  setDialogConfig(prevState => ({ ...prevState, open: false }))
}

const defaultConfirm = () => {
  handleClose()
}
  //Logic for when a user presses 'Login'
  const handleSubmit = async () => {
    try {

        // Make a POST request to the Flask backend
        const response = await fetch('http://localhost:5001/login', {
        //const response = await fetch('https://4p02shortify.com:5001/login', { //For server use only
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

            const name = result.name;
            //const user_id = result.username
            //localStorage.setItem('authenticated',true);
            localStorage.setItem('email',email);
            localStorage.setItem('name',name);
            //localStorage.setItem('user_id', user_id)
            localStorage.setItem('loginMethod',"manual");
            navigate('/Dashboard');
          }else if (result.message === 'User not found or password is incorrect.') {
            setPassError(result.message);
            localStorage.setItem('email',null);
            setPass('');
            setEmail('');
          }else if (result.message === 'Email is associated with Google/FB authentication.') {
            setPassError(result.message);
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

  
  //handleCallbackResponse to handle Google authentication
  function handleCallbackResponse(response) {
    var userObj = jwtDecode(response.credential);
    (async () => {
      var emailGoogle = userObj.email;
      
      var name = userObj.name;
      try {

        // Make a POST request to the Flask backend
        const response = await fetch('http://localhost:5001/logingoogle', {
        //const response = await fetch('https://4p02shortify.com:5001/logingoogle', { //For server use only
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailGoogle, name}),
        });
  
        if (response.ok) {
          const result = await response.json();
          //console.log(result);
          //add some handling here 
          if (result.message === 'Email is associated with another log in method, please use that method.') {
            openDialog({
              title: "Error",
              content: result.message,
              showCancelButton: false,
              showConfirmButton: true,
              confirmText: "Continue",
              onClose: handleClose,
              onConfirm: defaultConfirm,
          });
            return;
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
  //Display Google login button on page load
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallbackResponse
    });
    //<GoogleLoginButton/>

    google.accounts.id.renderButton(
      document.getElementById("gmail-login-button"),
      { }
    );
  });

  //Function to handle Facebook logging in
  function handleFBLogin(response) {

    (async () => {
      var emailFB = response.data.email;
      //if the email is in the database already - pop up saying "account already there"
      var name = response.data.name;
      try {

        // Make a POST request to the Flask backend
        const response = await fetch('http://localhost:5001/loginfacebook', {
        //const response = await fetch('https://4p02shortify.com:5001/loginfacebook', { //For server use only
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailFB, name}),
        });
  
        if (response.ok) {
          const result = await response.json();
          if (result.message === 'Email is associated with another log in method, please use that method.') {
            
            openDialog({
              title: "Error",
              content: result.message,
              showCancelButton: false,
              showConfirmButton: true,
              confirmText: "Continue",
              onClose: handleClose,
              onConfirm: defaultConfirm,
          });
            return;
          }
          name = result.name;
          localStorage.setItem('email',emailFB);
          localStorage.setItem('loginMethod',"facebook");
          localStorage.setItem('name',name);
          navigate('/Dashboard');
        }
  
      } catch (error) {
        console.error('Error:', error.message);
      }
    
    })();

  }
  

  return (
    
    <div className={`login-box ${darkMode ? 'login-dark' : 'login-light'}`}>
      <div className={`form ${darkMode ? 'form-dark' : 'form-light'}`}>
        <div className="form-title">Log in</div>
        
        <div id="gmail-login-button">
          <GoogleLoginButton />
        </div>
        { /*<button className="gmail-btn">
            <div className="gmail-overlap">
              <img className="gmail-icon" alt="Log in with Gmail" src="images/gmail.jpg" />
              <div className="login-social">Continue with Gmail</div>
            </div>
          </button> */}
       {/*  <button className="fb-btn">
          <div className="fb-overlap">
            <img className="fb-icon" alt="Log in with Facebook" src="images/fb.png" />
            <div className="login-social">Continue with Facebook</div>
          </div>
        </button> */}
        
        <LoginSocialFacebook
          appId="671298455122068"
          className="facebook"
          onResolve={(response) => {
            console.log(response);
            handleFBLogin(response);
          }}
          onReject={(error) =>
          {
            console.log(error);
          }}
        >
          <FacebookLoginButton/>
        </LoginSocialFacebook>

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
            <div className='hide-pass' onClick = {() => setVisible(!visible)} data-testid='hide-pass'>
              {visible ? <FaRegEye/> : <FaRegEyeSlash/>}
            </div>
          </div>
          {passError && <div className={`pass-error ${darkMode ? 'error-dark' : 'error-light'}`}>{passError}</div>} 
        </div>
        
          <button className="login-btn" onClick={handleSubmit}>
            <div className={`login-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
              <div className={`login ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Log In</div>
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
          <DialogBox 
                open={dialogConfig.open} 
                onClose={dialogConfig.onClose}
                title={dialogConfig.title}
                content={dialogConfig.content}
                showCancelButton={dialogConfig.showCancelButton}
                showConfirmButton={dialogConfig.showConfirmButton}
                confirmText={dialogConfig.confirmText}
                onConfirm={dialogConfig.onConfirm}
                />

        </div>

        
    </div>

    
  );
}

export default LogIn;