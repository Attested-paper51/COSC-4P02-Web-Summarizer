import React from 'react';
import Header from '../components/Header.js';
import Summarizer from '../components/Summarizer.js';
import Footer from '../components/Footer.js';

const SummarizerPage = () => {
    return (
        <div className='App'>
            <Header />
            <Summarizer />
            <Footer />
        </div>
    );
};

export default SummarizerPage;