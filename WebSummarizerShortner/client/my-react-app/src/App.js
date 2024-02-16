import './App.css';
import Header from './components/Header.js';
import Summarizer from './components/Summarizer.js';
import LandingPage from './components/LandingPage.js';
import Footer from './components/Footer.js';
import Hero from './components/Hero.js';
import LogIn from './components/LogIn.js';


function App() {
  return (
    <div className="App">
      <Header />
      {/* <Summarizer /> */}
      {/* <Hero /> */}
      {/* <LandingPage /> */}
      <LogIn />
      <Footer />
    </div>
  );
}

export default App;