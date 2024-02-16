import React from 'react';
import Header from '../components/Header.js';
import Login from '../components/LogIn.js';
import Footer from '../components/Footer.js';

const AuthenticationPage = () => {
    return (
        <div className='App'>
            <Header />
            <Login />
            <Footer />
        </div>
    );
};

export default AuthenticationPage;