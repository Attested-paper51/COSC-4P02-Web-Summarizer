import './App.css';
import Header from './components/Header.js';
import Summarizer from './components/Summarizer.js';
import LandingPage from './components/LandingPage.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <div className="App">
      <Header />
      <LandingPage />
      {/* <div className='Summarizer'>
        <Summarizer />
      </div> */}
      <Footer />
    </div>
  );
}

export default App;