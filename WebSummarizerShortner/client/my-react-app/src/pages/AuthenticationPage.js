import React from 'react';
import Header from '../components/Header.js';
import logIn from '../components/LogIn.js';
import Footer from '../components/Footer.js';

const AuthenticationPage = () => {
    return (
        <div className='App'>
            <Header />
            <logIn />
            <Footer />
        </div>
    );
};

export default AuthenticationPage;