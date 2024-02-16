import React from 'react';
import Header from '../components/Header.js';
import VerifyUser from '../components/VerifyUser.js';
import Footer from '../components/Footer.js';

const VerifyUsernamePage = () => {
    return (
        <div className='App'>
            <Header />
            <VerifyUser />
            <Footer />
        </div>
    );
};

export default VerifyUsernamePage;