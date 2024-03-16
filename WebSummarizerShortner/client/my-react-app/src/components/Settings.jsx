import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import "./css/DashboardStyle.css";
import { FaCheck } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import PopUp from './PopUp.js';
import Feedback from './Feedback.js'

const Settings = () => {

  let username = 'Jane Doe'
  let useremail = 'janedoe@gmail.com'
  let userpass = 'janedoe123'

  const[namePopup, setNamePopup] = useState(false);
  const[emailPopup, setEmailPopup] = useState(false);

  return (

    <div className="settings-wrapper">
        
        <h1>Settings</h1>

        <div className='profile'>
          <div className='profile-div'>
            <div className='label'>Name</div> 
            <div className='text'>{username}</div>
            <button className='update' onClick={() => setNamePopup(true)}>Update Name</button>
           
            <PopUp trigger={namePopup} setTrigger={setNamePopup} title='Name'>
              <label className='pop-label'>Enter new name</label>
              <input 
                type="text"
                className='textfield'
                placeholder={username}
              />
            </PopUp>
          </div>

          <div className='profile-div'>
            <div className='label'>Email</div> 
            <div className='text'>{useremail}</div>
            <button className='update' onClick={() => setEmailPopup(true)}>Update Email</button>
            <PopUp trigger={emailPopup} setTrigger={setEmailPopup} title='Email'>
              <label className='pop-label'>Enter new email</label>
              <input 
                type="email"
                className='textfield'
                placeholder={useremail}
              />
              <label className='pop-label'>Enter password</label>
              <input 
                type="password"
                className='textfield'
                placeholder={'\u25CF'.repeat(userpass.length)}
              />
            </PopUp>
          </div>

          <div className='profile-div'>
            <div className='label' htmlFor="password">Password</div> 
            <div className='text'>{'\u25CF'.repeat(userpass.length)}</div>
            <Link to="/Reset"><button className='update'>Reset Password</button></Link>
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

        <div className='app'>
          {/* <div className='label'>Language</div> */}
          <div className='label'>Mode</div>
          <button className='mode-btn'>Change to Dark Mode</button>
          {/* <div className='label'>Notifications</div>
          <div style={{paddingTop: '0.5em'}}>Toggle to turn on notifications</div> */}
        </div>
        
        {/* <div className='extra'>
          <div className='label'>Rate & Review</div>
          <Link to="/Feedback"><button className='review-btn'>Click here to leave us a review!</button></Link>
          <div>Help</div>
        </div> */}
      
        <div className='delete'>
          <div className='label'>Delete Account</div>
          <button className='acc-delete-btn'>Delete account permanently</button>
        </div>
    </div>

  );
}

export default Settings;