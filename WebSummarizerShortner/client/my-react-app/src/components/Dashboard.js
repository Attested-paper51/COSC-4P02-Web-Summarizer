import React, { useState } from 'react';
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