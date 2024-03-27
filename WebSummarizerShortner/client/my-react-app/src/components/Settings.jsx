import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import "./css/DashboardStyle.css";
import { FaCheck } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import PopUp from './PopUp.js';
import Feedback from './Feedback.js'

const Settings = () => {

  let username = localStorage.getItem('name');
  let email = localStorage.getItem('email');
  let userpass = 'janedoe123'
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [newname, setNewName] = useState('');

  const[namePopup, setNamePopup] = useState(false);
  const[emailPopup, setEmailPopup] = useState(false);
  const[deletePopup, setDeletePopup] = useState(false);
  const[passPopup, setPassPopup] = useState(false);
  const navigate = useNavigate();

  console.log(localStorage.getItem('loginMethod'));

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:5001/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email}),
        });
      if (response.ok) {
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        navigate('/SignUp');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  const handleEmailChange = async () => {

    try {
      const response = await fetch('http://localhost:5001/changeemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, newEmail, password}),
        });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
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

  const handleNameChange = async () => {
   
    try {
      const response = await fetch('http://localhost:5001/changeename', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, newname}),
        });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
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
            <button className='update' onClick={() => setNamePopup(true)}>Update Name</button>
           
            <PopUp trigger={namePopup} setTrigger={setNamePopup} title='Update Name'>
              <label className='pop-label'>Enter new name</label>
              <input 
                type="text"
                className='textfield'
                placeholder={username}
                value = {newname}
                onChange = {(e) => setNewName(e.target.value)}

              />
              {/* Use button below to change user's name in the database */}
              <button className='confirm-btn' onClick={() => handleNameChange(email, newname)}>Confirm name change</button>
            </PopUp>
          </div>

          <div className='profile-div'>
            <div className='label'>Email</div> 
            <div className='text'>{email}</div>
            <button className='update' onClick={() => setEmailPopup(true)}>Update Email</button>
            {localStorage.getItem('loginMethod') !== 'google' ?  (
              <PopUp trigger={emailPopup} setTrigger={setEmailPopup} title='Update Email'>
              <label className='pop-label'>Enter new email</label>
              <input 
                type="email"
                className='textfield'
                placeholder={email}
                value ={newEmail}
                onChange = {(e) => setNewEmail(e.target.value)}
              />
              
              <label className='pop-label'>Enter password</label>
              <input 
                type="password"
                className='textfield'
                placeholder={'\u25CF'.repeat(userpass.length)}
                value={password}
                onChange={handlePassChange}
              />
              {passError && <div className="pass-error">{passError}</div>}
              {/* Use button below to change user's email in the database  */}
              <button className='confirm-btn' onClick={() => handleEmailChange(email, newEmail, password)}>Confirm email change</button>
            </PopUp>
            ) : (
              <PopUp trigger={emailPopup} setTrigger={setEmailPopup} title='Error'>
              <div>Cannot change email of Google/Facebook account</div>
            </PopUp>
            )}
            
          </div>

          <div className='profile-div'>
            <div className='label' htmlFor="password">Password</div> 
            <div className='text'>{'\u25CF'.repeat(userpass.length)}</div>
          
            {localStorage.getItem('loginMethod') !== 'google' ? (
              <Link to="/Reset"><button className='update'>Reset Password</button></Link>
            ): (
              <button className='update' onClick={() => setPassPopup(true)}>Reset Password</button>
              
            )}
            <PopUp trigger={passPopup} setTrigger={setPassPopup} title='Error'>
              <div>Cannot change password of Google/Facebook account</div>
            </PopUp>
            
          </div>
        </div>

        <div className='plan'>
          <div className='label'>Subscription Plan</div>
          <div className='plan-text'><FaCrown size={18} /><span>Premium</span></div>
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
          <button className='acc-delete-btn' onClick={() => setDeletePopup(true)}>Delete account</button>
          <PopUp trigger={deletePopup} setTrigger={setDeletePopup} title='Delete Account'>
            <label className='pop-label'>Are you sure you want to delete your account permanently?</label>
            {/* Use the button below to permanently remove user from database */}
            <button className='acc-delete-btn' onClick={handleDelete}>Delete account permanently</button>
          </PopUp>
        </div>
    </div>

  );
}

export default Settings;