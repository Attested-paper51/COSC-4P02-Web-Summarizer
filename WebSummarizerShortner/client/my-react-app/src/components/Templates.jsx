import React, { useState } from 'react';
import { useEffect } from "react";
// import { Link } from 'react-router-dom';
import "./css/DashboardStyle.css";
import "./css/SummarizerStyle.css";
import "./css/SignUpStyle.css";
import { MdDeleteOutline } from "react-icons/md";
// import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
// Components
import Dropdown from "./Dropdown.js";
import DropdownItem from "./DropdownItem.js";
import NumberInputBasic, {QuantityInput} from "./NumberInput.js"; 

import DialogBox from '../components/DialogBox.js';

const Templates = () => {
    const [inputContent, setInputContent] = useState('');
    const [outputContent, setOutputContent] = useState('');

    const [open, setOpen] = useState(false);
    const [openEmptyInput, setOpenEmptyInput] = useState(false);
    const [openError, setOpenError] = useState(false);

    const [shorten, showShorten] = useState(false);
    const [isClicked, setClickedButton] = useState(0);
    const [isClicked2, setClickedButton2] = useState(0);
    const [isClicked3, setClickedButton3] = useState(0);

    const [wordCount, setWordCount] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);
    const [value, setValue] = useState(null);
    const [isPremium, setPremium] = useState(false);
    const userEmail = localStorage.getItem('email');

    const tone = ["Standard", "Formal", "Causal", "Sarcastic", "Aggressive", "Sympathetic"];
    const [selectedTone, setTone] = useState(tone[0]);
    const [selectedTone2, setTone2] = useState(tone[0]);
    const [selectedTone3, setTone3] = useState(tone[0]);

    const layout = ["Paragraph", "Bullet Points", "Numbered List"];
    const [selectedLayout, setLayout] = useState(layout[0]);
    const [selectedLayout2, setLayout2] = useState(layout[0]);
    const [selectedLayout3, setLayout3] = useState(layout[0]);

    const videoSetting = ["Full Video", "Timestamp"];
    const [selectedVideoSetting, setVideoSetting] = useState(videoSetting[0]);
    const [selectedVideoSetting2, setVideoSetting2] = useState(videoSetting[0]);
    const [selectedVideoSetting3, setVideoSetting3] = useState(videoSetting[0]);

    const [sliderValue, setSliderValue] = useState(1);
    const [sliderValue2, setSliderValue2] = useState(1);
    const [sliderValue3, setSliderValue3] = useState(1);


    const valuetext = (value) => {
        return `${value}`;
    }

    const changeSliderValue = (event) => {
        setSliderValue(event.target.value)
    }
    const changeSliderValue2 = (event) => {
        setSliderValue2(event.target.value)
    }
    const changeSliderValue3 = (event) => {
        setSliderValue3(event.target.value)
    }

    const toggleClicked = (buttonIndex) => {
        setClickedButton(buttonIndex)
        emptyTextContent()
        showShorten(false)
    }

    const toggleClicked2 = (buttonIndex) => {
        setClickedButton2(buttonIndex)
        emptyTextContent()
        showShorten(false)
    }

    const toggleClicked3 = (buttonIndex) => {
        setClickedButton3(buttonIndex)
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
    // useEffect (() => {
    //     // runs after every render
    //     const output = document.getElementById("output");
    //     if(outputContent !== '') {
    //         output.readOnly = false
    //     }
    //     else {
    //         output.readOnly = true
    //     }

    //     // conditions for showing the link to Url Shortener
    //     if((isClicked === 1 || isClicked === 2) && outputContent !== '') {
    //         showShorten(true)
    //     }   
    //     else if (isClicked == 0)
    //     {
    //         showShorten(false)
    //     }
    // })


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

    const handleToneChange2 = (item) => {
        setTone2(item)
    }
    const handleToneChange3 = (item) => {
        setTone3(item)
    }

    const handleLayoutChange = (item) => {
        setLayout(item)
    }
    const handleLayoutChange2 = (item) => {
        setLayout2(item)
    }
    const handleLayoutChange3 = (item) => {
        setLayout3(item)
    }

    const handleVideoSettingChange = (item) => {
        setVideoSetting(item)
    }
    const handleVideoSettingChange2 = (item) => {
        setVideoSetting2(item)
    }
    const handleVideoSettingChange3 = (item) => {
        setVideoSetting3(item)
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


    // function for handling text summarization
    const summarizeText = () => {
        fetch('/api/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputContent, type: isClicked }),
        })
        .then(response => response.json())
        .then(data => {

                setOutputContent(data.summary); // This line updates the output area
        })
        .catch(error => {
            showError('An error occurred while fetching the summary.');
        });
    };


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

    //for handling saving of template 1
    const handleClickSave  = async () => {
        var formality = selectedTone;
        var structure = selectedLayout;
        const email = localStorage.getItem('email');
        var wordcount = 0;
        
        if (sliderValue === 1) {
            wordcount = 50;
        }else if (sliderValue === 2) {
            wordcount = 100;
        }else if (sliderValue === 3){
            wordcount = 200;
        }
        var summ_type = "";
        var timestamp = "";
        if (isClicked === 0) {
            summ_type = "text";
        }else if (isClicked === 1) {
            summ_type = "website";
        }else if (isClicked === 2){
            summ_type = "video";
            timestamp = "{00:05,00:15}"
        }
        
        
        var templatename = "customTemplate1";

        try {
            const response = await fetch('http://localhost:5001/savetemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, formality, structure, 
                wordcount, summ_type, timestamp, templatename }),
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
        }



        }catch (error) {
            console.error('Error:', error.message);
        }
    }

    //for handling saving of template 2
    const handleClickSave2  = async () => {
        var formality = selectedTone2;
        var structure = selectedLayout2;
        const email = localStorage.getItem('email');
        var wordcount = 0;
        
        if (sliderValue2 === 1) {
            wordcount = 50;
        }else if (sliderValue2 === 2) {
            wordcount = 100;
        }else if (sliderValue2 === 3) {
            wordcount = 200;
        }
        var summ_type = "";
        var timestamp = "";
        if (isClicked2 === 0) {
            summ_type = "text";
        }else if (isClicked2 === 1) {
            summ_type = "website";
        }else if (isClicked2 === 2) {
            summ_type = "video";
            timestamp = "{00:05,00:15}"
        }
        
        
        var templatename = "customTemplate2";

        try {
            const response = await fetch('http://localhost:5001/savetemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, formality, structure, 
                wordcount, summ_type, timestamp, templatename }),
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
        }



        }catch (error) {
            console.error('Error:', error.message);
        }
    }

    //for handling saving of template 3
    const handleClickSave3  = async () => {
        var formality = selectedTone3;
        var structure = selectedLayout3;
        const email = localStorage.getItem('email');
        var wordcount = 0;
        
        if (sliderValue3 === 1) {
            wordcount = 50;
        }else if (sliderValue3 === 2) {
            wordcount = 100;
        }else if (sliderValue3 === 3) {
            wordcount = 200;
        }
        var summ_type = "";
        var timestamp = "";
        if (isClicked3 === 0) {
            summ_type = "text";
        }else if (isClicked3 === 1) {
            summ_type = "website";
        }else if (isClicked3 === 2) {
            summ_type = "video";
            timestamp = "{00:05,00:15}"
        }
        
        
        var templatename = "customTemplate3";

        try {
            const response = await fetch('http://localhost:5001/savetemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, formality, structure, 
                wordcount, summ_type, timestamp, templatename }),
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
        }



        }catch (error) {
            console.error('Error:', error.message);
        }
    }

    

