import React from 'react';
import Header from '../components/Header.js';
import VerifyUser from '../components/VerifyUser.js';
import Footer from '../components/Footer.js';
import { ThemeProvider } from '../components/ThemeContext.js';

const VerifyUsernamePage = () => {
    return (
        <ThemeProvider>
            <div className='App'>
                <Header />
                <VerifyUser />
                <Footer />
            </div>
        </ThemeProvider>
        
    );
};

export default VerifyUsernamePage;