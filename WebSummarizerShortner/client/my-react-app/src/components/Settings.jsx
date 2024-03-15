import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import "./css/DashboardStyle.css";
import PopUp from './PopUp.js';

const Settings = () => {

  let firstname = 'Jane'
  let lastname = 'Doe'
  let useremail = 'janedoe@gmail.com'
  let userpass = 'janedoe123'

  const[namePopup, setNamePopup] = useState(false);
  const[emailPopup, setEmailPopup] = useState(false);

  return (

    <div className="settings-wrapper">
        
        <h1>Settings</h1>

        <div className='profile'>
          <div className='profile-div'>
            <label className='label'>Name</label> 
            <div className='text'>{firstname} {lastname}</div>
            <button className='update' onClick={() => setNamePopup(true)}>Update Name</button>
           
            <PopUp trigger={namePopup} setTrigger={setNamePopup} title='Name'>
              <label className='pop-label'>First Name</label>
              <input 
                type="text"
                className='textfield'
                placeholder={firstname}
              />
              <label className='pop-label'>Last Name</label>
              <input 
                type="text"
                className='textfield'
                placeholder={lastname}
              />
            </PopUp>
          </div>

          <div className='profile-div'>
            <label className='label'>Email</label> 
            <div className='text'>{useremail}</div>
            <button className='update' onClick={() => setEmailPopup(true)}>Update Email</button>
            <PopUp trigger={emailPopup} setTrigger={setEmailPopup} title='Email'>
              <label className='pop-label'>New Email</label>
              <input 
                type="email"
                className='textfield'
                placeholder={useremail}
              />
              <label className='pop-label'>Password</label>
              <input 
                type="password"
                className='textfield'
                placeholder='Enter password here'
              />
            </PopUp>
          </div>

          <div className='profile-div'>
            <label className='label' htmlFor="password">Password</label> 
            <div className='text'>{'\u25CF'.repeat(userpass.length)}</div>
            <Link to="/Reset"><button className='update'>Reset Password</button></Link>
          </div>
        </div>

        <div className='plan'>
          <div>Subscription Plan</div>
        </div>

        <div className='app'>
          <div>Language</div>
          <div>Mode (Dark/Light) </div>
          <div>Notifications</div>
        </div>
        
        <div className='extra'>
          <div>Rate & Review</div>
          <div>Help</div>
        </div>
      
        <div className='delete'>Delete Account</div>
    </div>

  );
}

export default Settings;