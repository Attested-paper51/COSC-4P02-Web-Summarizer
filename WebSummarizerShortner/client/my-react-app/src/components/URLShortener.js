import React, { useState } from 'react';
import "./css/URLShortenerStyle.css";
import { Link } from 'react-router-dom';

const URLShortener = () => {

    const [URL, setURL] = useState('');
    const [shortened, setShortURL] = useState('');
    
    const [CopyURL, setCopyURL] = useState('Copy URL')
    const handleCopy = () => {
        navigator.clipboard.writeText(shortened)
        setCopyURL('Copied')
        setTimeout(() => {
            setCopyURL('Copy URL');
        }, 3000); // Reverts back to 'Submit' after 3 seconds
    }

    const handleSubmit = (e) => {
        const url = {URL} 
        console.log(url)
    }

    const [summarize, showSummarize] = useState(false);

    return (
        <div className='url'>
            {/* <h1>Shorten a URL</h1>*/}
            <label className='insert-url'>Insert URL to be shortened</label> 
            <input className='input-url'
                type="text" 
                required
                value={URL}
                onChange={(e) => setURL(e.target.value)}
                placeholder='Enter URL here' 
            />

            <button 
                className='shorten' 
                onClick={()=> { handleSubmit(); showSummarize(true); }} >
                <div className='button-text'>Shorten URL</div>
            </button>
            <label className='shorten-url'>Shortened URL</label> 
            <input className='output-url' 
                type="text" 
                required
                value={shortened}
                onChange={(e) => setShortURL(e.target.value)}
                placeholder='Get Shortened URL' 
            />
            <button 
                className='copy-url' 
                onClick={handleCopy}>
                <div className='button-text'>{CopyURL}</div>
            </button>

              
            { summarize &&
                <Link to = "/Summarizer">
                    <button 
                        className='summarize-url-content'>
                        <div className='button-text'>Summarize the URL content</div>
                    </button> 
                </Link>
            }

        </div> 
    );
  
}

export default URLShortener;