import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./css/DashboardStyle.css";
import { MdHistory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TbTemplate } from "react-icons/tb";
import { TbCloudNetwork } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import Tooltip from '@mui/material/Tooltip';

import History from './History.jsx';
import Templates from './Templates.jsx';
import Settings from './Settings.jsx';
import APIAccess from './APIAccess.jsx';

import { useTheme } from './ThemeContext.js'

const Dashboard = () => {

  const { darkMode } = useTheme();

  const navigate = useNavigate();
  // // const emailCheck = localStorage.getItem('email');

  // // useEffect (() => {
  // //   if (!emailCheck) {
  // //     navigate('/login');
  // //   }
  // // }, [emailCheck,navigate]);


  let username = localStorage.getItem('name');

  const [activeComponent, setActiveComponent] = useState('History'); // Default to Settings component

  const handleOptionClick = (componentName) => {
    setActiveComponent(componentName);
  };

  //Testing, not fully working, attempting to see if the logged in user will
  //persist after refreshing the page.
  const storedEmail = localStorage.getItem('email');



  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('loginMethod');
    navigate('/');
  };

  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 670) {
        setOpen(false); // Automatically set open state to false for small screen sizes
      } else {
        setOpen(true);
      }
    };

    // Call handleResize initially and add event listener for window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  return (

    <div className="dashboard">

      {open &&
        <div className='side-panel'>
          <div className='side-panel-title-wrapper'>

            <Tooltip title={<span className='tooltip-title'>Collapse Sidebar</span>} arrow>
              <button className='sidebar-icon-container' onClick={handleToggleSidebar}>
                <CiCircleChevLeft className='sidebar-icon' />
              </button>
            </Tooltip>
          </div>
          <div className='user-profile-container'>
            <IoPersonSharp className='user-profile' />
          </div>
          <div className='user-name'>{username}</div>
          <div className='dashboard-options'>
            <button className={`dash-option ${activeComponent === 'History' ? 'active' : ''}`} onClick={() => handleOptionClick('History')}><MdHistory className='dash-option-icon' />History</button>
            <button className={`dash-option ${activeComponent === 'Templates' ? 'active' : ''}`} onClick={() => handleOptionClick('Templates')}><TbTemplate className='dash-option-icon' />Templates</button>
            <button className={`dash-option ${activeComponent === 'APIAccess' ? 'active' : ''}`} onClick={() => handleOptionClick('APIAccess')}><TbCloudNetwork className='dash-option-icon' />API Access</button>
            <button className={`dash-option ${activeComponent === 'Settings' ? 'active' : ''}`} onClick={() => handleOptionClick('Settings')}><IoSettingsOutline className='dash-option-icon' />Settings</button>
            <button className='dash-option logout-btn' onClick={handleLogout}><TbLogout className='dash-option-icon' />Logout</button>
            {/* {storedEmail && <div>{storedEmail}</div>}  */}
            {/* Change this eventually */}
          </div>
        </div>}


      {!open &&
        <div className='small-side-panel-container'>
          <div className='small-side-panel'>
            <Tooltip title={<span className='tooltip-title'>Open Sidebar</span>} arrow>
              <button className='sidebar-icon-container small-sidebar-icon' onClick={handleToggleSidebar}>
                <CiCircleChevRight className='sidebar-icon' />
              </button>
            </Tooltip>
            <div className='dashboard-options'>
              <Tooltip title={<span className='tooltip-title'>History</span>} arrow>
                <button className={`dash-option small-icon history ${activeComponent === 'History' ? 'active' : ''}`} onClick={() => handleOptionClick('History')}> <MdHistory className='dash-option-icon' /></button>
              </Tooltip>
              <Tooltip title={<span className='tooltip-title'>Templates</span>} arrow>
                <button className={`dash-option small-icon ${activeComponent === 'Templates' ? 'active' : ''}`} onClick={() => handleOptionClick('Templates')}><TbTemplate className='dash-option-icon' /></button>
              </Tooltip>
              <Tooltip title={<span className='tooltip-title'>API Access</span>} arrow>
                <button className={`dash-option small-icon ${activeComponent === 'APIAccess' ? 'active' : ''}`} onClick={() => handleOptionClick('APIAccess')}><TbCloudNetwork className='dash-option-icon' /></button>
              </Tooltip>
              <Tooltip title={<span className='tooltip-title'>Settings</span>} arrow>
                <button className={`dash-option small-icon ${activeComponent === 'Settings' ? 'active' : ''}`} onClick={() => handleOptionClick('Settings')}><IoSettingsOutline className='dash-option-icon' /></button>
              </Tooltip>
              <Tooltip title={<span className='tooltip-title'>Logout</span>} arrow>
                <button className='dash-option small-icon logout-btn' onClick={handleLogout}><TbLogout className='dash-option-icon' /></button>
              </Tooltip>
              {/* {storedEmail && <div>{storedEmail}</div>}  */}
              {/* Change this eventually */}
            </div>
          </div>
        </div>}


      <div className={`main-panel ${darkMode ? 'main-panel-dark' : 'main-panel-light'}`}>
        {activeComponent === 'History' && <History />}
        {activeComponent === 'Templates' && <Templates />}
        {activeComponent === 'APIAccess' && <APIAccess />}
        {activeComponent === 'Settings' && <Settings />}
      </div>
    </div>

  );
}

export default Dashboard;