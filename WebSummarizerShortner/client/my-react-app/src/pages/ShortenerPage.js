import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import URLShortener from '../components/URLShortener.js';
import { ThemeProvider } from '../context/ThemeContext.js';

const ShortenerPage = () => {
    return (
        <ThemeProvider>
             <div className='App'>
                <Header />
                <URLShortener />
                <Footer />
            </div>
        </ThemeProvider>  
    );
};

export default ShortenerPage;