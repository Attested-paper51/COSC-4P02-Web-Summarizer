import React, { useContext, useState, useEffect } from 'react';
import { AuthContext  } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import "./css/DashboardStyle.css";
import { MdHistory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TbTemplate } from "react-icons/tb";
import { TbCloudNetwork } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

import History from './History.jsx';
import Templates from './Templates.jsx';
import Settings from './Settings.jsx';
import APIAccess from './APIAccess.jsx';

const Dashboard = () => {


  const navigate = useNavigate();
 // // const emailCheck = localStorage.getItem('email');

  // // useEffect (() => {
  // //   if (!emailCheck) {
  // //     navigate('/login');
  // //   }
  // // }, [emailCheck,navigate]);
  

  let username = localStorage.getItem('user_id');

  const [activeComponent, setActiveComponent] = useState('History'); // Default to Settings component

  const handleOptionClick = (componentName) => {
    setActiveComponent(componentName);
  };

  //Testing, not fully working, attempting to see if the logged in user will
  //persist after refreshing the page.
  const { userEmail } = useContext(AuthContext);
  const [authenticated, setAuthenticated] = useState(false);
  const storedEmail = localStorage.getItem('email');
  

  useEffect (() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    //const userEmail = localStorage.getItem('email');
    setAuthenticated(!!isAuthenticated);
    
    console.log('Authentication state is: ',isAuthenticated);
    //console.log('Authenticated email: ',userEmail);

  }, []);

  const handleLogout = () => {
    //uhh 
    if (localStorage.getItem('loginMethod') === "google") {
      localStorage.removeItem('email');
      localStorage.removeItem('authenticated');
      localStorage.removeItem('name');
      localStorage.removeItem('loginMethod');
    }
    localStorage.removeItem('email');
    localStorage.removeItem('authenticated');
    localStorage.removeItem('name');
    localStorage.removeItem('loginMethod');
    navigate('/');
  };

  //console.log('Authentication state is: ',isAuthenticated);
  console.log('AuthContext email: ',userEmail);
  console.log('Local Storage email: ',storedEmail);
  console.log('Username issssss: ', username)

  return (

    <div className="dashboard">
      <div className="side-panel">
          <div className='user-profile'>
            <IoPersonSharp size={160}/>
          </div>
          <div className='user-name'>{username}</div>
          <div className='dashboard-options'>
              <button className={`dash-option ${activeComponent === 'History' ? 'active' : ''}`} onClick={() => handleOptionClick('History')}><MdHistory size={25} />History</button>
              <button className={`dash-option ${activeComponent === 'Templates' ? 'active' : ''}`} onClick={() => handleOptionClick('Templates')}><TbTemplate size={25}/>Templates</button>
              <button className={`dash-option ${activeComponent === 'APIAccess' ? 'active' : ''}`} onClick={() => handleOptionClick('APIAccess')}><TbCloudNetwork size={25} />API Access</button>
              <button className={`dash-option ${activeComponent === 'Settings' ? 'active' : ''}`} onClick={() => handleOptionClick('Settings')}><IoSettingsOutline size={25}/>Settings</button>
              <button className='dash-option logout-btn' onClick={handleLogout}><TbLogout size={25}/>Logout</button>
              {/* {storedEmail && <div>{storedEmail}</div>}  */}
              {/* Change this eventually */}
          </div>
      </div>
      <div className="main-panel">
        {activeComponent === 'History' && <History />}
        {activeComponent === 'Templates' && <Templates />}
        {activeComponent === 'APIAccess' && <APIAccess />}
        {activeComponent === 'Settings' && <Settings />}
      </div>
    </div>

  );
}

export default Dashboard;