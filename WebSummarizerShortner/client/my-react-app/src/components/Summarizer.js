import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "./css/SummarizerStyle.css";
import "./css/SignUpStyle.css";
import "./css/Dropdown.css";
import "./css/DropdownButton.css";
import '../App.css'

// Icons
import { GoThumbsdown } from "react-icons/go";
import { GoThumbsup } from "react-icons/go";
import { IoClipboardOutline } from "react-icons/io5";
import { IoClipboard } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { PiExport } from "react-icons/pi";

// Components
import DialogBox from '../components/DialogBox.js';
import Dropdown from "./Dropdown.js";
import DropdownItem from "./DropdownItem.js";
import NumberInputBasic, { QuantityInput } from "./NumberInput.js";
import { useTheme } from '../context/ThemeContext.js'

/**
 * Summarizer includes all the logic for summarizing a given text, website link or youtube link. 
 * @returns Summarizer page
 */
const Summarizer = () => {

    const { darkMode } = useTheme();

    const [inputContent, setInputContent] = useState('');
    const [outputContent, setOutputContent] = useState('');
    const [shouldDetectChanges, setShouldDetectChanges] = useState(false);

    const [openError, setOpenError] = useState(false);

    const [shorten, showShorten] = useState(false);
    const [isClicked, setClickedButton] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);
    const [value] = useState(null);

    // get state from the sessionStorage
    const storedState = sessionStorage.getItem('URLState');
    // Parse the stored state from it
    const parsedState = storedState ? JSON.parse(storedState) : null;

    const tone = ["Standard", "Formal", "Causal", "Sarcastic", "Aggressive", "Sympathetic"];
    const [selectedTone, setTone] = useState(tone[0]);

    const layout = ["Paragraph", "Bullet Points", "Numbered List"];
    const [selectedLayout, setLayout] = useState(layout[0]);

    const citationType = ["No Citation", "MLA Citation", "APA Citation", "Chicago Citation"];
    const [selectedCitationType, setCitationType] = useState(citationType[0]);

    const videoSetting = ["Full Video", "Timestamp"];
    const [selectedVideoSetting, setVideoSetting] = useState(videoSetting[0]);

    const templates = ["Load Template", "Template 1", "Template 2", "Template 3"];
    const [selectedTemplate, setTemplate] = useState(templates[0]);

    const saveTemplates = ["Save Template", "Template 1", "Template 2", "Template 3"];
    const [selectedSaveTemplate] = useState(saveTemplates[0]);

    const sliderLength = ["short", "medium", "long"];
    const [sliderValue, setSliderValue] = useState(1);

    const [startHour, setStartHour] = useState();
    const [startMin, setStartMin] = useState();
    const [endHour, setEndHour] = useState();
    const [endMin, setEndMin] = useState();

     // for error handling
     const [errorMessage, setErrorMessage] = useState('An error has occurred');
     const [SaveSummary, setSaveSummary] = useState('Save Summary');
     const [isSaveClicked, setSaveClicked] = useState(false);
     const [savedContent, setSavedContent] = useState('');

    const email = localStorage.getItem('email');

    //Dialog box for error messages
    const [dialogConfig, setDialogConfig] = useState({
        open: false,
        onClose: null,
        title: "",
        content: "",
        showCancelButton: false,
        showConfirmButton: false,
        confirmText: "",
        onConfirm: null,
    });

    const openDialog = (config) => {
        setDialogConfig({ ...config, open: true })
    }

    const handleClose = () => {
        setDialogConfig(prevState => ({ ...prevState, open: false }))
    }

    const defaultConfirm = () => {
        handleClose()
    }

    const valuetext = (value) => {
        return `${value}`
    }

    const changeSliderValue = (event) => {
        setSliderValue(event.target.value)
    }

    const toggleClicked = (buttonIndex) => {
        if(isClicked !== buttonIndex)
        {
            setClickedButton(buttonIndex)
            emptyTextContent()
            showShorten(false)
            setTemplate(templates[0])
        }
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

    //useEffect to keep track of the wordcount when a user is typing in the input field
    useEffect(() => {

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        // set a timeout of 200 miliseconds - then update the word count
        const id = setTimeout(() => {
            // updates word count
            if(inputContent.trim().length === 0) {
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
    useEffect(() => {
        // runs after every render
        const output = document.getElementById("output");
        if (outputContent !== '') {
            output.readOnly = false
        }
        else {
            output.readOnly = true
        }

        // conditions for showing the link to Url Shortener
        console.log("************************")
        console.log(isClicked)
        console.log(outputContent)
        if ((isClicked === 1 || isClicked === 2) && outputContent !== '') {
            console.log("SHORTEN IS TRUE")
            showShorten(true)
        }   
        else if (isClicked === 0)
        {
            showShorten(false)
        }
    }, [outputContent,isClicked])

    //Detects whether the output has changed and if it has it will allow the user to save the summary again
    useEffect(() => {
        if (shouldDetectChanges) {
            if (outputContent !== savedContent)
            {
                console.log("outputContent has changed:", outputContent);
                setSaveClicked(false)
                setSaveSummary("Save Summary")
                setShouldDetectChanges(false)
            }
        }
    },[shouldDetectChanges,outputContent,savedContent]);

    //Logic to allow for transferring the URL to the shortener
    useEffect (() => {
        // detects the condition of state transfer
        if (parsedState && parsedState.action === 'PUSH') {
            if (String(window.performance.getEntries()[0].type) === "navigate") {
                toggleClicked(1);
                setInputContent(parsedState.URL)
                //console.log(parsedState)
                //console.log(sessionStorage)
                //JSON.parse(sessionStorage.getItem('URLState')).action = ''
                //parsedState.action = ''
            }
            else if (String(window.performance.getEntries()[0].type) === "reload") {
                setInputContent("")
            }
            //console.log("push")
        } else {
            //setInputContent("pop function")
            //console.log("pop")
        }
    },[]);



    // empties input and output
    const emptyTextContent = () => {
        setInputContent('');
        setOutputContent('');
    }

    // empties content and closes Dialog Box
    const handleDeleteConfirm = () => {
        emptyTextContent()
        showShorten(false)
        handleClose()
    }

    // thumbsUp makes a fetch to the server to increment the number of thumbs up by 1 when the button is clicked
    const thumbsUp = async () => {
        try {
            //const response = await fetch('https://4p02shortify.com:5001/thumbsup', { //Server use only
            const response = await fetch('http://localhost:5001/thumbsup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ }),
            });
            if (!response.ok) {
                throw new Error('Failed to thumbs up.');
            }
            console.log('Thumbs up successful!');

        }catch (error) {
            console.log(error)
        }
        
    }
    // thumbsDown makes a fetch to the server to increment the number of thumbs down by 1 when the button is clicked
    const thumbsDown = async () => {
        try {
            //const response = await fetch('https://4p02shortify.com:5001/thumbsdown', { //Server use only
            const response = await fetch('http://localhost:5001/thumbsdown', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ }),
            });
            if (!response.ok) {
                throw new Error('Failed to thumbs down.');
            }
            console.log('Thumbs down successful!');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const [isCopied, setCopy] = useState(false);
    //Logic for copying the summary
    const copySummary = () => {
        navigator.clipboard.writeText(outputContent)
        setCopy(true)
        setTimeout(() => {
            setCopy(false);
        }, 3000); // Reverts back to 'Submit' after 3 seconds
    }

    const handleToneChange = (item) => {
        setTone(item)
    }

    const handleLayoutChange = (item) => {
        setLayout(item)
    }

    const handleCitationChange = (item) => {
        setCitationType(item)
    }

    const handleVideoSettingChange = (item) => {
        setVideoSetting(item)
    }

    const handleTemplateChange = (item) => {
        setTemplate(item)
        handleTemplateFetch(item)
    }

    const handleSaveTemplateChange = async (item) => {
        
        const isTaken = await checkIfTemplateSlotTaken(item);
        //if it is taken
        if (isTaken) {
            //console.log("so then result.length is not null.");
            openDialog({
                title: "Warning!",
                content: "Warning: This template slot already exists. Overwriting this template will replace its current settings. Are you sure you want to proceed?",
                showCancelButton: true,
                showConfirmButton: true,
                confirmText: "Continue",
                onClose: handleClose,
                onConfirm: handleFullTemplateAlertConfirm
            })
        }else {
            handleClickSave(item);
        }
    }

    // Confirm function for template Dialog Box
    const handleFullTemplateAlertConfirm = () => {
        //console.log("template to save: " + selectedSaveTemplate);

        //save the selected template
        handleClickSave(selectedSaveTemplate)
        //close the dialog box
        handleClose()
        //handleFullTemplateAlertClose();
    }

    // For closing Multiple Error Dialog Box
    const handleErrorClose = () => {
        setOpenError(false)
    }
    // Confirm function for Multiple Error Dialog Box
    const handleErrorConfirm = () => {
        handleErrorClose()
    }

    //Logic for if a user attempts to summarize empty content; which will display an error, otherwise it will summarize
    const checkEmptyInput = () => {
        if(inputContent === '') {
            openDialog({
                title: "Error",
                content: "Please enter some text to summarize.",
                showCancelButton: false,
                showConfirmButton: true,
                confirmText: "Continue",
                onClose: handleClose,
                onConfirm: defaultConfirm,
            })
        }
        else {
            summarizeText();
        }
    }
    //Transferring the link to the shortener page
    const transferLink = () => {
        const action = 'PUSH';
        const state = { action, inputContent };
        sessionStorage.setItem('state', JSON.stringify(state));
        //navigate("/Shortener", {state: { action:'PUSH', inputContent }});
    }


   

    //adding a summary and input content to history
    const addToHistory = async () => {
        
        if (inputContent === '') {
            setErrorMessage('The input field is blank; please input something to generate a summary.');
            setOpenError(true);
            return;
        }else if (outputContent === '') {
            setErrorMessage('Click "Summarize" to obtain a summary, which you can then save.');
            setOpenError(true);
            return;
        }

        try {
            //const response = await fetch('https://4p02shortify.com:5001/addsummarized', { //Server use only
            const response = await fetch('http://localhost:5001/addsummarized', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: inputContent, output: outputContent, email }),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.message === "Summary history is full. Please delete a previous entry.") {
                    setDialogConfig({
                        open: true,
                        title: "Error",
                        content: result.message,
                        showCancelButton: false,
                        showConfirmButton: true,
                        confirmText: "OK",
                        onConfirm: () => setDialogConfig(prev => ({ ...prev, open: false })),
                    });
                } else {
                    setDialogConfig({
                        open: true,
                        title: "Success",
                        content: "Summary saved successfully!",
                        showCancelButton: false,
                        showConfirmButton: true,
                        confirmText: "OK",
                        onConfirm: () => setDialogConfig(prev => ({ ...prev, open: false })),
                    });
                    setSaveSummary('Saved Summary!')
                    setSaveClicked(true)
                    setSavedContent(outputContent)
                    setShouldDetectChanges(true)
                    //setTimeout(() => setSaveSummaryText('Save Summary'), 3000); // Optionally reset the button text after some time
                }
            }
        } catch (error) {
            setDialogConfig({
                open: true,
                title: "Error",
                content: "Failed to save summary.",
                showCancelButton: false,
                showConfirmButton: true,
                confirmText: "OK",
                onConfirm: () => setDialogConfig(prev => ({ ...prev, open: false })),
            });
            console.error('Error:', error);
        }

    };


// State to manage loading dialog visibility
const [isLoading, setIsLoading] = useState(false);

//summarizeText will make a fetch call to the backend to summarize the given input, whether text, website or YouTube
const summarizeText = () => {
    // Show loading dialog
    setIsLoading(true);
     // Provide default values if startHour, startMin, endHour, or endMin are undefined or empty strings
     const defaultHour = 0;
     const defaultMin = 0;
     const sanitizedStartHour = startHour || defaultHour;
     const sanitizedStartMin = startMin || defaultMin;
     const sanitizedEndHour = endHour || defaultHour;
     const sanitizedEndMin = endMin || defaultMin;
    

    
    fetch('http://127.0.0.1:5000/api/summarize', {
    //fetch('https://4p02shortify.com:5000/api/summarize', { //For server use only
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
            length: sliderLength[sliderValue],
            citation: selectedCitationType,
            option: selectedVideoSetting,
            startTime: `${sanitizedStartHour}:${sanitizedStartMin}`,
            endTime: `${sanitizedEndHour}:${sanitizedEndMin}`
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
        setSaveSummary('Save Summary');
        setSaveClicked(false);
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
        
        var templatename;
        if (item === templates[1]) {
            templatename = "customTemplate1";
        }else if (item === templates[2]) {
            templatename = "customTemplate2";
        } else {
            templatename = "customTemplate3";
        }
        try {

            // Make a POST request to the Flask backend
            const response = await fetch('http://localhost:5001/gettemplate', {
            //const response = await fetch('https://4p02shortify.com:5001/gettemplate', { //For server use only
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, templatename }),
            });

            if (response.ok) {
                const result = await response.json();
                
                if (result.summtype === 'text') {
                    setClickedButton(0);
                } else if (result.summtype === 'website') {
                    setClickedButton(1);
                    if (result.citation === 'none') {
                        setCitationType(citationType[0]);
                    }else if (result.citation === 'mla') {
                        setCitationType(citationType[1]);
                    }else if (result.citation === 'apa') {
                        setCitationType(citationType[2]);
                    }else if (result.citation === 'chicago') {
                        setCitationType(citationType[3]);
                    }
                }else if (result.summtype === 'video') {
                    setClickedButton(2);
                    if (result.timestamps === 'full') {
                        setVideoSetting(videoSetting[0]);
                    } else {
                        setVideoSetting(videoSetting[1]);
                        //timestamps
                        const [startTime, endTime] = result.timestamps.split(',');
                        const [startHour, startMin] = startTime.split(':');
                        const [endHour, endMin] = endTime.split(':');
                        setStartHour(parseInt(startHour));
                        setStartMin(parseInt(startMin));
                        setEndHour(parseInt(endHour));
                        setEndMin(parseInt(endMin));

                    }

                } else {
                    setClickedButton(0);
                }

                if (result.formality !== null) {
                    setTone(result.formality);
                } else {
                    setTone(tone[0]);
                }
                if (result.structure !== null) {
                    setLayout(result.structure);
                } else {
                    setLayout(layout[0]);
                }

                if (result.length === 'short') {
                    setSliderValue(1);
                } else if (result.length === 'medium') {
                    setSliderValue(2);
                } else if (result.length === 'long') {
                    setSliderValue(3);
                } else {
                    setSliderValue(1);
                }       

            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    
    };

    //for handling saving of any template
    const handleClickSave  = async (item) => {
        var formality = selectedTone;
        var structure = selectedLayout;
        const email = localStorage.getItem('email');
       
        var length;
        var templatename;
        if (item === templates[1]) {
            templatename = "customTemplate1";
        }else if (item === templates[2]) {
            templatename = "customTemplate2";
        }else if(item === templates[3]){
            templatename = "customTemplate3";
        }
        
        
        if (sliderValue === 1) {
            length = 'short';
        }else if (sliderValue === 2) {
            length = 'medium';
        }else if (sliderValue === 3){
            length = 'long';
        }
        var summ_type = "";
        var timestamp = "";
        var citation = "";
        if (isClicked === 0) {
            summ_type = "text";
        } else if (isClicked === 1) {
            summ_type = "website";
            if (selectedCitationType === citationType[0]){
                citation = "none";
            }else if (selectedCitationType === citationType[1]) {
                citation = "mla";
            }else if (selectedCitationType === citationType[2]) {
                citation = "apa";
            }else if (selectedCitationType === citationType[3]) {
                citation = "chicago";
            }
        }else if (isClicked === 2){
            summ_type = "video";
            if (selectedVideoSetting === videoSetting[1]) {
                if (startHour === "HH" || startMin === "MM" ||
                    endHour === "HH" || endMin === "MM") {
                    //display timestamp error
                    setErrorMessage('Please convert the timestamp values to numerical format.');
                    setOpenError(true);
                    return;
                } else {
                    var start = (startHour * 60) + startMin;
                    var end = (endHour * 60) + endMin;
                    if (end < start) {
                        //display invalid timestamp error
                        setErrorMessage('End time cannot occur before start time.');
                        setOpenError(true);
                        return;
                    }
                    timestamp = `${startHour}:${startMin},${endHour}:${endMin}`;
                }

            } else {
                timestamp = "full"
            }

        }
        
        // Make a POST request to the backend 
        try {
            //const response = await fetch('https://4p02shortify.com:5001/savetemplate', { //Server use only
            const response = await fetch('http://localhost:5001/savetemplate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, formality, structure, 
                     summ_type, timestamp, length, citation, templatename }),
            });
            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    //Checking if a template slot is currently taken when a user attempts to save
    const checkIfTemplateSlotTaken = async (item) => {
        var templatename;
        if (item === templates[1]) {
            templatename = "customTemplate1";
        }else if (item === templates[2]) {
            templatename = "customTemplate2";
        }else {
            templatename = "customTemplate3";
        }
        try {
            // Make a POST request to the Flask backend
            const response = await fetch('https://4p02shortify.com:5001/gettemplate', { //Server use only
            //const response = await fetch('http://localhost:5001/gettemplate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, templatename}),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("Result.length:",result.length);
                // if result.length is null, the template slot is empty
                if (result.length === null) {
                    console.log("result.length is null");
                    // template slot is empty
                    return false;
                }
            }

            return true
        } catch (error) {
            console.error('Error:', error.message);
        }
    }


    //export button handling, for downloading json file
    const exportJSON = () => {
        // Create a JSON object with the input and summarized text

        let data; // Declare data outside to widen its scope

        if (isClicked === 0) {
            data = {
                tone: selectedTone,
                style: selectedLayout,
                length: sliderLength[sliderValue],
                input: inputContent, // Assuming you have the original input stored in inputContent
                summary: outputContent
            };
        }
        
        if (isClicked === 1) {
            data = {
                tone: selectedTone,
                style: selectedLayout,
                length: sliderLength[sliderValue],
                input: inputContent, // Assuming you have the original input stored in inputContent
                summary: outputContent,
                citation_style: selectedCitationType
            };
        }
        
        if (isClicked === 2) {
            data = {
                tone: selectedTone,
                style: selectedLayout,
                length: sliderLength[sliderValue],
                input: inputContent, // Assuming you have the original input stored in inputContent
                summary: outputContent,
                option: selectedVideoSetting,
                startTime: `${startHour}:${startMin}`,
                endTime: `${endHour}:${endMin}`
            };
        }

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
                                className={`customSumBtn clamp-text ${isClicked === 0 ? `${darkMode ? 'clicked-dark disabled-hover-dark' : 'clicked-light disabled-hover-light'}` : `${darkMode ? 'not-clicked-dark' : 'not-clicked-light'}`} ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`}
                                onClick={() => toggleClicked(0)}>Text</button>
                            <button
                                id = 'website-url'
                                className={`customSumBtn ${isClicked === 1 ? `${darkMode ? 'clicked-dark disabled-hover-dark' : 'clicked-light disabled-hover-light'}` : `${darkMode ? 'not-clicked-dark' : 'not-clicked-light'}`} ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`}
                                onClick={() => toggleClicked(1)}>Website URL</button>
                            <button
                                className={`customSumBtn ${isClicked === 2 ? `${darkMode ? 'clicked-dark disabled-hover-dark' : 'clicked-light disabled-hover-light'}` : `${darkMode ? 'not-clicked-dark' : 'not-clicked-light'}`} ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`}
                                onClick={() => toggleClicked(2)}>Youtube URL</button>
                        </div>

                        <div className="main-content">
                             {email &&  

                            <div className={`premium-container ${darkMode ? 'premium-dark' : 'premium-light'}`}>
                                <div className="modes">
                                    <div className="mode">
                                        <p>Modes:</p>
                                    </div>
                                    <div className="dropdown-menus modes">
                                        <div className="primary-modes">
                                            <div className="tone-layout-div">
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
                                        </div>
                                        { isClicked === 1 &&
                                            <div className="dropdown-menu citations">
                                                <Dropdown
                                                    buttonText={selectedCitationType}
                                                    content={<>
                                                        {
                                                            citationType.map(item => 
                                                                <DropdownItem
                                                                    key={item}
                                                                    onClick={() => handleCitationChange(item)}>
                                                                        {`${item}`}
                                                                </DropdownItem>)
                                                        }
                                                    </>} 
                                                />
                                            </div>
                                        }
                                        { isClicked === 2 &&
                                            <div className="dropdown-menu video-setting">
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

                                        { isClicked === 2 && selectedVideoSetting === videoSetting[1] &&
                                            <div className="timestamp">
                                                <div className="start">
                                                    Start Time:
                                                    <div className="start-time">
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
                                                            darkMode={darkMode} />
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
                                                            darkMode={darkMode} />
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
                                                            //onClick = {()=> }
                                                            onClick={() => handleSaveTemplateChange(item)}>
                                                                {`${item}`}
                                                        </DropdownItem>)
                                                }
                                            </>} 
                                        />
                                    </div>
                                    
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
                            }
                            {
                            <div className={`premium-container second-row ${darkMode ? 'premium-dark' : 'premium-light'}`}>
                                <div className="modes">
                                    <div className="mode invisible">
                                        <p>Modes:</p>
                                    </div>
                                    <div className="word-count-level2">
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
                                    { isClicked === 1 &&
                                        <div className="dropdown-menu citations2">
                                            <Dropdown
                                                buttonText={selectedCitationType}
                                                content={<>
                                                    {
                                                        citationType.map(item => 
                                                            <DropdownItem
                                                                key={item}
                                                                onClick={() => handleCitationChange(item)}>
                                                                    {`${item}`}
                                                            </DropdownItem>)
                                                    }
                                                </>} 
                                            />
                                        </div>
                                    }
                                    { isClicked === 2 &&
                                        <div className="dropdown-menu video-setting2">
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

                                    { isClicked === 2 && selectedVideoSetting === videoSetting[1] &&
                                        <div className="timestamp2">
                                            <div className="start">
                                                Start Time:
                                                <div className="start-time">
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
                                                        darkMode={darkMode} />
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
                                                        darkMode={darkMode} />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            }              
                            <div className="text">
                                    <div className="inputArea">
                                        { isClicked === 0 &&
                                            <textarea
                                                className={`text-area ${darkMode ? 'ta-dark' : 'ta-light'}`}
                                                id='inputText' 
                                                placeholder='Enter or paste your text and click "Summarize."' 
                                                value={inputContent} 
                                                onChange={handleInputChange} 
                                                required>    
                                            </textarea>
                                        }
                                        { isClicked === 1 &&
                                            <textarea
                                                className={`text-area ${darkMode ? 'ta-dark' : 'ta-light'}`}
                                                id='inputURL' 
                                                placeholder='Enter or paste your URL and click "Summarize."' 
                                                value={inputContent} 
                                                onChange={handleInputChange} 
                                                required>    
                                            </textarea>
                                        }
                                        { isClicked === 2 &&
                                            <textarea
                                                className={`text-area ${darkMode ? 'ta-dark' : 'ta-light'}`}
                                                id='inputYTURL' 
                                                placeholder='Enter or paste your Youtube URL and click "Summarize."' 
                                                value={inputContent} 
                                                onChange={handleInputChange} 
                                                required>    
                                            </textarea>
                                        }

                                    {inputContent &&
                                        (<Tooltip title="Delete" arrow>
                                            <button className={`delete-button ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`}
                                            onClick={ () => {
                                                openDialog({
                                                    title: "Delete Text",
                                                    content: "You're about to delete the Original and Summarized text.",
                                                    showCancelButton: true,
                                                    showConfirmButton: true,
                                                    confirmText: "Continue",
                                                    onClose: handleClose,
                                                    onConfirm: handleDeleteConfirm,
                                                })
                                            }}>
                                                <FaRegTrashCan size={18} />
                                            </button>
                                        </Tooltip>)
                                    }
                                    <div className={`bottom-div1 ${darkMode ? 'bd-dark' : 'bd-light'}`}>
                                        <div className="word-count">
                                            { inputContent && wordCount >= 1 && wordCount < 126 ? 
                                                (<Tooltip title={inputContent.length === 1? `${inputContent.length} Character`: `${inputContent.length} Characters`} arrow>
                                                    <div className="word-cnt-div">{wordCount === 1? `${wordCount} Word`: `${wordCount} Words`}</div>
                                                </Tooltip>) : wordCount >= 126 && !email ?
                                                <div className="get-premium">
                                                    <div><Link to = "/Login" className="link-blue">Get Premium</Link> for unlimited words.</div>
                                                    <div>{wordCount}/125 Words</div>    
                                                </div> : 
                                                (<Tooltip title={inputContent.length === 1? `${inputContent.length} Character`: `${inputContent.length} Characters`} arrow>
                                                    <div className="word-cnt-div">{wordCount === 1? `${wordCount} Word`: `${wordCount} Words`}</div>
                                                </Tooltip>)
                                            }
                                        </div>

                                        { !email && wordCount > 125? 
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
                                                <button className={`feedback-up ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} onClick={thumbsUp} disabled={!outputContent}><GoThumbsup size={19} /></button>
                                            </Tooltip>
                                            <Tooltip title="Dislike" arrow>
                                                <button className={`feedback-down ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} onClick={thumbsDown} disabled ={!outputContent}><GoThumbsdown size={19} /></button>
                                            </Tooltip>
                                        </div>

                                        <div className="export-button">
                                            <Tooltip title="Export" arrow>
                                                <button className={`feedback-up ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} onClick={exportJSON} disabled={!outputContent}><PiExport size={19} /></button>
                                            </Tooltip>
                                        </div>
                                        
                                        {shorten &&
                                            <a href="/Shortener" onClick={transferLink}>
                                                <button className="summarize-btn" id="shorten-button">
                                                    <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                                        <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Shorten your URL</div>
                                                    </div>
                                                </button>
                                            </a>
                                        }
                                        {/**Added outputContent != '' so you cant save summary if theres nothing there */}
                                        { email && outputContent !== '' &&
                                            <button 
                                            className={`summarize-btn ${isSaveClicked ? 'button-disabled' : ''}`}
                                            onClick={addToHistory} 
                                            disabled={isSaveClicked}>
                                                <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                                    <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>{SaveSummary}</div>
                                                </div>
                                            </button>
                                        }
                                    </div>
                                    <Tooltip title="Copy" arrow>
                                        <button className={`copy-button ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} onClick={copySummary}>{isCopied ? <IoClipboard size={17} /> : <IoClipboardOutline size={17} />}</button>
                                    </Tooltip>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <DialogBox 
                open={openError} 
                onClose={handleErrorClose}
                title={"Error"}
                content={errorMessage}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText={"Continue"}
                onConfirm={handleErrorConfirm}
                />
            
                <DialogBox 
                open={isLoading} 
                onClose={() => {}} // Prevent closing on user interaction
                title={"Loading..."}
                content={"Please wait while we process your request."}
                showCancelButton={false}
                showConfirmButton={false}
                // No confirm button shown, making the dialog purely informational
                />

                <DialogBox 
                open={dialogConfig.open} 
                onClose={dialogConfig.onClose}
                title={dialogConfig.title}
                content={dialogConfig.content}
                showCancelButton={dialogConfig.showCancelButton}
                showConfirmButton={dialogConfig.showConfirmButton}
                confirmText={dialogConfig.confirmText}
                onConfirm={dialogConfig.onConfirm}
                />
            </div>
        </div>
    );
}

export default Summarizer;