import React, { useState } from 'react';
import "./css/URLShortenerStyle.css";
import { Link } from 'react-router-dom';


const URLShortener = () => {

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
            const response = await fetch('http://localhost:5000/shorten', {
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
        <div className='url'>
            {/* <h1>Shorten a URL</h1>*/}
            <h3 className='insert-url'>Insert URL to be shortened</h3> 
            <div className='url-div1'>
                <input className='input-url'
                    type="text" 
                    required
                    value={URL}
                    onChange={(e) => setURL(e.target.value)}
                    placeholder='Enter URL here' 
                />
                { !isPremium &&
                <button 
                    className='shorten' 
                    onClick={()=> { handleSubmit(); showSummarize(true); }} >
                    <div className='button-text'>Shorten URL</div>
                </button>
                }
            </div>
            { isPremium &&
                <div className='premium-url'>
                    <h3 className='custom-url'>Customize your link</h3> 
                    <div className='custom-div'>
                        <input className='shortify-url'
                            type="text" 
                            required
                            onChange={(e) => setURL(e.target.value)}
                            placeholder={`shortify.com/${username}`}
                            readOnly
                        />
                        {/* <div className='custom-div1'> */}
                            <input className='custom-word'
                                type="text" 
                                required
                                value={customWord}
                                onChange={(e) => setCustomWord(e.target.value)}
                                placeholder='Enter custom word' 
                            />
                            <button 
                                className='shorten-custom' 
                                onClick={()=> { handleSubmit(); showSummarize(true); }} >
                                <div className='button-text'>Shorten URL</div>
                            </button>
                        {/* </div> */}
                    </div>
                </div>
            }   
            <div className='url-shorten-container'>
                <h3 className='shorten-url'>Shortened URL</h3> 
                <div className='url-div2'>
                    <input className='output-url' 
                        type="text" 
                        required
                        value={shortened}
                        onChange={(e) => setShortURL(e.target.value)}
                        placeholder='Get Shortened URL' 
                        readOnly
                    />
                    <button 
                        className='copy-url' 
                        onClick={handleCopy}>
                        <div className='button-text'>{CopyURL}</div>
                    </button>
                </div>
            </div>
              
            { summarize &&
                <Link to = "/Summarizer">
                    <div className='url-div3'>
                        <button 
                            className='summarize-url-content'>
                            <div className='button-text'>Summarize the URL content</div>
                        </button> 
                    </div>
                </Link>
            }

        </div> 
    );
  
}

export default URLShortener;