import React, { useState, useRef, useEffect } from 'react';
import "./css/SignUpStyle.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';
//import { Link } from 'react-router-dom';

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [finalPass, confirmPass] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [finalError, setFinalError] = useState('');

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);


  const handleSubmit = async () => {
    try {
        if (pass !== finalPass) {
            //this will be a popup
            console.log('Passwords do not match!');
            setPassError('Passwords do not match!');
            return;
        }

        // Make a POST request to the Flask backend
        const response = await fetch('http://localhost:5001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, pass}),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);

          if (result.message === 'Email is already registered.') {
            setEmailError('Email is already registered.');
            setEmail('');
          } else if (result.message === 'Email does not exist or is not deliverable.') {
            setEmailError('Email does not exist or is not deliverable.');
            setEmail('');
          } else if (result.message === 'Password invalid.'){
            setPassError('Password invalid.');
            setPass('');
            confirmPass('');
          }
      } else {
          const result = await response.json();
          console.error('Failed to register', result.message);
      }
    } catch (error) {
        console.error('Error:', error.message);
    }

  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handleEmailChange = (e) => {
    setEmailError('');
    setEmail(e.target.value);
  };

  const valid = ( item, v_icon, inv_icon ) => {
    let text = document.querySelector(`#${item}`);
    text.style.opacity = "1";

    let valid_icon = document.querySelector(`#${item} .${v_icon}`);
    valid_icon.style.opacity = "1";

    let invalid_icon = document.querySelector(`#${item} .${inv_icon}`);
    invalid_icon.style.opacity = "0";
  };

  const invalid = ( item, v_icon, inv_icon ) => {
    let text = document.querySelector(`#${item}`);
    text.style.opacity = ".5";

    let valid_icon = document.querySelector(`#${item} .${v_icon}`);
    valid_icon.style.opacity = "0";

    let invalid_icon = document.querySelector(`#${item} .${inv_icon}`);
    invalid_icon.style.opacity = "1";
  }

  // const [capital, setCapital] = useState(false);
  // const [number, setNumber] = useState(false);
  // const [length, setLength] = useState(false);

  const handleInputChange = (e) => {
    setPass(e.target.value)
    const password =e.target.value;

    if (password.match(/[A-Z]/) != null) {
      valid ('uppercase', 'fa-check', 'fa-times');
      // setCapital(true)
    }
    else {
      invalid('uppercase', 'fa-check', 'fa-times');
      // setCapital(false)
    }
    if (password.match(/[0-9]/) != null) {
      valid ('number', 'fa-check', 'fa-times');
    }
    else {
      invalid('number', 'fa-check', 'fa-times');
    }
    if (password.length > 7 && password.length<21) {
      valid ('length', 'fa-check', 'fa-times');
    }
    else {
      invalid('length', 'fa-check', 'fa-times');
    }
  };

  const handlePassChange = (e) => {
    setPassError('');
    setFinalError('');
    setPass(e.target.value);
  }

  const handleConfirmChange = (e) => {
    setPassError('');
    setFinalError('');
    confirmPass(e.target.value);
  }

  const [checklist, showChecklist] = useState(true);

  useEffect(() => {
    document.addEventListener("mousedown", () => {
      showChecklist(true);
    });
  });

  return (
    <div className="box">
      <div className="form">
        <div className='form-title'>Create an account</div>
        <div className="form-subtitle">Join us to access to Tailored Summaries, Analytics, API Integration and more!</div>

        <div className="name">
          <label className='name-text'>Enter your name</label> 
          <input className='textfield'
            type="text" 
            required
            value={name}
            onChange={handleNameChange}
            placeholder='Enter name here' 
          />
        </div>

        <div className="email">
          <label className='email-text'>Enter your email</label> 
          <input className='textfield'
            type="text" 
            required
            value={email}
            onChange={handleEmailChange}
            placeholder='Enter email here' 
          />
          {emailError && <div className="email-error">{emailError}</div>}
        </div>
      
        <div className="password">
          <div className='pass-req'>
            <div>
              <label className='pass-text'>Enter your password</label> 
            </div>
            <Tooltip className="pass-req-text" title="Password must have 8-20 characters, atleast one uppercase and atleast one number." placement='right' arrow>
              <div>
                  <FontAwesomeIcon icon={faQuestionCircle} className='pass-req-icon'/>
              </div>
            </Tooltip>
          </div>
          <div className='pass-wrapper'>
            <div className='pass-container' onClick={()=> { showChecklist(true); }}>
                <input className='textfield'
                  type={visible ? "text":"password"}
                  required
                  value={pass}
                  onClick={(e)=> { setPass(e.target.value); }}
                  onChange={handleInputChange}
                  placeholder='Enter password here' 
                />
              <div className='hide-pass1' onClick = {() => setVisible(!visible)}>
                {visible ? <FaRegEye/> : <FaRegEyeSlash/>}
              </div>
            </div>

            {checklist && 
            <div className='pass-checklist'>
              <div>
              <p id='length'>
                <FontAwesomeIcon className='fa-times icon' icon={faTimes}/>
                <FontAwesomeIcon className='fa-check icon' icon={faCheck}/>
                <span>8 to 20 characters long</span>
              </p>
              <p id='uppercase'>
                <FontAwesomeIcon className='fa-times icon' icon={faTimes}/>
                <FontAwesomeIcon className='fa-check icon' icon={faCheck}/>
                <span>Atleast 1 uppercase letter</span>
              </p>
              <p id='number'>
                <FontAwesomeIcon className='fa-times icon' icon={faTimes}/>
                <FontAwesomeIcon className='fa-check icon' icon={faCheck}/>
                <span>Atleast 1 number</span>
              </p>
              </div>
            </div>
            } 

            {/* <div className='pass-checklist'>
              <h3 className='checklist-title'>Password should be</h3>
              <ul className='checklist'>
                <li className='list-item'>
                  8 to 20 characters long
                </li>
                <li className='list-item'>At least 1 number</li>
                <li className='list-item'>At least 1 uppercase letter</li>
              </ul>
            </div> */}

          </div>
          {passError && <div class="pass-error">{passError}</div>}
        </div>

        <div className="password">
          <label className='pass-text'>Re-enter password</label> 
          <div className='pass-container'>
            <input className='textfield'
                type={visible1 ? "text":"password"}
                required
                value={finalPass}
                // onChange={handleConfirmChange} 
                onClick={handleConfirmChange}
                // onChange={(e) => setPass(e.target.value)}
                placeholder='Enter password here' 
              />
              <div className='hide-pass2' onClick = {() => setVisible1(!visible1)}>
                  {visible1 ? <FaRegEye/> : <FaRegEyeSlash/>}
              </div>
          </div>
          {finalError && <div class="pass-error">{finalError}</div>}
        </div>

        <button className="signup-btn" onClick={handleSubmit}>
          <div className="signup-overlap">
            <div className="signup">Create an account</div>
          </div>
        </button>
        
      </div>
    </div>
  );
}

export default SignUp;