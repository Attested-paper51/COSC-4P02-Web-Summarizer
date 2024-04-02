import React, { useState } from 'react';
import "./css/URLShortenerStyle.css";
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext.js'

const URLShortener = () => {

    const { darkMode } = useTheme();
    const [isPremium, setPremium] = useState(true);
    const [username, setUsername] = useState('testusername');

    const [URL, setURL] = useState('');
    const [shortened, setShortURL] = useState('');
    const [customWord, setCustomWord] = useState('');
    
    const [CopyURL, setCopyURL] = useState('Copy URL')
    const handleCopy = () => {
        navigator.clipboard.writeText(shortened)
        setCopyURL('Copied')
        setTimeout(() => {
            setCopyURL('Copy URL');
        }, 3000); // Reverts back to 'Submit' after 3 seconds
    }

    const email = localStorage.getItem('email');

    // const handleSubmit = (e) => {
    //     const url = {URL} 
    //     console.log(url)
    // }

    //Added code for handleSubmit
    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5002/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ originalURL: URL, email }),
            });
    
            if (response.ok) {
                const result = await response.json();
                setShortURL(result.shortenedURL);
            } else {
                console.error('Failed to shorten URL');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const [summarize, showSummarize] = useState(false);

    return (
        <div className={`url ${darkMode ? 'url-dark' : 'url-light'}`}>
            {/* <h1>Shorten a URL</h1>*/}
            <div className='url-wrapper'>
                <h3 className='insert-url'>Insert URL to be shortened</h3> 
                <div className='url-div1'>
                    <input className={`input-url ${darkMode ? 'input-url-dark' : 'input-url-light'}`}
                        type="text" 
                        required
                        value={URL}
                        onChange={(e) => setURL(e.target.value)}
                        placeholder='Enter URL here' 
                    />
                    { !isPremium &&
                    <button 
                        className={`shorten ${darkMode ? 'btn-dark' : 'btn-light'}`}  
                        onClick={()=> { handleSubmit(); showSummarize(true); }} >
                        <div className={`button-text ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Shorten URL</div>
                    </button>
                    }
                </div>
                { isPremium &&
                    <div className='premium-url'>
                        <h3 className='custom-url'>Customize your link</h3> 
                        <div className='custom-div'>
                            <input className={`shortify-url ${darkMode ? 'su-dark' : 'su-light'}`}
                                type="text" 
                                required
                                onChange={(e) => setURL(e.target.value)}
                                placeholder={`shortify.com/${username}`}
                                readOnly
                            />
                            {/* <div className='custom-div1'> */}
                                <input className={`custom-word ${darkMode ? 'input-url-dark' : 'input-url-light'}`}
                                    type="text" 
                                    required
                                    value={customWord}
                                    onChange={(e) => setCustomWord(e.target.value)}
                                    placeholder='Enter custom word' 
                                />
                                <button 
                                    className={`shorten-custom ${darkMode ? 'btn-dark' : 'btn-light'}`} 
                                    onClick={()=> { handleSubmit(); showSummarize(true); }} >
                                    <div className={`button-text ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Shorten URL</div>
                                </button>
                            {/* </div> */}
                        </div>
                    </div>
                }   
                <div className='url-shorten-container'>
                    <h3 className='shorten-url'>Shortened URL</h3> 
                    <div className='url-div2'>
                        <input className={`output-url ${darkMode ? 'input-url-dark' : 'input-url-light'}`} 
                            type="text" 
                            required
                            value={shortened}
                            onChange={(e) => setShortURL(e.target.value)}
                            placeholder='Get Shortened URL' 
                            readOnly
                        />
                        <button 
                            className={`copy-url ${darkMode ? 'btn-dark' : 'btn-light'}`} 
                            onClick={handleCopy}>
                            <div className={`button-text ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`} >{CopyURL}</div>
                        </button>
                    </div>
                </div>
                
                { summarize &&
                    <Link to = "/Summarizer">
                        <div className='url-div3'>
                            <button 
                                className={`summarize-url-content ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                <div className={`button-text ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Summarize the URL content</div>
                            </button> 
                        </div>
                    </Link>
                }
                
            </div>
        </div> 
    );
  
}

export default URLShortener;