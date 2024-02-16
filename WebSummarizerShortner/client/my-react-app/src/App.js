import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js'
import SummarizerPage from './pages/SummarizerPage.js'
import ShortenerPage from './pages/ShortenerPage.js'
import AuthenticationPage from './pages/AuthenticationPage.js'
import CreateAccountPage from './pages/CreateAccountPage.js'
import FeedbackPage from './pages/FeedbackPage.js';


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
            <Route path="/Signup" element={<CreateAccountPage />} />
            <Route path="/Forgot" element={<CreateAccountPage />} />
            <Route path="/Feedback" element={<FeedbackPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;