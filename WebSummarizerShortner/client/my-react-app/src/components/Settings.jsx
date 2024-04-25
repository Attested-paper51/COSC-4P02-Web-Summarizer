import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import "./css/SettingsStyle.css";
import "./css/PopUpStyle.css";
import { FaCheck } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import PopUp from './PopUp.js';
import { useTheme } from '../context/ThemeContext.js'


/**
 * Settings defines all functionality for a user's settings dashboard where they can manage their account
 * @returns Settings page
 */
const Settings = () => {

  const { darkMode } = useTheme();

  let username = localStorage.getItem('name');
  let email = localStorage.getItem('email');
  let userpass = 'janedoe123';
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [newname, setNewName] = useState('');

  const[namePopup, setNamePopup] = useState(false);
  const[emailPopup, setEmailPopup] = useState(false);
  const[deletePopup, setDeletePopup] = useState(false);
  const[passPopup, setPassPopup] = useState(false);
  const navigate = useNavigate();


  // handleDelete includes the logic for if the user decides to delete their account
  const handleDelete = async () => {
    try {
      //const response = await fetch('https://4p02shortify.com:5001/delete', { //Server use only
      const response = await fetch('http://localhost:5001/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email}),
        });
      if (response.ok) {
        localStorage.removeItem('loginMethod');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        navigate('/SignUp');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  // Handling of the change email functionality, which only applies to manually registered users
  const handleEmailChange = async () => {

    // Fetch Flask backend functionality
    try {
      //const response = await fetch('https://4p02shortify.com:5001/changeemail', { //Server use only
      const response = await fetch('http://localhost:5001/changeemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, newEmail, password}),
        });
      if (response.ok) {
        const result = await response.json();
    
        if (result.message === "Email changed.") {
          localStorage.setItem('email',newEmail)
          setEmailPopup(false);
        }else if (result.message === "Password invalid!"){
          //handle error
          setPassError(result.message);
          setPassword('');
        }
        
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //Handling of the change name functionality
  const handleNameChange = async () => {
  // POST fetch to Flask backend
    try {
      //const response = await fetch('https://4p02shortify.com:5001/changename', { //Server use only
      const response = await fetch('http://localhost:5001/changename', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, newname}),
        });
      if (response.ok) {
        const result = await response.json();

        if (result.message === "Name changed.") {
          localStorage.setItem('name',newname)
          setNamePopup(false);
          window.location.reload();// Refresh the page so name populates everywhere
          //this doesnt load the settings.jsx by default, maybe change?
        }//no else necessary I reckon
        
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  //handle password field change
  const handlePassChange = (e) => {
    setPassError('');
    setPassword(e.target.value);
  }

  return (

    <div className="settings-wrapper">
        
        <h1>Settings</h1>

        <div className='profile'>
          <div className='profile-div'>
            <div className='label'>Name</div> 
            <div className='text'>{username}</div>
            <button className='update' onClick={() => setNamePopup(true)}>
              <div className={`update-div ${darkMode ? 'update-btn-dark' : 'update-btn-light'}`}>
                Update Name
              </div> 
            </button>
           
            <PopUp className='change-name-popup' trigger={namePopup} setTrigger={setNamePopup} title='Update Name'>
              <label className='pop-label'>Enter new name</label>
              <input 
                type="text"
                className={`textfield ${darkMode ? 'input-url-dark' : 'input-url-light'}`}
                placeholder={username}
                value = {newname}
                onChange = {(e) => setNewName(e.target.value)}
              />
              {/* Use button below to change user's name in the database */}
              {/* <button className='confirm-btn' onClick={() => handleNameChange(email, newname)}>Confirm name change</button> */}
              <button className='acc-delete-btn' onClick={() => handleNameChange(email, newname)}>
                <div className={`acc-delete-overlap popup-btn ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                    <div className={`acc-delete ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Confirm name change</div>
                </div>
              </button>
            </PopUp>
          </div>

          <div className='profile-div'>
            <div className='label'>Email</div> 
            <div className='text'>{email}</div>
            <button className='update' onClick={() => setEmailPopup(true)}>
              <div className={`update-div ${darkMode ? 'update-btn-dark' : 'update-btn-light'}`}>
                Update Email
              </div> 
            </button>
            {(localStorage.getItem('loginMethod') !== 'google' && localStorage.getItem('loginMethod') !== 'facebook')?  (
              <PopUp trigger={emailPopup} setTrigger={setEmailPopup} title='Update Email'>
              <label className='pop-label'>Enter new email</label>
              <input 
                type="email"
                className={`textfield ${darkMode ? 'input-url-dark' : 'input-url-light'}`}
                placeholder={email}
                value ={newEmail}
                onChange = {(e) => setNewEmail(e.target.value)}
              />
              
              <label className='pop-label'>Enter password</label>
              <input 
                type="password"
                className={`textfield ${darkMode ? 'input-url-dark' : 'input-url-light'}`}
                placeholder={'\u25CF'.repeat(userpass.length)}
                value={password}
                onChange={handlePassChange}
              />
              {passError && <div className={`pass-error ${darkMode ? 'error-dark' : 'error-light'}`}>{passError}</div>} 
              {/* Use button below to change user's email in the database  */}
              {/* <button className='confirm-btn' onClick={() => handleEmailChange(email, newEmail, password)}>Confirm email change</button> */}
              <button className='acc-delete-btn' onClick={() => handleEmailChange(email, newEmail, password)}>
                <div className={`acc-delete-overlap popup-btn ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                    <div className={`acc-delete ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Confirm email change</div>
                </div>
              </button>
            </PopUp>
            ) : (
              <PopUp trigger={emailPopup} setTrigger={setEmailPopup} title='Error'>
                <div className='google-fb-error'>Cannot change email of Google/Facebook account</div>
              </PopUp>
            )}
            
          </div>

          <div className='profile-div'>
            <div className='label' htmlFor="password">Password</div> 
            <div className='text'>{'\u25CF'.repeat(userpass.length)}</div>
          
            {(localStorage.getItem('loginMethod') !== 'google' && localStorage.getItem('loginMethod') !== 'facebook') ? (
              <Link to="/Reset"><button className='update'>
                <div className={`update-div ${darkMode ? 'update-btn-dark' : 'update-btn-light'}`}>
                  Reset Password
                </div> 
              </button></Link>
            ): (
            
            <button className='update' onClick={() => setPassPopup(true)}>
              <div className={`${darkMode ? 'update-btn-dark' : 'update-btn-light'}`}>
                Reset Password
              </div> 
            </button>
              
            )}
            <PopUp trigger={passPopup} setTrigger={setPassPopup} title='Error'>
              <div className='google-fb-error'>Cannot change password of Google/Facebook account</div>
            </PopUp>
            
          </div>
        </div>

        <div className='plan'>
          <div className='label'>Subscription Plan</div>
          <div className={`plan-text ${darkMode ? 'plan-dark' : 'plan-light'}`}><FaCrown className='premium-icon' /><span>Premium</span></div>
          <div className='plan-list'>
            Features include: 
            <ul>
              <li><FaCheck /> <span>Custom Summarizer levels:</span> Tailor levels like length, detail, tone and more</li>
              <li><FaCheck /> <span>User Analytics: </span> Gain insights into your usage patterns</li>
              <li><FaCheck /> <span>History: </span> Review and edit past summaries and shortened links</li>
              <li><FaCheck /> <span>Templates: </span> Save personalized levels for easy access next time</li>
              <li><FaCheck /> <span>API Access: </span> Integrate our services with other applications</li>
            </ul>
          </div>
        </div>

        {/* <div className='app'>
          <div className='label'>Language</div>
          <div className='label'>Mode</div>
          <button className='mode-btn'>Change to Dark Mode</button>
          <div className='label'>Notifications</div>
          <div style={{paddingTop: '0.5em'}}>Toggle to turn on notifications</div>
        </div> */}
        
        {/* <div className='extra'>
          <div className='label'>Rate & Review</div>
          <Link to="/Feedback"><button className='review-btn'>Click here to leave us a review!</button></Link>
          <div>Help</div>
        </div> */}
      
        <div className='delete'>
          <button className='acc-delete-btn' onClick={() => setDeletePopup(true)}>
            <div className={`acc-delete-overlap ${darkMode ? 'acc-delete-dark' : 'acc-delete-light'}`}>
                <div className={`acc-delete ${darkMode ? 'add-text' : 'adl-text'}`}>Delete Account</div>
            </div>
          </button>
          <PopUp trigger={deletePopup} setTrigger={setDeletePopup} title='Delete Account'>
            <label className='pop-label'>Are you sure you want to delete your account permanently?</label>
            {/* Use the button below to permanently remove user from database */}
            <button className='acc-delete-btn' onClick={handleDelete}>
              <div className={`acc-delete-overlap popup-btn ${darkMode ? 'acc-delete-dark' : 'acc-delete-light'}`}>
                  <div className={`acc-delete ${darkMode ? 'add-text' : 'adl-text'}`}>Delete Account Permanently</div>
              </div>
            </button>
          </PopUp>
        </div>
    </div>

  );
}

export default Settings;