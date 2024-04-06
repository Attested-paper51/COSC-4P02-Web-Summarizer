import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "./css/SummarizerStyle.css";
import "./css/SignUpStyle.css";
import "./css/Dropdown.css";
import "./css/DropdownButton.css";
import '../App.css'

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
import { FaChevronUp } from "react-icons/fa6";
// Components
import DialogBox from '../components/DialogBox.js';
import Dropdown from "./Dropdown.js";
import DropdownItem from "./DropdownItem.js";
import NumberInputBasic, {QuantityInput} from "./NumberInput.js"; 
import { useTheme } from './ThemeContext.js'



const Summarizer = () => {

    const { darkMode } = useTheme();

    const [inputContent, setInputContent] = useState('');
    const [outputContent, setOutputContent] = useState('');

    const [open, setOpen] = useState(false);
    const [openEmptyInput, setOpenEmptyInput] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openTemplates, setOpenTemplates] = useState(false);

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

    const templates = ["Load Template", "Template 1", "Template 2", "Template 3"];
    const [selectedTemplate, setTemplate] = useState(templates[0]);

    const saveTemplates = ["Save Template", "Template 1", "Template 2", "Template 3"];
    const [selectedSaveTemplate, setSaveTemplate] = useState(saveTemplates[0]);


    const [sliderValue, setSliderValue] = useState(1);

    const [startHour, setStartHour] = useState("HH");
    const [startMin, setStartMin] = useState("MM");
    const [endHour, setEndHour] = useState("HH");
    const [endMin, setEndMin] = useState("MM");

    const email = localStorage.getItem('email');

    const navigate = useNavigate();

    const valuetext = (value) => {
        return `${value}`;
    }

    const changeSliderValue = (event) => {
        setSliderValue(event.target.value)
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
        //navigate("/Shortener", {state: { inputContent: inputContent }});
        //alert(sliderValue)
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

    const handleTemplateChange = (item) => {
        console.log("item: ",item);
        setTemplate(item);

        handleTemplateFetch(item);
    }

    const handleSaveTemplateChange = (item) => {
        setSaveTemplate(item);
        //handleTemplateFetch(item);
    }

    const checkEmptyInput = () => {
        //const input = document.getElementById("input");
        if(inputContent === '') {
            setOpenEmptyInput(true)
        }
        else {
            summarizeText();
        }
    }

    // for closing Empty Error Dialog Box
    const handleEmptyClose = () => {
        setOpenEmptyInput(false)
    }
    // closes Dialog Box
    const handleEmptyConfirm = () => {
        handleEmptyClose()
    }

    // for closing Error Dialog Box
    const handleErrorClose = () => {
        setOpenError(false)
    }
    // closes Dialog Box
    const handleErrorConfirm = () => {
        handleErrorClose()
    }

    // for opening Dialog Box
    const handleOpenTemplates = () => {
        setOpenTemplates(true)
    }
    // for closing Error Dialog Box
    const handleTemplateClose = () => {
        setOpenTemplates(false)
    }
    // closes Dialog Box
    const handleTemplateConfirm = () => {
        handleTemplateClose()
    }

    const transferLink = () => {
        navigate("/Shortener", {state: { inputContent: inputContent }});
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

    //--------------------------------BACKEND----------------------------------------
    // for error handling
    const [errorMessage, setErrorMessage] = useState('An error has occurred');
    // for showing the error
    const showError = (message) => {
        setErrorMessage(message)
        setOpenError(true)
    }
    

    const addToHistory = async (input,output) => {

        try {
            const response = await fetch('http://localhost:5001/addsummarized', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input, output, email}),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
            }

        } catch (error) {
            console.log(error)
        }

    };


// State to manage loading dialog visibility
const [isLoading, setIsLoading] = useState(false);

