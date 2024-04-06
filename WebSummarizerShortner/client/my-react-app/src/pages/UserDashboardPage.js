import React from 'react';
import Header from '../components/Header.js';
import Dashboard from '../components/Dashboard.js';
import Footer from '../components/Footer.js';
import { ThemeProvider } from '../components/ThemeContext.js';

const UserDashboardPage = () => {
    return (
        <ThemeProvider>
            <div className='App'>
                <Header />
                <Dashboard />
                <Footer />
            </div>
        </ThemeProvider> 
    );
};

export default UserDashboardPage;