import React, { useState } from 'react';
import { useEffect } from "react";
// import { Link } from 'react-router-dom';
import "./css/DashboardStyle.css";
import "./css/SummarizerStyle.css";
import "./css/SignUpStyle.css";
// import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
// Components
import Dropdown from "./Dropdown.js";
import DropdownItem from "./DropdownItem.js";
import NumberInputBasic, {QuantityInput} from "./NumberInput.js"; 
import { MdDeleteOutline } from "react-icons/md";

const Templates = () => {

  const [inputContent, setInputContent] = useState('');
  const [outputContent, setOutputContent] = useState('');
  const [open, setOpen] = useState(false);
  const [openEmptyInput, setOpenEmptyInput] = useState(false);
  const [shorten, showShorten] = useState(false);
  const [isClicked, setClickedButton] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  // const [value, setValue] = useState(null);
  // const [isPremium, setPremium] = useState(false);
  // const userEmail = localStorage.getItem('email');

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

  // for closing Dialog Box
  const handleClose = () => {
      setOpen(false)
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

  const handleToneChange = (item) => {
      setTone(item)
  }

  const handleLayoutChange = (item) => {
      setLayout(item)
  }

  const handleVideoSettingChange = (item) => {
      setVideoSetting(item)
  }

  // for closing Dialog Box
  const handleEmptyClose = () => {
      setOpenEmptyInput(false)
  }


  return (

    <div className="templates-wrapper">
        
        <h1>Templates</h1>
        <div className='template-div'>
          <div className='temp-heading'>
            <h3>Template 1</h3>
            <button className='temp-delete'><MdDeleteOutline /></button>
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
            </div>
        </div>

        <div className='template-div'>
          <div className='temp-heading'>
            <h3>Template 2</h3>
            <button className='temp-delete'><MdDeleteOutline /></button>
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
            </div>
        </div>

        <div className='template-div'>
          <div className='temp-heading'>
            <h3>Template 3</h3>
            <button className='temp-delete'><MdDeleteOutline /></button>
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
            </div>
        </div>
    
    </div>

  );
}

export default Templates;