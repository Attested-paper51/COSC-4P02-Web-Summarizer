import React from 'react';
import Header from '../components/Header.js';
import Hero from '../components/Hero.js';
import LandingPage from '../components/LandingPage.js';
import Footer from '../components/Footer.js';

const HomePage = () => {
    return (
        <div className='App'>
            <Header />
            <Hero />
            <LandingPage />
            <Footer />
        </div>
    );
};

export default HomePage;