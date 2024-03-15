import React, { useContext, useState, useEffect } from 'react';
import "./css/DashboardStyle.css";
import { MdHistory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TbTemplate } from "react-icons/tb";
import { TbCloudNetwork } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import History from './History.jsx';
import Templates from './Templates.jsx';
import Settings from './Settings.jsx';
import APIAccess from './APIAccess.jsx';
import { AuthContext  } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  let username = 'Jane Doe'

  const [historyVisible, setHistoryVisible] = useState(false)
  const [templatesVisible, setTemplatesVisible] = useState(false)
  const [apiVisible, setAPIVisible] = useState(false)
  const [settingsVisible, setSettingsVisible] = useState(true)

  const handleHClick = (e) => {
    setHistoryVisible(true)
    setAPIVisible(false)
    setSettingsVisible(false)
    setTemplatesVisible(false)
  }
  const handleTClick = (e) => {
    setTemplatesVisible(true)
    setAPIVisible(false)
    setSettingsVisible(false)
    setHistoryVisible(false)
  }
  const handleAClick = (e) => {
    setAPIVisible(true)
    setHistoryVisible(false)
    setSettingsVisible(false)
    setTemplatesVisible(false)
  }
  const handleSClick = (e) => {
    setSettingsVisible(true)
    setAPIVisible(false)
    setHistoryVisible(false)
    setTemplatesVisible(false)
  }

  //Testing, not fully working, attempting to see if the logged in user will
  //persist after refreshing the page.
  const { userEmail } = useContext(AuthContext);
  const [authenticated, setAuthenticated] = useState(false);
  const storedEmail = localStorage.getItem('email');
  const navigate = useNavigate();

  useEffect (() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    //const userEmail = localStorage.getItem('email');
    setAuthenticated(!!isAuthenticated);
    

    console.log('Authentication state is: ',isAuthenticated);
    //console.log('Authenticated email: ',userEmail);

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('authenticated');
    navigate('/');
  };

  //console.log('Authentication state is: ',isAuthenticated);
  console.log('AuthContext email: ',userEmail);
  console.log('Local Storage email: ',storedEmail);


  return (

    <div className="dashboard">
      <div className="side-panel">
          <div className='user-profile'>
            <IoPersonSharp size={160}/>
          </div>
          <div className='user-name'>{username}</div>
          <div className='dashboard-options'>
              <button className='dash-option' onClick={handleHClick}><MdHistory size={25} />History</button>
              <button className='dash-option' onClick={handleTClick}><TbTemplate size={25}/>Templates</button>
              <button className='dash-option' onClick={handleAClick}><TbCloudNetwork size={25} />API Access</button>
              <button className='dash-option' onClick={handleSClick}><IoSettingsOutline size={25}/>Settings</button>
          {/* <div>Image</div> */}
          
          {/* {storedEmail && <div>{storedEmail}</div>}  */}
          {/* Change this eventually */}
          {/* <div className='dashboard-options'>
              <div className='dash-option'>History</div>
              <div className='dash-option'>Templates</div>
              <div className='dash-option'>API Access</div>
              <div className='dash-option'>Settings</div>

          </div> */}
          {/* <button onClick={handleLogout}>Logout</button> */}
          </div>
      </div>
      <div className="main-panel">
            {historyVisible && <History />}
            {templatesVisible && <Templates />}
            {apiVisible && <APIAccess />}
            {settingsVisible && <Settings />}
        </div>
    </div>

  );
}

export default Dashboard;