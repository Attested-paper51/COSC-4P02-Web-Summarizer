import React, { useState } from 'react';
import "./css/DashboardStyle.css";
//import { Link } from 'react-router-dom';

const Dashboard = () => {

  return (

    <div className="dashboard">
        <div className="side-panel">
            <div>Image</div>
            <div>User Name</div>
            <div className='dashboard-options'>
                <div className='dash-option'>History</div>
                <div className='dash-option'>Templates</div>
                <div className='dash-option'>API Access</div>
                <div className='dash-option'>Settings</div>
            </div>
        </div>
        <div className="main-panel">
            MAIN PANEL
        </div>
    </div>
  );
}

export default Dashboard;