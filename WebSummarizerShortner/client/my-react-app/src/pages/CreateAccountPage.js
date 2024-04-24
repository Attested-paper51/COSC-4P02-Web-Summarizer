import React from 'react';
import Header from '../components/Header.js';
import SignUp from '../components/SignUp.js';
import Footer from '../components/Footer.js';
import { ThemeProvider } from '../context/ThemeContext.js';

const CreateAccountPage = () => {
    return (
        <ThemeProvider>
            <div className='App'>
                <Header />
                <SignUp />
                <Footer />
            </div>
        </ThemeProvider>    
    );
};

export default CreateAccountPage;