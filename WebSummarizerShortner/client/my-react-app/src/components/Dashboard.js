import React, { useContext, useState, useEffect } from 'react';
import "./css/DashboardStyle.css";
//import { Link } from 'react-router-dom';
import { AuthContext  } from '../context/AuthContext';

const Dashboard = () => {

  //Testing, not fully working, attempting to see if the logged in user will
  //persist after refreshing the page.
  const { userEmail } = useContext(AuthContext);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect (() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    const userEmail = localStorage.getItem('email');
    setAuthenticated(!!isAuthenticated);
    

    console.log('Authentication state is: ',isAuthenticated);
    console.log('Authenticated email: ',userEmail);

  }, []);

  return (

    <div className="dashboard">
        <div className="side-panel">
            <div>Image</div>
            
            {userEmail && <div>{userEmail}</div>} {/* Change this eventually*/}
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