return (

    <div className="templates-wrapper">
        
        <h1>Templates</h1>

        {/*------------------------- template one ------------------------------*/}

        <div className='template-div'>
            <div className='temp-heading'>
                <h3>Template 1</h3>
                <div className='save-reset-btns'>
                    <div className="save-custom-info">
                        {/**handle save for template 1 here */}
                        <button className='summarize-btn' onClick={handleClickSave}>
                            <div className="summarize-overlap">
                                <div className="summarize">Save</div>
                            </div>
                        </button>
                    </div>
                    <div className="reset-custom-info">
                        <button className='summarize-btn'>
                            <div className="summarize-overlap">
                                <div className="summarize">Reset</div>
                            </div>
                        </button>
                    </div>       
                </div>     
            </div>
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
                                        <NumberInputBasic/>
                                        :
                                        <QuantityInput/>
                                        {/* <textarea className="timestamp-textarea" name="endM" placeholder='Minutes'></textarea>
                                        :
                                        <textarea className="timestamp-textarea" name="endS" placeholder='Seconds'></textarea> */}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                    
            </div> 
        </div>

        {/*------------------------- template two ------------------------------*/}

        <div className='template-div'>
            <div className='temp-heading'>
                <h3>Template 2</h3>
                <div className='save-reset-btns'>
                    <div className="save-custom-info">
                        <button className='summarize-btn' onClick={handleClickSave2}>
                            <div className="summarize-overlap">
                                <div className="summarize">Save</div>
                            </div>
                        </button>
                    </div>
                    <div className="reset-custom-info">
                        <button className='summarize-btn'>
                            <div className="summarize-overlap">
                                <div className="summarize">Reset</div>
                            </div>
                        </button>
                    </div>       
                </div>     
            </div>
            <div class="button-container">
                <button 
                    className={`customSumBtn clamp-text ${isClicked2 === 0? 'clicked disabled-hover':''}`} 
                    onClick={() => toggleClicked2(0)}>Text</button>
                <button 
                    className={`customSumBtn ${isClicked2 === 1? 'clicked disabled-hover':''}`} 
                    onClick={() => toggleClicked2(1)}>Website URL</button>
                <button 
                    className={`customSumBtn ${isClicked2 === 2? 'clicked disabled-hover':''}`} 
                    onClick={() => toggleClicked2(2)}>Youtube URL</button>
            </div>
            <div className="premium-container">
                <div className="modes">
                    <div className="mode">
                        <p>Modes:</p>
                    </div>
                    <div className="dropdown-menus modes">
                        <div className="dropdown-menu">
                            <Dropdown
                                buttonText={selectedTone2}
                                content={<>
                                    {
                                        tone.map(item => 
                                            <DropdownItem
                                                key={item}
                                                onClick={() => handleToneChange2(item)}>
                                                    {`${item}`}
                                            </DropdownItem>)
                                    }
                                </>} 
                            />
                        </div>
                        <div className="dropdown-menu">
                            <Dropdown
                                buttonText={selectedLayout2}
                                content={<>
                                    {
                                        layout.map(item => 
                                            <DropdownItem
                                                key={item}
                                                onClick={() => handleLayoutChange2(item)}>
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
                                            value={sliderValue2}
                                            onChange={changeSliderValue2}
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
                        { isClicked2 == 2 &&
                            <div className="dropdown-menu">
                                <Dropdown
                                    buttonText={selectedVideoSetting2}
                                    content={<>
                                        {
                                            videoSetting.map(item => 
                                                <DropdownItem
                                                    key={item}
                                                    onClick={() => handleVideoSettingChange2(item)}>
                                                        {`${item}`}
                                                </DropdownItem>)
                                        }
                                    </>} 
                                />
                            </div>
                        }

                        { isClicked2 ==2 && selectedVideoSetting2 == videoSetting[1] &&
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
                                        <NumberInputBasic/>
                                        :
                                        <QuantityInput/>
                                        {/* <textarea className="timestamp-textarea" name="endM" placeholder='Minutes'></textarea>
                                        :
                                        <textarea className="timestamp-textarea" name="endS" placeholder='Seconds'></textarea> */}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                    
            </div> 
        </div>

        {/*------------------------- template three ------------------------------*/}


        <div className='template-div'>
            <div className='temp-heading'>
                <h3>Template 3</h3>
                <div className='save-reset-btns'>
                    <div className="save-custom-info">
                        <button className='summarize-btn' onClick={handleClickSave3}>
                            <div className="summarize-overlap">
                                <div className="summarize">Save</div>
                            </div>
                        </button>
                    </div>
                    <div className="reset-custom-info">
                        <button className='summarize-btn'>
                            <div className="summarize-overlap">
                                <div className="summarize">Reset</div>
                            </div>
                        </button>
                    </div>       
                </div>     
            </div>
            <div class="button-container">
                <button 
                    className={`customSumBtn clamp-text ${isClicked3 === 0? 'clicked disabled-hover':''}`} 
                    onClick={() => toggleClicked3(0)}>Text</button>
                <button 
                    className={`customSumBtn ${isClicked3 === 1? 'clicked disabled-hover':''}`} 
                    onClick={() => toggleClicked3(1)}>Website URL</button>
                <button 
                    className={`customSumBtn ${isClicked3 === 2? 'clicked disabled-hover':''}`} 
                    onClick={() => toggleClicked3(2)}>Youtube URL</button>
            </div>
            <div className="premium-container">
                <div className="modes">
                    <div className="mode">
                        <p>Modes:</p>
                    </div>
                    <div className="dropdown-menus modes">
                        <div className="dropdown-menu">
                            <Dropdown
                                buttonText={selectedTone3}
                                content={<>
                                    {
                                        tone.map(item => 
                                            <DropdownItem
                                                key={item}
                                                onClick={() => handleToneChange3(item)}>
                                                    {`${item}`}
                                            </DropdownItem>)
                                    }
                                </>} 
                            />
                        </div>
                        <div className="dropdown-menu">
                            <Dropdown
                                buttonText={selectedLayout3}
                                content={<>
                                    {
                                        layout.map(item => 
                                            <DropdownItem
                                                key={item}
                                                onClick={() => handleLayoutChange3(item)}>
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
                                            value={sliderValue3}
                                            onChange={changeSliderValue3}
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
                        { isClicked3 == 2 &&
                            <div className="dropdown-menu">
                                <Dropdown
                                    buttonText={selectedVideoSetting3}
                                    content={<>
                                        {
                                            videoSetting.map(item => 
                                                <DropdownItem
                                                    key={item}
                                                    onClick={() => handleVideoSettingChange3(item)}>
                                                        {`${item}`}
                                                </DropdownItem>)
                                        }
                                    </>} 
                                />
                            </div>
                        }

                        { isClicked3 ==2 && selectedVideoSetting3 == videoSetting[1] &&
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
                                        <NumberInputBasic/>
                                        :
                                        <QuantityInput/>
                                        {/* <textarea className="timestamp-textarea" name="endM" placeholder='Minutes'></textarea>
                                        :
                                        <textarea className="timestamp-textarea" name="endS" placeholder='Seconds'></textarea> */}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                    
            </div> 
        </div>


    </div>


  );
}

export default Templates;