const summarizeText = () => {
    // Show loading dialog
    setIsLoading(true);

    fetch('http://127.0.0.1:5000/api/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            key: 'frontend',
            input: inputContent, 
            type: isClicked, 
            tone: selectedTone,
            style: selectedLayout,
            length: sliderValue,
            option: selectedVideoSetting,
        }),
    })
    .then(response => {
        // Hide loading dialog
        setIsLoading(false);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        setOutputContent(data.summary);
                //add to history
                //addToHistory(inputContent,data.summary,email);  //this needs to be associated with a button to 'save to history'
    })
    .catch(error => {
        setIsLoading(false); // Ensure loading dialog is hidden on error
        setErrorMessage(error.message || 'An error occurred while fetching the summary.');
        setOpenError(true);
    });
};

    //function to pull the values stored in the database for the template
    const handleTemplateFetch = async (item) => {
        setTemplate(item);
        //do if so that u can say template 1 = customTemplate1 etc.
        var templatename;
        if (item === templates[1]) {
            templatename = "customTemplate1";
        }else if (item === templates[2]) {
            templatename = "customTemplate2";
        }else if (item === templates[3]) {
            templatename = "customTemplate3";
        }
        //console.log("Selected template:",selectedTemplate);
        //console.log("item:",item);
        //console.log("templateNameToFetch:",templatename);
        try {
    
            // Make a POST request to the Flask backend
            const response = await fetch('http://localhost:5001/gettemplate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, templatename}),
            });
    
            if (response.ok) {
                const result = await response.json();
                //result should include all the flags I want
                if (result.summtype === 'text') {
                    setClickedButton(0);
                }else if (result.summtype === 'website') {
                    setClickedButton(1);
                }else if (result.summtype === 'video') {
                    setClickedButton(2);
                    if (result.timestamps === 'full') {
                        setVideoSetting(videoSetting[0]);
                    }else {
                        setVideoSetting(videoSetting[1]);
                        //timestamp thing
                        const [startTime, endTime] = result.timestamps.split(',');
                        const [startHour, startMin] = startTime.split(':');
                        const [endHour, endMin] = endTime.split(':');
                        setStartHour(parseInt(startHour));
                        setStartMin(parseInt(startMin));
                        setEndHour(parseInt(endHour));
                        setEndMin(parseInt(endMin));
                        
                    }
                    
                }else {
                    setClickedButton(0);
                }

                if (result.formality != null) {
                    setTone(result.formality);
                }else {
                    setTone(tone[0]);
                }

                if (result.structure != null) {
                    setLayout(result.structure);
                }else {
                    setLayout(layout[0]);
                }

                if (result.length === 'short') {
                    setSliderValue(1);
                }else if (result.length === 'medium') {
                    setSliderValue(2);
                }else if (result.length === 'long') {
                    setSliderValue(3);
                }else {
                    setSliderValue(1);
                }

                

            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    
      };

      //for handling saving of any template
    const handleClickSave  = async (templatenumber) => {
        var formality = selectedTone;
        var structure = selectedLayout;
        const email = localStorage.getItem('email');
        var wordcount = 0;
        var length;
        //console.log("template to save: ",templatenumber);
        
        
        if (sliderValue === 1) {
            wordcount = 50;
            length = 'short';
        }else if (sliderValue === 2) {
            wordcount = 100;
            length = 'medium';
        }else if (sliderValue === 3){
            wordcount = 200;
            length = 'long';
        }
        var summ_type = "";
        var timestamp = "";
        if (isClicked === 0) {
            summ_type = "text";
        }else if (isClicked === 1) {
            summ_type = "website";
        }else if (isClicked === 2){
            summ_type = "video";
            if (selectedVideoSetting === videoSetting[1]) {
                if (startHour === "HH" || startMin === "MM" || 
                endHour === "HH" || endMin === "MM") {
                    //display timestamp error
                    console.log("hey, change the values dude");
                    return;
                }else{
                    var start = (startHour*60)+startMin;
                    var end = (endHour*60)+endMin;
                    if (end < start ) {
                        //display invalid timestamp error
                        console.log("how can u end before u start, dummy");
                        return;
                    }
                    timestamp = `${startHour}:${startMin},${endHour}:${endMin}`;
                }
                
            }else {
                timestamp = "full"
            }
            
        }
        var templatename;
        if (templatenumber === templates[1]) {
            templatename = "customTemplate1";
        }else if (templatenumber === templates[2]) {
            templatename = "customTemplate2";
        }else if (templatenumber === templates[3]) {
            templatename = "customTemplate3";
        }

        //console.log("templatename saving: ",templatename);
        

        try {
            const response = await fetch('http://localhost:5001/savetemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, formality, structure, 
                wordcount, summ_type, timestamp, length, templatename }),
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
        }



        }catch (error) {
            console.error('Error:', error.message);
        }
    }


    //export button handling, for downloading json file
    const exportJSON = () => {
        // Create a JSON object with the input and summarized text
        const data = {
            input: inputContent, // Assuming you have the original input stored in inputContent
            summary: outputContent
        };


        // Convert the JSON object to a string
        const jsonString = JSON.stringify(data);

        // Create a Blob from the JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Create a URL for the blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element and trigger a download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'summary.json'; // Filename for the downloaded file
        document.body.appendChild(a); // Append the anchor to the document
        a.click(); // Trigger the download
        document.body.removeChild(a); // Clean up

    }

    

    return (
        <div className={`wrapper ${darkMode ? 'summarizer-dark' : 'summarizer-light'}`}>
            <div className="in-wrapper-sum">
                <h2 className="section-header-sum">Summarizer</h2>
                <div className="summarizer-container">
                    <div className="centered-Div">
                        <div class="button-container">
                            <button 
                                className={`customSumBtn clamp-text ${isClicked === 0? `${darkMode ? 'clicked-dark disabled-hover-dark' : 'clicked-light disabled-hover-light'}` : `${darkMode ? 'not-clicked-dark' : 'not-clicked-light'}`} ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} 
                                onClick={() => toggleClicked(0)}>Text</button>
                            <button 
                                className={`customSumBtn ${isClicked === 1? `${darkMode ? 'clicked-dark disabled-hover-dark' : 'clicked-light disabled-hover-light'}` : `${darkMode ? 'not-clicked-dark' : 'not-clicked-light'}`} ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} 
                                onClick={() => toggleClicked(1)}>Website URL</button>
                            <button 
                                className={`customSumBtn ${isClicked === 2? `${darkMode ? 'clicked-dark disabled-hover-dark' : 'clicked-light disabled-hover-light'}` : `${darkMode ? 'not-clicked-dark' : 'not-clicked-light'}`} ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`}  
                                onClick={() => toggleClicked(2)}>Youtube URL</button>
                        </div>

                        <div className="main-content">
                            {/* {userEmail && ( */}

                            <div className={`premium-container ${darkMode ? 'premium-dark' : 'premium-light'}`}>
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
                                                            value={sliderValue}
                                                            onChange={changeSliderValue}
                                                            defaultValue={value}
                                                            getAriaValueText={valuetext}
                                                            // valueLabelDisplay="auto"
                                                            shiftStep={0}
                                                            step={1}
                                                            marks
                                                            min={1}
                                                            max={3}
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

                                        { isClicked == 2 && selectedVideoSetting == videoSetting[1] &&
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
                                                        <NumberInputBasic 
                                                        value={startHour} 
                                                        //placeholder = "HH"
                                                        onChange={setStartHour}
                                                        darkMode={darkMode} />
                                                        :
                                                        <QuantityInput 
                                                        value={startMin}
                                                        //placeholder = "MM"
                                                        onChange={setStartMin}
                                                        darkMode={darkMode}/>
                                                        {/* <textarea className="timestamp-textarea" id="startS" name="startS" placeholder='Seconds'></textarea> */}
                                                    </div>
                                                </div>
            
                                                <div className="end">
                                                    End Time:
                                                    <div className="end-time">
                                                        <NumberInputBasic 
                                                            value={endHour} 
                                                            //placeholder = "HH"
                                                            onChange={setEndHour}
                                                            darkMode={darkMode} />
                                                            :
                                                            <QuantityInput 
                                                            value={endMin}
                                                            
                                                            //placeholder = "MM"
                                                            onChange={setEndMin}
                                                            darkMode={darkMode}/>
                                                        {/* <textarea className="timestamp-textarea" name="endM" placeholder='Minutes'></textarea>
                                                        :
                                                        <textarea className="timestamp-textarea" name="endS" placeholder='Seconds'></textarea> */}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        </div>
                                    </div>
                                    <div className="template-config-buttons">
                                        <div className="dropdown-menu">
                                            <Dropdown
                                                buttonText={selectedSaveTemplate}
                                                content={<>
                                                    {
                                                        saveTemplates.slice(1).map(item => 
                                                            <DropdownItem
                                                                key={item}
                                                                onClick={() => handleClickSave(item)}>
                                                                    {`${item}`}
                                                            </DropdownItem>)
                                                    }
                                                </>} 
                                            />
                                        </div>
                                        {/* <div className="save-template">
                                            <div className="dropdown-menu">
                                                <div className="dropdown">
                                                    <button className="dropdown-btn ddm-light save-button" onClick={handleOpenTemplates}>
                                                        Save Settings */}
                                                        {/* <span className="toggle-icon"> 
                                                            <FaChevronUp/>
                                                        </span> */}
                                                    {/* </button>
                                                </div> */}
                                                {/* <button className='summarize-btn'>
                                                    <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                                        <div className={`summarize small-text ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Save settings</div>
                                                    </div>
                                                </button> */}
                                            {/* </div>
                                        </div> */}
                                        {/* <div className="save-custom-info">
                                            <button className='summarize-btn'>
                                                <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                                    <div className={`summarize small-text ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Load settings</div>
                                                </div>
                                            </button>
                                        </div> */}
                                        <div className="dropdown-menu">
                                            <Dropdown
                                                buttonText={selectedTemplate}
                                                content={<>
                                                    {
                                                        templates.slice(1).map(item => 
                                                            <DropdownItem
                                                                key={item}
                                                                onClick={() => handleTemplateChange(item)}>
                                                                    {`${item}`}
                                                            </DropdownItem>)
                                                    }
                                                </>} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* </div>)} */}
                                <div className="text">
                                    <div className="inputArea">
                                        { isClicked == 0 &&
                                            <textarea
                                                className={`text-area ${darkMode ? 'ta-dark' : 'ta-light'}`}
                                                id='inputText' 
                                                placeholder='Enter or paste your text and click "Summarize."' 
                                                value={inputContent} 
                                                onChange={handleInputChange} 
                                                required>    
                                            </textarea>
                                        }
                                        { isClicked == 1 &&
                                            <textarea
                                                className={`text-area ${darkMode ? 'ta-dark' : 'ta-light'}`}
                                                id='inputURL' 
                                                placeholder='Enter or paste your URL and click "Summarize."' 
                                                value={inputContent} 
                                                onChange={handleInputChange} 
                                                required>    
                                            </textarea>
                                        }
                                        { isClicked == 2 &&
                                            <textarea
                                                className={`text-area ${darkMode ? 'ta-dark' : 'ta-light'}`}
                                                id='inputYTURL' 
                                                placeholder='Enter or paste your Youtube URL and click "Summarize."' 
                                                value={inputContent} 
                                                onChange={handleInputChange} 
                                                required>    
                                            </textarea>
                                        }

                                    { inputContent &&
                                        (<Tooltip title="Delete" arrow>
                                            <button className={`delete-button ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`}
                                                onClick={handleOpen}><FaRegTrashCan size={18} />
                                            </button>
                                        </Tooltip>)
                                    }
                                    <div className={`bottom-div1 ${darkMode ? 'bd-dark' : 'bd-light'}`}>
                                        <div className="word-count">
                                            { inputContent && wordCount >= 1 && wordCount < 126 ? 
                                                (<Tooltip title={inputContent.length == 1? `${inputContent.length} Character`: `${inputContent.length} Characters`} arrow>
                                                    <div className="word-cnt-div">{wordCount == 1? `${wordCount} Word`: `${wordCount} Words`}</div>
                                                </Tooltip>) : wordCount >= 126 && !userEmail ?
                                                <div className="get-premium">
                                                    <div><Link to = "/Login" className="link-blue">Get Premium</Link> for unlimited words.</div>
                                                    <div>{wordCount}/125 Words</div>    
                                                </div> : 
                                                (<Tooltip title={inputContent.length == 1? `${inputContent.length} Character`: `${inputContent.length} Characters`} arrow>
                                                    <div className="word-cnt-div">{wordCount == 1? `${wordCount} Word`: `${wordCount} Words`}</div>
                                                </Tooltip>)
                                            }
                                        </div>

                                        { wordCount > 125? 
                                            <Tooltip title="Over the word limit" arrow>
                                                <button className='summarize-btn button-disabled' disabled>
                                                    <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                                        <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Summarize</div>
                                                    </div>
                                                </button>
                                            </Tooltip> :
                                            <button className='summarize-btn' onClick={checkEmptyInput}>
                                                <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                                    <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Summarize</div>
                                                </div>
                                            </button>
                                        }
                                    </div>
                                </div>

                                <div className={`inputArea ${darkMode ? 'ota-dark' : 'ota-light'}`} id="OutputTextArea">
                                    {/* <div class="button-container">
                                        
                                    </div> */}
                                    <textarea 
                                        className={`text-area ${darkMode ? 'ta-dark' : 'ta-light'}`}
                                        id='output'
                                        placeholder='Get summary here...' 
                                        value={outputContent} 
                                        onChange={handleOutputChange} 
                                        required
                                        readOnly>   
                                    </textarea>
                                    <div className={`bottom-div2 ${darkMode ? 'bd-dark' : 'bd-light'}`}>
                                        <div className="feedback-buttons">
                                            <Tooltip title="Like" arrow>
                                                <button className={`feedback-up ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} onClick={thumbsUp}><GoThumbsup size={19}/></button>
                                            </Tooltip>
                                            <Tooltip title="Dislike" arrow>
                                                <button className={`feedback-down ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} onClick={thumbsDown}><GoThumbsdown size={19}/></button>
                                            </Tooltip>
                                        </div>

                                        <div className="export-button">
                                            <Tooltip title="Export" arrow>
                                            <button className={`feedback-up ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} onClick={exportJSON} disabled={!outputContent}><PiExport size={19}/></button>
                                            </Tooltip>
                                        </div>
                                        
                                        { shorten &&
                                            <button className="summarize-btn" onClick={transferLink}>
                                                <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                                    <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Shorten your URL</div>
                                                </div>
                                            </button>
                                        }

                                        { userEmail &&
                                            <button className="summarize-btn" onClick={transferLink}>
                                                <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                                    <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Save Summary</div>
                                                </div>
                                            </button>
                                        }
                                    </div>
                                    <Tooltip title="Copy" arrow>
                                        <button className={`copy-button ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} onClick={copySummary}>{isCopied ? <IoClipboard size={17}/> : <IoClipboardOutline size={17}/>}</button>
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
                showCancelButton={true}
                confirmText={"Continue"}
                onConfirm={handleConfirm}
                />
                <DialogBox 
                open={openEmptyInput} 
                onClose={handleEmptyClose}
                title={"Error"}
                content={"Please enter some text to summarize."}
                showCancelButton={false}
                confirmText={"Continue"}
                onConfirm={handleEmptyConfirm}
                />
                <DialogBox 
                open={openError} 
                onClose={handleErrorClose}
                title={"Error"}
                content={errorMessage}
                showCancelButton={false}
                confirmText={"Continue"}
                onConfirm={handleErrorConfirm}
                />
                <DialogBox 
                open={openTemplates} 
                onClose={handleTemplateClose}
                title={"Templates"}
                content={
                    <div className="template-buttons">
                        <button className='summarize-btn' onClick={() => handleClickSave(1)}>
                            <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Template 1</div>
                            </div>
                        </button> 
                        <button className='summarize-btn' onClick={() => handleClickSave(2)}>
                            <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Template 2</div>
                            </div>
                        </button> 
                        <button className='summarize-btn' onClick={() => handleClickSave(3)}>
                            <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Template 3</div>
                            </div>
                        </button> 
                    </div>
                }
                showCancelButton={false}
                confirmText={"Continue"}
                onConfirm={handleTemplateConfirm}
                />
            </div>
        </div>
    );
}

export default Summarizer;
