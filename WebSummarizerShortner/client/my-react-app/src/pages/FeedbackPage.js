import React from 'react';
import Header from '../components/Header.js';
import Feedback from '../components/Feedback.js';
import Footer from '../components/Footer.js';
import { ThemeProvider } from '../components/ThemeContext.js';

const FeedbackPage = () => {
    return (
        <ThemeProvider>
            <div  className='App'>
                <Header />
                <Feedback />
                <Footer />
            </div>
        </ThemeProvider>   
    );
};

export default FeedbackPage;