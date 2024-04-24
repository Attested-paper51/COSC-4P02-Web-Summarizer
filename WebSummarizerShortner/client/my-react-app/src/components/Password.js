import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./css/PasswordStyle.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext.js'

const Password = () => {

  const { darkMode } = useTheme();

  const [pass, setPass] = useState('');
  const [finalPass, confirmPass] = useState('');
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const [passError, setPassError] = useState('');
  const [finalError, setFinalError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = new URLSearchParams(location.search).get('email') || '';
  const handleSubmit = async () => {
    if (pass !== finalPass) {
      setFinalError('Passwords do not match!');
      return;
  }
    //const response = await fetch('http://4p02shortify.com:5001/reset', { //Server use only
    const response = await fetch('http://localhost:5001/reset', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,pass }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      if (result.message === 'Password changed successfully.'){
        //Navigate to dashboard if password change successful
        navigate('/Dashboard');
      }else if (result.message === 'New password requirements not met.') {
        setPassError(result.message);
        setPass('');
        confirmPass('');
      }

    }else {
      console.error('Failed to reset.');
    }
  }

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

  return (
    <div className={`pass-box ${darkMode ? 'login-dark' : 'login-light'}`}>
      <div className={`form ${darkMode ? 'form-dark' : 'form-light'}`}>
        <div className='form-title'>Reset account password</div>
        {/* <div className="form-subtitle">Join us to access to Tailored Summaries, Analytics, API Integration and more!</div> */}
        {/* <div className="username">
          <label className='user-text'>Enter your email</label> 
          <input className='textfield'
            type="text" 
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder='Enter email here' 
          />
        </div> */}
      
        <div className="password">

          <label className='pass-text'>Enter new password</label> 
          <div className='pass-wrapper'>
            <div className='pass-container'>
              <input className={`textfield ${darkMode ? 'input-url-dark' : 'input-url-light'}`}
                type={visible ? "text":"password"}
                required
                value={pass}
                onClick={(e) => setPass(e.target.value)}
                onChange={handleInputChange}
                placeholder='Enter password here' 
              />
              <div className='hide-pass1' onClick = {() => setVisible(!visible)}>
                {visible ? <FaRegEye/> : <FaRegEyeSlash/>}
              </div>
            </div>

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

          </div>
          {passError && <div class={`pass-error ${darkMode ? 'error-dark' : 'error-light'}`}>{passError}</div>}
        </div>

        <div className="password">
          <label className='pass-text'>Re-enter new password</label> 
          <div className='pass-container'>
            <input className={`textfield ${darkMode ? 'input-url-dark' : 'input-url-light'}`}
                type={visible1 ? "text":"password"}
                required
                value={finalPass}
                onChange={handleConfirmChange} 
                placeholder='Enter password here' 
              />
              <div className='hide-pass2' onClick = {() => setVisible1(!visible1)}>
                  {visible1 ? <FaRegEye/> : <FaRegEyeSlash/>}
              </div>
          </div>
          {finalError && <div class={`pass-error ${darkMode ? 'error-dark' : 'error-light'}`}>{finalError}</div>}
        </div>

        <button className="reset-btn" onClick={handleSubmit}>
          <div className={`reset-overlap ${darkMode ? 'btn-dark' : 'btn-light'}`}>
            <div className={`reset ${darkMode ? 'btn-text-dark' : 'btn-text-light'}`}>Reset password</div>
          </div>
        </button>
        
      </div>
    </div>
  );
}

export default Password;