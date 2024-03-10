import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js'
import SummarizerPage from './pages/SummarizerPage.js'
import ShortenerPage from './pages/ShortenerPage.js'
import AuthenticationPage from './pages/AuthenticationPage.js'
import CreateAccountPage from './pages/CreateAccountPage.js'
import VerifyUsernamePage from './pages/VerifyUsernamePage.js'
import ResetPasswordPage from './pages/ResetPasswordPage.js'
import FeedbackPage from './pages/FeedbackPage.js';
import UserDashboardPage from './pages/UserDashboardPage.js';


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
            <Route path="/Verify" element={<VerifyUsernamePage />} />
            <Route path="/Reset" element={<ResetPasswordPage />} />
            <Route path="/Feedback" element={<FeedbackPage />} />
            <Route path="/Dashboard" element={<UserDashboardPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;