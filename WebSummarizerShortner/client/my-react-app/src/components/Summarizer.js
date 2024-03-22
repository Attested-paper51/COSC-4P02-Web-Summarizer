import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "./css/SummarizerStyle.css";
import "./css/SignUpStyle.css";

// Icons
// import { FaTrashCan } from "react-icons/fa6";
import { GoThumbsdown } from "react-icons/go";
import { GoThumbsup } from "react-icons/go";
import { IoClipboardOutline } from "react-icons/io5";
import { IoClipboard } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { PiExport } from "react-icons/pi";
// Components
import DialogBox from '../components/DialogBox.js';
import Dropdown from "./Dropdown.js";
import DropdownItem from "./DropdownItem.js";
import NumberInputBasic, {QuantityInput} from "./NumberInput.js"; 

const Summarizer = () => {
    const [inputContent, setInputContent] = useState('');
    const [outputContent, setOutputContent] = useState('');
    const [open, setOpen] = useState(false);
    const [shorten, showShorten] = useState(false);
    const [isClicked, setClickedButton] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);
    const [value, setValue] = useState(null);
    const [isPremium, setPremium] = useState(false);
    const userEmail = localStorage.getItem('email');

    const tone = ["Standard", "Formal", "Causal", "Sarcastic", "Aggressive", "Sympathetic"];
    const [selectedTone, setTone] = useState(tone[0]);

    const layout = ["Paragraph", "Bullet Points", "Numbered List"];
    const [selectedLayout, setLayout] = useState(layout[0]);

    const videoSetting = ["Full Video", "Timestamp"];
    const [selectedVideoSetting, setVideoSetting] = useState(videoSetting[0]);

    function valuetext(value) {
        return `${value}°C`;
    }

    const toggleClicked = (buttonIndex) => {
        setClickedButton(buttonIndex)
        emptyTextContent()
        showShorten(false)
    }

    // for opening Dialog Box
    const handleOpen = () => {
        setOpen(true)
    }

    // for closing Dialog Box
    const handleClose = () => {
        setOpen(false)
    }

    // detecting input text change
    const handleInputChange = (event) => {
        setInputContent(event.target.value)
    }

    // detecting output text change
    const handleOutputChange = (event) => {
        setOutputContent(event.target.value)
    }

    // counts number of words in a string
    const countWords = (text) => {
        text = text.trim()
        const words = text.split(/\s+/)
        return words.length
    }    

    useEffect(() => {
        
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        // set a timeout of 200 miliseconds - then update the word count
        const id = setTimeout(() => {
            // updates word count
            if(inputContent.trim().length == 0) {
                setWordCount(0)
            }
            else {
                const words = countWords(inputContent)
                setWordCount(words)
            }
        }, 200)

        setTimeoutId(id)

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [inputContent])


    /** every render: checks if output has text
     *  if it does, then makes output editable
     *  else, keeps it readOnly*/
    useEffect (() => {
        // runs after every render
        const output = document.getElementById("output");
        if(outputContent !== '') {
            output.readOnly = false
        }
        else {
            output.readOnly = true
        }

        // conditions for showing the link to Url Shortener
        if((isClicked === 1 || isClicked === 2) && outputContent !== '') {
            showShorten(true)
        }   
        else if (isClicked == 0)
        {
            showShorten(false)
        }
    })


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
        setInputContent('')
        setOutputContent('')
    }

    // empties content and closes Dialog Box
    const handleConfirm = () => {
        emptyTextContent()
        showShorten(false)
        handleClose()
    }

    // functions can be changed accordingly
    const thumbsUp = () => {
        console.log("Output summary is good!")
    }
    const thumbsDown = () => {
        console.log("Output summary is bad.")
        setOutputContent('Bilaaaaal')
    }

    const [isCopied, setCopy] = useState(false)
    const copySummary = () => {
        navigator.clipboard.writeText(outputContent)
        setCopy(!isCopied)
    }

    const handleToneChange = (item) => {
        setTone(item)
    }

    const handleLayoutChange = (item) => {
        setLayout(item)
    }

    const handleVideoSettingChange = (item) => {
        setVideoSetting(item)
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
                            className={`customSumBtn clamp-text ${isClicked === 0? 'clicked disabled-hover':''}`} 
                            onClick={() => toggleClicked(0)}>Text</button>
                        <button 
                            className={`customSumBtn ${isClicked === 1? 'clicked disabled-hover':''}`} 
                            onClick={() => toggleClicked(1)}>Website URL</button>
                        <button 
                            className={`customSumBtn ${isClicked === 2? 'clicked disabled-hover':''}`} 
                            onClick={() => toggleClicked(2)}>Youtube URL</button>
                    </div>

                    <div className="main-content">
                        {/* {userEmail && ( */}

                        <div className="premium-container">
                            <div className="modes">
                                <div className="mode">
                                    <p>Modes:</p>
                                </div>
                                <div className="dropdown-menus modes">
                                    <div className="dropdown-menu">
                                        <Dropdown
                                            buttonText={selectedTone}
                                            content={<>
                                                {
                                                    tone.map(item => 
                                                        <DropdownItem
                                                            key={item}
                                                            onClick={() => handleToneChange(item)}>
                                                                {`${item}`}
                                                        </DropdownItem>)
                                                }
                                            </>} 
                                        />
                                    </div>
                                    <div className="dropdown-menu">
                                        <Dropdown
                                            buttonText={selectedLayout}
                                            content={<>
                                                {
                                                    layout.map(item => 
                                                        <DropdownItem
                                                            key={item}
                                                            onClick={() => handleLayoutChange(item)}>
                                                                {`${item}`}
                                                        </DropdownItem>)
                                                }
                                            </>} 
                                        />
                                    </div>
                                    <div className="word-count-level">
                                        <div className="slider-text">
                                            <p>Summary Length:</p>
                                        </div>
                                        <div className="slider-container">
                                            <div className="slider-text">
                                                <p>Short</p>
                                            </div>
                                            <div className="slider-wrapper">
                                                <Box sx={{ width: 100 }} className="slider">
                                                    <Slider
                                                        aria-label="Temperature"
                                                        defaultValue={10}
                                                        getAriaValueText={valuetext}
                                                        // valueLabelDisplay="auto"
                                                        shiftStep={0}
                                                        step={10}
                                                        marks
                                                        min={10}
                                                        max={40}
                                                        color="primary"
                                                    />
                                                </Box>
                                            </div>
                                            <div className="slider-text">
                                                <p>Long</p>
                                            </div>
                                        </div>
                                    </div>
                                    { isClicked == 2 &&
                                        <div className="dropdown-menu">
                                            <Dropdown
                                                buttonText={selectedVideoSetting}
                                                content={<>
                                                    {
                                                        videoSetting.map(item => 
                                                            <DropdownItem
                                                                key={item}
                                                                onClick={() => handleVideoSettingChange(item)}>
                                                                    {`${item}`}
                                                            </DropdownItem>)
                                                    }
                                                </>} 
                                            />
                                        </div>
                                    }

                                    { isClicked ==2 && selectedVideoSetting == videoSetting[1] &&
                                        <div className="timestamp">
                                            <div className="start">
                                                Start Time:
                                                <div className="start-time">
                                                    {/* <textarea 
                                                        className="timestamp-textarea" 
                                                        id="startM" 
                                                        name="startM" 
                                                        placeholder='Minutes'>
                                                    </textarea> */}
                                                    <NumberInputBasic/>
                                                    :
                                                    <QuantityInput/>
                                                    {/* <textarea className="timestamp-textarea" id="startS" name="startS" placeholder='Seconds'></textarea> */}
                                                </div>
                                            </div>

                                            <div className="end">
                                                End Time:
                                                <div className="end-time">
                                                    <textarea className="timestamp-textarea" name="endM" placeholder='Minutes'></textarea>
                                                    :
                                                    <textarea className="timestamp-textarea" name="endS" placeholder='Seconds'></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="save-custom-info">
                                <button className='summarize-btn'>
                                    <div className="summarize-overlap">
                                        <div className="summarize">Save Features</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        {/* </div>)} */}
                        <div className="text">
                            <div className="inputArea">
                                { isClicked == 0 &&
                                    <textarea
                                        className="text-area"
                                        id='inputText' 
                                        placeholder='Enter or paste your text and click "Summarize."' 
                                        value={inputContent} 
                                        onChange={handleInputChange} 
                                        required>    
                                    </textarea>
                                }
                                { isClicked == 1 &&
                                    <textarea
                                        className="text-area"
                                        id='inputURL' 
                                        placeholder='Enter or paste your URL and click "Summarize."' 
                                        value={inputContent} 
                                        onChange={handleInputChange} 
                                        required>    
                                    </textarea>
                                }
                                { isClicked == 2 &&
                                    <textarea
                                        className="text-area"
                                        id='inputYTURL' 
                                        placeholder='Enter or paste your Youtube URL and click "Summarize."' 
                                        value={inputContent} 
                                        onChange={handleInputChange} 
                                        required>    
                                    </textarea>
                                }

                                { inputContent &&
                                    (<Tooltip title="Delete" arrow>
                                        <button className='delete-button' 
                                            onClick={handleOpen}><FaRegTrashCan size={18} />
                                        </button>
                                    </Tooltip>)
                                }
                                <div className='bottom-div1'>
                                    <div className="word-count">
                                        { inputContent && wordCount >= 1 && wordCount < 126 ? 
                                            (<Tooltip title={inputContent.length == 1? `${inputContent.length} Character`: `${inputContent.length} Characters`} arrow>
                                                <div className="word-cnt-div">{wordCount == 1? `${wordCount} Word`: `${wordCount} Words`}</div>
                                            </Tooltip>) : wordCount >= 126 ?
                                            <div className="get-premium">
                                                <div><Link to = "/Login" className="link-blue">Get Premium</Link> for unlimited words.</div>
                                                <div>{wordCount}/125 Words</div>    
                                            </div> : null
                                        }
                                    </div>

                                    { wordCount > 125? 
                                        <Tooltip title="Over the word limit" arrow>
                                            <button className='summarize-btn button-disabled'>
                                                <div className="summarize-overlap">
                                                    <div className="summarize">Summarize</div>
                                                </div>
                                            </button>
                                        </Tooltip> :
                                            <button className='summarize-btn'>
                                                <div className="summarize-overlap">
                                                    <div className="summarize">Summarize</div>
                                                </div>
                                            </button>
                                    }
                                </div>
                            </div>

                            <div className="inputArea" id="OutputTextArea">
                                {/* <div class="button-container">
                                    
                                </div> */}
                                <textarea 
                                    className="text-area"
                                    id='output'
                                    placeholder='Get summary here...' 
                                    value={outputContent} 
                                    onChange={handleOutputChange} 
                                    required
                                    readOnly>   
                                </textarea>
                                <div className='bottom-div2'>
                                    <div className="feedback-buttons">
                                        <Tooltip title="Like" arrow>
                                            <button className='feedback-up' onClick={thumbsUp}><GoThumbsup size={19}/></button>
                                        </Tooltip>
                                        <Tooltip title="Dislike" arrow>
                                            <button className='feedback-down' onClick={thumbsDown}><GoThumbsdown size={19}/></button>
                                        </Tooltip>
                                    </div>

                                    <div className="export-button">
                                        <Tooltip title="Export" arrow>
                                            <button className='feedback-up' onClick={thumbsUp}><PiExport size={19}/></button>
                                        </Tooltip>
                                    </div>
                                    
                                    { shorten &&
                                        <Link to = "/Shortener">
                                            <button className="summarize-btn">
                                                <div className="summarize-overlap">
                                                    <div className="summarize">Shorten your URL</div>
                                                </div>
                                            </button>
                                        </Link>
                                    }
                                </div>
                                <Tooltip title="Copy" arrow>
                                    <button className='copy-button' onClick={copySummary}>{isCopied ? <FaCopy size={17}/> : <FaRegCopy size={17}/>}</button>
                                </Tooltip>
                                
                            </div>
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
