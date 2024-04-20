import React, { useState } from 'react';
import { useEffect } from "react";
// import { Link } from 'react-router-dom';
import "./css/TemplatesStyle.css";
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

import { useTheme } from './ThemeContext.js'
import { dark } from '@mui/material/styles/createPalette';

const Templates = () => {

    const { darkMode } = useTheme();

    const [inputContent, setInputContent] = useState('');
    const [outputContent, setOutputContent] = useState('');

    const [open, setOpen] = useState(false);
    const [openEmptyInput, setOpenEmptyInput] = useState(false);
    const [openError, setOpenError] = useState(false);

    const [shorten, showShorten] = useState(false);
    const [isClicked, setClickedButton] = useState(0);
    const [isClicked2, setClickedButton2] = useState(0);
    const [isClicked3, setClickedButton3] = useState(0);

    const [timeoutId, setTimeoutId] = useState(null);
    const [value, setValue] = useState(null);

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
    const email = localStorage.getItem('email');

    //citation vars
    const citationType = ["No Citation", "MLA Citation", "APA Citation", "Chicago Citation"];
    const [selectedCitationType, setCitationType] = useState(citationType[0]);
    const [selectedCitationType2, setCitationType2] = useState(citationType[0]);
    const [selectedCitationType3, setCitationType3] = useState(citationType[0]);

    //timestamp vars
    const [startHour, setStartHour] = useState();
    const [startMin, setStartMin] = useState();
    const [endHour, setEndHour] = useState();
    const [endMin, setEndMin] = useState();

     //timestamp vars - template 2
     const [startHour2, setStartHour2] = useState();
     const [startMin2, setStartMin2] = useState();
     const [endHour2, setEndHour2] = useState();
     const [endMin2, setEndMin2] = useState();

      //timestamp vars - template 3
    const [startHour3, setStartHour3] = useState();
    const [startMin3, setStartMin3] = useState();
    const [endHour3, setEndHour3] = useState();
    const [endMin3, setEndMin3] = useState();


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

    // useEffect(() => {
        
    //     if (timeoutId) {
    //         clearTimeout(timeoutId)
    //     }

    //     // set a timeout of 200 miliseconds - then update the word count
    //     const id = setTimeout(() => {
    //         // updates word count
    //         if(inputContent.trim().length == 0) {
    //             setWordCount(0)
    //         }
    //         else {
    //             const words = countWords(inputContent)
    //             setWordCount(words)
    //         }
    //     }, 200)

    //     setTimeoutId(id)

    //     return () => {
    //         if (timeoutId) {
    //             clearTimeout(timeoutId)
    //         }
    //     }
    // }, [inputContent])


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

    // const checkEmptyInput = () => {
    //     //const input = document.getElementById("input");
    //     if(inputContent === '') {
    //         setOpenEmptyInput(true)
    //     }
    //     else {
    //         summarizeText();
    //     }
    // }

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

    const handleCitationChange = (item) => {
        setCitationType(item)
    }
    const handleCitationChange2 = (item) => {
        setCitationType2(item)
    }
    const handleCitationChange3 = (item) => {
        setCitationType3(item)
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


    // // function for handling text summarization
    // const summarizeText = () => {
    //     fetch('/api/summarize', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ text: inputContent, type: isClicked }),
    //     })
    //     .then(response => response.json())
    //     .then(data => {

    //             setOutputContent(data.summary); // This line updates the output area
    //     })
    //     .catch(error => {
    //         showError('An error occurred while fetching the summary.');
    //     });
    // };


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

    

    useEffect(() => {
        handleTemplateFetch();
        handleTemplateFetch2();
        handleTemplateFetch3();

    },[]);

    //function to pull the values stored in the database for the template
    const handleTemplateFetch = async () => {
        //do if so that u can say template 1 = customTemplate1 etc.
        
        const templatename = "customTemplate1";

        //console.log("item:",item);
        //console.log("templateNameToFetch:",templatename);
        try {
    
            // Make a POST request to the Flask backend
            //const response = await fetch('http://4p02shortify.com:5001/gettemplate', { //Server use only
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

      //function to pull the values stored in the database for the template
    const handleTemplateFetch2 = async () => {
        //do if so that u can say template 1 = customTemplate1 etc.
    
        const templatename = "customTemplate2";

        //console.log("item:",item);
        //console.log("templateNameToFetch:",templatename);
        try {
    
            // Make a POST request to the Flask backend
            //const response = await fetch('http://4p02shortify.com:5001/gettemplate', { //Server use only
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
                    setClickedButton2(0);
                }else if (result.summtype === 'website') {
                    setClickedButton2(1);
                    if (result.citation === 'none') {
                        setCitationType2(citationType[0]);
                    }else if (result.citation === 'mla') {
                        setCitationType2(citationType[1]);
                    }else if (result.citation === 'apa') {
                        setCitationType2(citationType[2]);
                    }else if (result.citation === 'chicago') {
                        setCitationType2(citationType[3]);
                    }
                }else if (result.summtype === 'video') {
                    setClickedButton2(2);
                    if (result.timestamps === 'full') {
                        setVideoSetting2(videoSetting[0]);
                    }else {
                        setVideoSetting2(videoSetting[1]);
                        //timestamp thing
                        const [startTime, endTime] = result.timestamps.split(',');
                        const [startHour, startMin] = startTime.split(':');
                        const [endHour, endMin] = endTime.split(':');
                        setStartHour2(parseInt(startHour));
                        setStartMin2(parseInt(startMin));
                        setEndHour2(parseInt(endHour));
                        setEndMin2(parseInt(endMin));
                    }
                }else {
                    setClickedButton2(0);
                }

                if (result.formality != null) {
                    setTone2(result.formality);
                }else {
                    setTone2(tone[0]);
                }

                if (result.structure != null) {
                    setLayout2(result.structure);
                }else {
                    setLayout2(layout[0]);
                }

                if (result.length === 'short') {
                    setSliderValue2(1);
                }else if (result.length === 'medium') {
                    setSliderValue2(2);
                }else if (result.length === 'long') {
                    setSliderValue2(3);
                }else {
                    setSliderValue2(1);
                }

                

            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    
      };

      //function to pull the values stored in the database for the template
    const handleTemplateFetch3 = async () => {
        //do if so that u can say template 1 = customTemplate1 etc.
        
        const templatename = "customTemplate3";

        //console.log("item:",item);
        //console.log("templateNameToFetch:",templatename);
        try {
    
            // Make a POST request to the Flask backend
            //const response = await fetch('http://4p02shortify.com:5001/gettemplate', { //Server use only
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
                    setClickedButton3(0);
                }else if (result.summtype === 'website') {
                    setClickedButton3(1);
                    if (result.citation === 'none') {
                        setCitationType3(citationType[0]);
                    }else if (result.citation === 'mla') {
                        setCitationType3(citationType[1]);
                    }else if (result.citation === 'apa') {
                        setCitationType3(citationType[2]);
                    }else if (result.citation === 'chicago') {
                        setCitationType3(citationType[3]);
                    }
                }else if (result.summtype === 'video') {
                    setClickedButton3(2);
                    if (result.timestamps === 'full') {
                        setVideoSetting3(videoSetting[0]);
                    }else {
                        setVideoSetting3(videoSetting[1]);
                        //timestamp thing
                        const [startTime, endTime] = result.timestamps.split(',');
                        const [startHour, startMin] = startTime.split(':');
                        const [endHour, endMin] = endTime.split(':');
                        setStartHour3(parseInt(startHour));
                        setStartMin3(parseInt(startMin));
                        setEndHour3(parseInt(endHour));
                        setEndMin3(parseInt(endMin));
                    }
                }else {
                    setClickedButton3(0);
                }

                if (result.formality != null) {
                    setTone3(result.formality);
                }else {
                    setTone3(tone[0]);
                }

                if (result.structure != null) {
                    setLayout3(result.structure);
                }else {
                    setLayout3(layout[0]);
                }

                if (result.length === 'short') {
                    setSliderValue3(1);
                }else if (result.length === 'medium') {
                    setSliderValue3(2);
                }else if (result.length === 'long') {
                    setSliderValue3(3);
                }else {
                    setSliderValue3(1);
                }

                

            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    
      };

    

    //for handling saving of template 1
    const handleClickSave  = async () => {
        var formality = selectedTone;
        var structure = selectedLayout;
        
        
        var length;
        
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
        }else if (isClicked === 1) {
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
                if (isNaN(startHour) || 
                isNaN(startMin) || 
                isNaN(endHour) || 
                isNaN(endMin) || 
                startHour === null || 
                startMin === null || 
                endHour === null || 
                endMin === null ) {
                    //display timestamp error
                    setErrorMessage('Please convert the timestamp values to numerical format.');
                    setOpenError(true);
                    return;
                }else{
                    var start = (startHour*60)+startMin;
                    var end = (endHour*60)+endMin;
                    if (end <= start ) {
                        //display invalid timestamp error
                        setErrorMessage('End time must be after the start time.');
                        setOpenError(true);
                        return;
                    }
                    timestamp = `${startHour}:${startMin},${endHour}:${endMin}`;
                }
            }else {
                timestamp = "full"
            }
        }
        
        
        var templatename = "customTemplate1";

        try {
            //const response = await fetch('http://4p02shortify.com:5001/savetemplate', { //Server use only
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



        }catch (error) {
            console.error('Error:', error.message);
        }
    }

    //for handling saving of template 2
    const handleClickSave2  = async () => {
        var formality = selectedTone2;
        var structure = selectedLayout2;
        
    
        var length;
        
        if (sliderValue2 === 1) {
            
            length = 'short';
        }else if (sliderValue2 === 2) {
            
            length = 'medium';
        }else if (sliderValue2 === 3) {
            
            length = 'long';
        }
        var summ_type = "";
        var timestamp = "";
        var citation = "";
        if (isClicked2 === 0) {
            summ_type = "text";
        }else if (isClicked2 === 1) {
            summ_type = "website";
            if (selectedCitationType2 === citationType[0]){
                citation = "none";
            }else if (selectedCitationType2 === citationType[1]) {
                citation = "mla";
            }else if (selectedCitationType2 === citationType[2]) {
                citation = "apa";
            }else if (selectedCitationType2 === citationType[3]) {
                citation = "chicago";
            }
        }else if (isClicked2 === 2) {
            summ_type = "video";
            if (selectedVideoSetting2 === videoSetting[1]) {
                if (isNaN(startHour2) || 
                isNaN(startMin2) || 
                isNaN(endHour2) || 
                isNaN(endMin2) || 
                startHour2 === null || 
                startMin2 === null || 
                endHour2 === null || 
                endMin2 === null ) {
                    //display timestamp error
                    setErrorMessage('Please convert the timestamp values to numerical format.');
                    setOpenError(true);
                    return;
                }else{
                    var start = (startHour2*60)+startMin2;
                    var end = (endHour2*60)+endMin2;
                    if (end <= start ) {
                        //display invalid timestamp error
                        setErrorMessage('End time must be after the start time.');
                        setOpenError(true);
                        return;
                    }
                    timestamp = `${startHour2}:${startMin2},${endHour2}:${endMin2}`;
                }
            }else {
                timestamp = "full"
            }
        }
        var templatename = "customTemplate2";

        try {

            //const response = await fetch('http://4p02shortify.com:5001/savetemplate', { //Server use only
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



        }catch (error) {
            console.error('Error:', error.message);
        }
    }

    //for handling saving of template 3
    const handleClickSave3  = async () => {
        var formality = selectedTone3;
        var structure = selectedLayout3;
        

        var length;
        
        if (sliderValue3 === 1) {
            
            length = 'short';
        }else if (sliderValue3 === 2) {
            
            length = 'medium';
        }else if (sliderValue3 === 3) {
            
            length = 'long';
        }
        var summ_type = "";
        var timestamp = "";
        var citation = "";
        if (isClicked3 === 0) {
            summ_type = "text";
        }else if (isClicked3 === 1) {
            summ_type = "website";
            if (selectedCitationType3 === citationType[0]){
                citation = "none";
            }else if (selectedCitationType3 === citationType[1]) {
                citation = "mla";
            }else if (selectedCitationType3 === citationType[2]) {
                citation = "apa";
            }else if (selectedCitationType3 === citationType[3]) {
                citation = "chicago";
            }
        }else if (isClicked3 === 2) {
            summ_type = "video";
            if (selectedVideoSetting3 === videoSetting[1]) {
                if (isNaN(startHour3) || 
                isNaN(startMin3) || 
                isNaN(endHour3) || 
                isNaN(endMin3) || 
                startHour3 === null || 
                startMin3 === null || 
                endHour3 === null || 
                endMin3 === null ) {
                    //display timestamp error
                    setErrorMessage('Please convert the timestamp values to numerical format.');
                    setOpenError(true);
                    return;
                }else{
                    var start = (startHour3*60)+startMin3;
                    var end = (endHour3*60)+endMin3;
                    if (end <= start ) {
                        //display invalid timestamp error
                        setErrorMessage('End time must be after the start time.');
                        setOpenError(true);
                        return;
                    
                    }
                    timestamp = `${startHour3}:${startMin3},${endHour3}:${endMin3}`;
                }
                
            }else {
                timestamp = "full"
            }
            
        }
        
        
        var templatename = "customTemplate3";

        try {
            //const response = await fetch('http://4p02shortify.com:5001/savetemplate', { //Server use only
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



        }catch (error) {
            console.error('Error:', error.message);
        }
    }

    //for handling clearing of template 1
    const handleClickClear  = async () => {
        
        setLayout(layout[0]);
        setTone(tone[0]);
        setSliderValue(1);
        setClickedButton(0);
        setVideoSetting(videoSetting[0]);
        setCitationType(citationType[0]);
        setStartHour();
        setStartMin();
        setEndHour();
        setEndMin();
        var templatename = "customTemplate1";
        try {
            //const response = await fetch('http://4p02shortify.com:5001/cleartemplate', { //Server use only
            const response = await fetch('http://localhost:5001/cleartemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, templatename }),
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
        }

        }catch (error) {
            console.error('Error:', error.message);
        }
    }

    //for handling clearing of template 2
    const handleClickClear2  = async () => {
        
        setLayout2(layout[0]);
        setTone2(tone[0]);
        setSliderValue2(1);
        setClickedButton2(0);
        setVideoSetting2(videoSetting[0]);
        setCitationType2(citationType[0]);
        setStartHour2();
        setStartMin2();
        setEndHour2();
        setEndMin2();
        var templatename = "customTemplate2";
        try {
            //const response = await fetch('http://4p02shortify.com:5001/cleartemplate', { //Server use only
            const response = await fetch('http://localhost:5001/cleartemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, templatename }),
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
        }

        }catch (error) {
            console.error('Error:', error.message);
        }
    }

        //for handling clearing of template 3
        const handleClickClear3  = async () => {
            
            setLayout3(layout[0]);
            setTone3(tone[0]);
            setSliderValue3(1);
            setClickedButton3(0);
            setVideoSetting3(videoSetting[0]);
            setCitationType3(citationType[0]);
            setStartHour3();
            setStartMin3();
            setEndHour3();
            setEndMin3();
            var templatename = "customTemplate3";
            try {
                //const response = await fetch('http://4p02shortify.com:5001/cleartemplate', { //Server use only
                const response = await fetch('http://localhost:5001/cleartemplate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, templatename }),
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
                            <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Save</div>
                            </div>
                        </button>
                    </div>
                    <div className="reset-custom-info">
                        <button className='summarize-btn' onClick={handleClickClear}>
                            <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Reset</div>
                            </div>
                        </button>
                    </div>       
                </div>     
            </div>
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
                        { isClicked == 1 &&
                                            <div className="dropdown-menu">
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
                    
            </div> 
        </div>

        {/*------------------------- template two ------------------------------*/}

        <div className='template-div'>
            <div className='temp-heading'>
                <h3>Template 2</h3>
                <div className='save-reset-btns'>
                    <div className="save-custom-info">
                        <button className='summarize-btn' onClick={handleClickSave2}>
                            <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Save</div>
                            </div>
                        </button>
                    </div>
                    <div className="reset-custom-info">
                        <button className='summarize-btn' onClick={handleClickClear2}>
                            <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Reset</div>
                            </div>
                        </button>
                    </div>       
                </div>     
            </div>
            <div class="button-container">
                <button 
                    className={`customSumBtn clamp-text ${isClicked2 === 0? `${darkMode ? 'clicked-dark disabled-hover-dark' : 'clicked-light disabled-hover-light'}` : `${darkMode ? 'not-clicked-dark' : 'not-clicked-light'}`} ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} 
                    onClick={() => toggleClicked2(0)}>Text</button>
                <button 
                    className={`customSumBtn ${isClicked2 === 1? `${darkMode ? 'clicked-dark disabled-hover-dark' : 'clicked-light disabled-hover-light'}` : `${darkMode ? 'not-clicked-dark' : 'not-clicked-light'}`} ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} 
                    onClick={() => toggleClicked2(1)}>Website URL</button>
                <button 
                    className={`customSumBtn ${isClicked2 === 2? `${darkMode ? 'clicked-dark disabled-hover-dark' : 'clicked-light disabled-hover-light'}` : `${darkMode ? 'not-clicked-dark' : 'not-clicked-light'}`} ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`}  
                    onClick={() => toggleClicked2(2)}>Youtube URL</button>
            </div>
            <div className={`premium-container ${darkMode ? 'premium-dark' : 'premium-light'}`}>
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
                        { isClicked2 == 1 &&
                                            <div className="dropdown-menu">
                                                <Dropdown
                                                    buttonText={selectedCitationType2}
                                                    content={<>
                                                        {
                                                            citationType.map(item => 
                                                                <DropdownItem
                                                                    key={item}
                                                                    onClick={() => handleCitationChange2(item)}>
                                                                        {`${item}`}
                                                                </DropdownItem>)
                                                        }
                                                    </>} 
                                                />
                                            </div>
                                        }
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
                                    <NumberInputBasic 
                                    value={startHour2} 
                                    //placeholder = "HH"
                                    onChange={setStartHour2}
                                    darkMode={darkMode} />
                                    :
                                    <QuantityInput 
                                    value={startMin2}
                                    //placeholder = "MM"
                                    onChange={setStartMin2}
                                    darkMode={darkMode}/>
                                    {/* <textarea className="timestamp-textarea" id="startS" name="startS" placeholder='Seconds'></textarea> */}
                                </div>
                            </div>

                            <div className="end">
                                End Time:
                                <div className="end-time">
                                <NumberInputBasic 
                                    value={endHour2} 
                                    //placeholder = "HH"
                                    onChange={setEndHour2}
                                    darkMode={darkMode} />
                                    :
                                    <QuantityInput 
                                    value={endMin2}
                                    //placeholder = "MM"
                                    onChange={setEndMin2}
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
                    
            </div> 
        </div>

        {/*------------------------- template three ------------------------------*/}


        <div className='template-div'>
            <div className='temp-heading'>
                <h3>Template 3</h3>
                <div className='save-reset-btns'>
                    <div className="save-custom-info">
                        <button className='summarize-btn' onClick={handleClickSave3}>
                            <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Save</div>
                            </div>
                        </button>
                    </div>
                    <div className="reset-custom-info">
                        <button className='summarize-btn' onClick={handleClickClear3}>
                            <div className={`summarize-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
                                <div className={`summarize ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Reset</div>
                            </div>
                        </button>
                    </div>       
                </div>     
            </div>
            <div class="button-container">
                <button 
                    className={`customSumBtn clamp-text ${isClicked3 === 0? `${darkMode ? 'clicked-dark disabled-hover-dark' : 'clicked-light disabled-hover-light'}` : `${darkMode ? 'not-clicked-dark' : 'not-clicked-light'}`} ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} 
                    onClick={() => toggleClicked3(0)}>Text</button>
                <button 
                    className={`customSumBtn ${isClicked3 === 1? `${darkMode ? 'clicked-dark disabled-hover-dark' : 'clicked-light disabled-hover-light'}` : `${darkMode ? 'not-clicked-dark' : 'not-clicked-light'}`} ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`} 
                    onClick={() => toggleClicked3(1)}>Website URL</button>
                <button 
                    className={`customSumBtn ${isClicked3 === 2? `${darkMode ? 'clicked-dark disabled-hover-dark' : 'clicked-light disabled-hover-light'}` : `${darkMode ? 'not-clicked-dark' : 'not-clicked-light'}`} ${darkMode ? 'btn-text-light' : 'btn-text-dark'}`}  
                    onClick={() => toggleClicked3(2)}>Youtube URL</button>
            </div>
            <div className={`premium-container ${darkMode ? 'premium-dark' : 'premium-light'}`}>
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
                        { isClicked3 == 1 &&
                                            <div className="dropdown-menu">
                                                <Dropdown
                                                    buttonText={selectedCitationType3}
                                                    content={<>
                                                        {
                                                            citationType.map(item => 
                                                                <DropdownItem
                                                                    key={item}
                                                                    onClick={() => handleCitationChange3(item)}>
                                                                        {`${item}`}
                                                                </DropdownItem>)
                                                        }
                                                    </>} 
                                                />
                                            </div>
                                        }
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
                                    <NumberInputBasic 
                                    value={startHour3} 
                                    //placeholder = "HH"
                                    onChange={setStartHour3}
                                    darkMode={darkMode} />
                                    :
                                    <QuantityInput 
                                    value={startMin3}
                                    //placeholder = "MM"
                                    onChange={setStartMin3}
                                    darkMode={darkMode}/>
                                    {/* <textarea className="timestamp-textarea" id="startS" name="startS" placeholder='Seconds'></textarea> */}
                                </div>
                            </div>

                            <div className="end">
                                End Time:
                                <div className="end-time">
                                <NumberInputBasic 
                                    value={endHour3} 
                                    //placeholder = "HH"
                                    onChange={setEndHour3}
                                    darkMode={darkMode} />
                                    :
                                    <QuantityInput 
                                    value={endMin3}
                                    
                                    //placeholder = "MM"
                                    onChange={setEndMin3}
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
        </div>


    </div>


  );
}

export default Templates;