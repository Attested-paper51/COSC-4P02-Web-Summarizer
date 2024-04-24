import React from 'react';
import Header from '../components/Header.js';
import Summarizer from '../components/Summarizer.js';
import Footer from '../components/Footer.js';
import { ThemeProvider } from '../context/ThemeContext.js';

const SummarizerPage = () => {
    return (
        <ThemeProvider>
            <div className='App'>
                <Header />
                <Summarizer />
                <Footer />
            </div>
        </ThemeProvider>
        
    );
};

export default SummarizerPage;