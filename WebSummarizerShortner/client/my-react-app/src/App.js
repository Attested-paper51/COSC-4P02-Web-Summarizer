import './App.css';
import React from 'react';
import HomePage from './pages/HomePage.js'
import SummarizerPage from './pages/SummarizerPage.js'
import ShortenerPage from './pages/ShortenerPage.js'
import AuthenticationPage from './pages/AuthenticationPage.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/Summarizer" element={<SummarizerPage />} />
            <Route path="/Shortener" element={<ShortenerPage />} />
            <Route path="/Login" element={<AuthenticationPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;