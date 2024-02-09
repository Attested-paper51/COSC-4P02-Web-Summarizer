import './App.css';
import Header from './components/Header.js';
import Summarizer from './components/Summarizer.js';
import LandingPage from './components/LandingPage.js';
import Footer from './components/Footer.js';
import Hero from './components/Hero.js';


function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <LandingPage />
      {/* <Footer /> */}
    </div>
  );
}

export default App;