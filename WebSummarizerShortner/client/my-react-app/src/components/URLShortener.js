import React, { useState, useEffect } from 'react';
import "./css/URLShortenerStyle.css";
import { useTheme } from '../context/ThemeContext.js'
import DialogBox from '../components/DialogBox.js';
/**
 * URLShortener defines front-end functionality for the URL shortener
 * @returns URL Shortener page
 */
const URLShortener = () => {
    const { darkMode } = useTheme();
    const [username, setUsername] = useState('');

    // get state from the sessionStorage
    const storedState = sessionStorage.getItem('state');
    // Parse the stored state from it
    const parsedState = storedState ? JSON.parse(storedState) : null;

    const [URL, setURL] = useState('');
    const [shortened, setShortURL] = useState('');
    const [customWord, setCustomWord] = useState('');
    const [customWordError, setCustomWordError] = useState('');

    const [URLError, setURLError] = useState('');
    
    const [CopyURL, setCopyURL] = useState('Copy URL');

    //Copying a shortened link
    const handleCopy = () => {
        navigator.clipboard.writeText(shortened)
        setCopyURL('Copied')
        setTimeout(() => {
            setCopyURL('Copy URL');
        }, 3000); // Reverts back to 'Submit' after 3 seconds
    }

    const [openEmptyInput, setOpenEmptyInput] = useState(false);
    
    //Checking if the input is empty
    const checkEmptyInput = () => {
        console.log("URL is: " + URL)

        if(URL === '') {
            setOpenEmptyInput(true);
        }
        else {
            handleSubmit();
        }
    }
    // for closing Empty Error Dialog Box
    const handleEmptyClose = () => {
        setOpenEmptyInput(false)
    }
    const handleEmptyConfirm = () => {
        handleEmptyClose()
    }

    const handleChangeInput = (e) => {
        setURL(e.target.value);
        setURLError('');
    }

    const email = localStorage.getItem('email');


    //
    useEffect(() => {
        if (parsedState && parsedState.action === 'PUSH') {
            if (String(window.performance.getEntries()[0].type) === "navigate") {
                
                setURL(parsedState.inputContent)
            }
            else if (String(window.performance.getEntries()[0].type) === "reload") {
                setURL("")
            }
            //console.log("push")
        } else {
            //setInputState("I love decew!!!!")
            //console.log("pop")
        }
    }, [parsedState]);
    
    //useEffect to fetch the user's username to display in the 'custom short link preview', ONLY if they are logged in
    useEffect(() => {
        
        //Fetch user's username
        const fetchUsername = async () => {
            try {
                
                //const response = await fetch('https://4p02shortify.com:5001/getusername', { //For server use only
                const response = await fetch('http://localhost:5001/getusername', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });
    
                if (response.ok) {
                    const result = await response.json();
                    setUsername(result.message);
                    
                } else {
                    console.error('Failed to fetch username');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        if (email) {
            fetchUsername();
        }
    }, [email]);


    //URL Shortening
    const handleSubmit = async () => {

        const urlRegEx = /^(http:\/\/|https:\/\/|www\.)\w+/; //Regex for the prefixing of URLs

        if (!urlRegEx.test(URL)) {
            setURLError('URL invalid, enter a valid URL starting with http://, https://, or www.');
            return;
        }

        //Shorten the link by making a fetch call to Flask server
        try {
            const response = await fetch('http://127.0.0.1:5002/shorten', {
            //const response = await fetch('https://4p02shortify.com:5002/shorten', { //for server use only
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ originalURL: URL, email, customWord }),
            });
    
            if (response.ok) {
                const result = await response.json();
                //If the custom word is already in use
                if (result.message === 'Custom word already used in another link.') {
                    setCustomWordError(result.message);
                }else {
                    setShortURL(result.shortenedURL);
                    showSummarize(true); //allow user to summarize this link
                }
            } else {
                console.error('Failed to shorten URL');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //Handling the change of the custom word field
    const handleCustomWordChange = (e) => {
        setCustomWordError('');
        setCustomWord(e.target.value);
    };

    const [summarize, showSummarize] = useState(false);

    const transferLink = () => {
        const action = 'PUSH';
        const state = { action, URL };
        sessionStorage.setItem('URLState', JSON.stringify(state));
        //navigate("/Shortener", {state: { action:'PUSH', inputContent }});
    }

    return (
        <div className={`url ${darkMode ? 'url-dark' : 'url-light'}`}>
            {/* <h1>Shorten a URL</h1>*/}
            <div className='url-wrapper'>
                <h2 className='section-header-short'>URL Shortener</h2>
                <h3 className='insert-url'>Insert URL to be shortened</h3> 
                <div className='url-div1'>
                    <input className={`input-url ${darkMode ? 'input-url-dark' : 'input-url-light'}`}
                        type="text" 
                        required
                        value={URL}
                        onChange={handleChangeInput}
                        placeholder='Enter URL here' 
                    />
                    { !email && //If the user isn't logged in
                    <button 
                        className={`shorten ${darkMode ? 'btn-dark' : 'btn-light'}`} 
                        onClick={()=> { checkEmptyInput() }} >
                        <div className={`button-text ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Shorten URL</div>
                    </button>
                    } 
                </div>
                
                {URLError && <div className={`url-error ${darkMode ? 'error-dark' : 'error-light'}`}>{URLError}</div>}
                {email && //If the user is logged in
                    <div className='premium-url'>
                        <h3 className='custom-url'>Customize your link</h3> 
                        <div className='custom-div'>
                            <input className={`shortify-url ${darkMode ? 'su-dark' : 'su-light'}`}
                                type="text" 
                                required
                                onChange={(e) => setURL(e.target.value)}
                                placeholder={`4p02shortify.com/s/${username}/`}
                                readOnly
                            />
                                <input className={`custom-word ${darkMode ? 'input-url-dark' : 'input-url-light'}`}
                                    type="text" 
                                    required
                                    value={customWord}
                                    onChange={handleCustomWordChange}
                                    placeholder='Enter custom word' 
                                    data-testid='custom-input'
                                />
                                <button 
                                    className={`shorten-custom ${darkMode ? 'btn-dark' : 'btn-light'}`} 
                                    onClick={()=> { checkEmptyInput() }} >
                                    <div className={`button-text ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Shorten URL</div>
                                </button>
                        </div>
                            {customWordError && <div className={`custom-url-error ${darkMode ? 'error-dark' : 'error-light'}`}>{customWordError}</div>}
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

                <DialogBox 
                open={openEmptyInput} 
                onClose={handleEmptyClose}
                title={"Error"}
                content={"Please enter a URL to be shortened."}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText={"Continue"}
                onConfirm={handleEmptyConfirm}
                />
                
                { summarize &&
                    <a href="/Summarizer" onClick={transferLink}>
                        <div className='url-div3'>
                            <button 
                                className={`summarize-url-content ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                <div className={`button-text ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Summarize the URL content</div>
                            </button> 
                        </div>
                    </a>
                }
                
            </div>
        </div> 
    );
  
}

export default URLShortener;