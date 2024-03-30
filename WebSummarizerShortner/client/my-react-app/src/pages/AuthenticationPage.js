import React from 'react';
import Header from '../components/Header.js';
import Login from '../components/LogIn.js';
import Footer from '../components/Footer.js';
import { ThemeProvider } from '../components/ThemeContext.js';

const AuthenticationPage = () => {
    return (
        <ThemeProvider>
            <div className='App'>
                <Header />
                <Login />
                <Footer />
            </div>
        </ThemeProvider>   
    );
};

export default AuthenticationPage;