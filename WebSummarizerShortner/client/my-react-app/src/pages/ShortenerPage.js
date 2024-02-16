import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import URLShortener from '../components/URLShortener.js';

const ShortenerPage = () => {
    return (
        <div className='App'>
            <Header />
            <URLShortener />
            <Footer />
        </div>
    );
};

export default ShortenerPage;