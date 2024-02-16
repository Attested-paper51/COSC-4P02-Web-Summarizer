import React, { useState } from 'react';
import "./css/URLShortenerStyle.css";


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
                body: JSON.stringify({ originalURL: URL }),
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
            <label className='insert-url'>Insert URL to be shortened</label> 
            <input className='input-url'
                type="text" 
                required
                value={URL}
                onChange={(e) => setURL(e.target.value)}
                placeholder='Enter URL here' 
            />

            <button className='shorten' onClick={()=> { handleSubmit(); showSummarize(true); }} >Shorten URL</button>
            <label className='shorten-url'>Shortened URL</label> 
            <input className='output-url' 
                type="text" 
                required
                value={shortened}
                onChange={(e) => setShortURL(e.target.value)}
                placeholder='Get Shortened URL' 
            />
            <button className='copy-url' onClick={handleCopy}>{CopyURL}</button>

            
            { summarize && <button className='summarize-url-content'>Summarize the URL content</button> }
            

            
        </div>
    );
  
}

export default URLShortener;