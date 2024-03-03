import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import "./css/SummarizerStyle.css";
import "./css/SignUpStyle.css";

// Icons
// import { FaTrashCan } from "react-icons/fa6";
import { GoThumbsdown } from "react-icons/go";
import { GoThumbsup } from "react-icons/go";
import { IoClipboardOutline } from "react-icons/io5";
import { IoClipboard } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";

// Components
import DialogBox from '../components/DialogBox.js';

const Summarizer = () => {
    const [inputContent, setInputContent] = useState('');
    const [outputContent, setOutputContent] = useState('');
    const [open, setOpen] = useState(false);
    const [shorten, showShorten] = useState(false);
    const [isClicked, setClickedButton] = useState(0);

    const toggleClicked = (buttonIndex) => {
        setClickedButton(buttonIndex);
    }

    // for opening Dialog Box
    const handleOpen = () => {
        setOpen(true);
    }

    // for closing Dialog Box
    const handleClose = () => {
        setOpen(false);
    }

    // detecting input text change
    const handleInputChange = (event) => {
        setInputContent(event.target.value);
    }

    // detecting output text change
    const handleOutputChange = (event) => {
        setOutputContent(event.target.value);
    }

    /** every render: checks if output has text
     *  if it does, then makes output editable
     *  else, keeps it readOnly*/
    useEffect(() => {
        // runs after every render
        const output = document.getElementById("output");
        if(outputContent !== '') {
            output.readOnly = false;
        }
        else {
            output.readOnly = true;
        }
    });

    const componentDidMount = () =>
    {
        // // This is called after the component has been mounted to the DOM
        // const inputArea = document.querySelector("textarea");
        // const outputArea = document.getElementById("output"); 
        // // Now you can work with the textarea
        // inputArea.addEventListener("input", e =>
        // {
        //     inputArea.style.height = "60.5vh";
        //     //alert(inputArea.style.height)
        //     outputArea.style.height = inputArea.style.height;
        //     let height = e.target.scrollHeight;
        //     //alert(height)
        //     inputArea.style.height = `${(height / window.innerHeight) * 100}vh`;
        //     outputArea.style.height = inputArea.style.height;
        // })

        // //Add an additional check for the window resize event
        // window.addEventListener("resize", () => {
        //     // Reset the height when the window is resized
        //     inputArea.style.height = "60.5vh";
        //     outputArea.style.height = inputArea.style.height;
        // });
    }

    // empties input and output
    const emptyTextContent = () => {
        setInputContent('');
        setOutputContent('');
    }

    // empties content and closes Dialog Box
    const handleConfirm = () => {
        emptyTextContent();
        handleClose();
    }

    // functions can be changed accordingly
    const thumbsUp = () => {
        console.log("Output summary is good!")
    }
    const thumbsDown = () => {
        console.log("Output summary is bad.")
    }

    const [isCopied, setCopy] = useState(false);
    const copySummary = () => {
        navigator.clipboard.writeText(outputContent)
        setCopy(!isCopied);
    }

    // document.addEventListener('DOMContentLoaded', function() {
    //     const textarea = document.getElementById('input');
    //     const targetDiv = document.getElementById('btnDiv');

    //     textarea.addEventListener('input', function() {
    //         targetDiv.style.borderColor = '#87CEFA'; // Change border color when typing
    //     });

    //     textarea.addEventListener('blur', function() {
    //         targetDiv.style.borderColor = '#ccc'; // Reset border color when textarea loses focus
    //     });
    // });

    return (
        <div className="wrapper">
            <h2>Summarizer</h2>
            <div className="summarizer-container">
                <div className="centered-Div">
                    <div class="button-container">
                        <button 
                            className={`customSumBtn ${isClicked === 0? 'clicked disabled-hover':''}`} 
                            onClick={() => toggleClicked(0)}>Text</button>
                        <button 
                            className={`customSumBtn ${isClicked === 1? 'clicked disabled-hover':''}`} 
                            onClick={() => toggleClicked(1)}>Website URL</button>
                        <button 
                            className={`customSumBtn ${isClicked === 2? 'clicked disabled-hover':''}`} 
                            onClick={() => toggleClicked(2)}>Youtube URL</button>
                    </div>
                    <div className="text">
                        <div className="inputArea">
                            <textarea
                                id='input' 
                                placeholder='Paste your text here...' 
                                value={inputContent} 
                                onChange={handleInputChange} 
                                required>    
                            </textarea>
                            { inputContent &&
                                (<Tooltip title="Delete" arrow>
                                    <button className='delete-button' 
                                        onClick={handleOpen}><FaRegTrashCan size={18} />
                                    </button>
                                </Tooltip>)
                            }
                            <div className='buttonDiv' id="btnDiv">
                                <button className="summarize-btn">
                                    <div className="summarize-overlap">
                                        <div className="summarize">Summarize</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="inputArea" id="OutputTextArea">
                            {/* <div class="button-container">
                                
                            </div> */}
                            <textarea 
                                id='output'
                                placeholder='Get output here...' 
                                value={outputContent} 
                                onChange={handleOutputChange} 
                                required
                                readOnly>   
                            </textarea>
                            <div className='buttonDiv' id="btnDiv2">
                                { shorten &&
                                    <Link to = "/Shortener">
                                        <button className="summarize-btn">
                                            <div className="summarize-overlap">
                                                <div className="summarize">Shorten your URL</div>
                                            </div>
                                        </button>
                                    </Link>
                                }
                                
                                <Tooltip title="Like" arrow>
                                    <button className='feedback-up' onClick={thumbsUp}><GoThumbsup size={19}/></button>
                                </Tooltip>
                                <Tooltip title="Dislike" arrow>
                                    <button className='feedback-down' onClick={thumbsDown}><GoThumbsdown size={19}/></button>
                                </Tooltip>
                            </div>
                            <Tooltip title="Copy" arrow>
                                <button className='copy-button' onClick={copySummary}>{isCopied ? <IoClipboard size={17}/> : <IoClipboardOutline size={17}/>}</button>
                            </Tooltip>
                            
                        </div>
                    </div>
                </div>
            </div>
            <DialogBox 
            open={open} 
            onClose={handleClose}
            title={"Delete Text"}
            content={"You're about to delete the Original and Summarized text."}
            confirmText={"Continue"}
            onConfirm={handleConfirm}
            />
        </div>
    );
}

export default Summarizer;
