import React from 'react';
import Header from '../components/Header.js';
import Password from '../components/Password.js';
import Footer from '../components/Footer.js';
import { ThemeProvider } from '../context/ThemeContext.js';

const ResetPasswordPage = () => {
    return (
        <ThemeProvider>
            <div className='App'>
                <Header />
                <Password />
                <Footer />
            </div>
        </ThemeProvider>   
    );
};

export default ResetPasswordPage;