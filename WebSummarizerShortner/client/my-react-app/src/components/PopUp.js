import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import "./css/DashboardStyle.css";
import { useTheme } from '../context/ThemeContext.js'

const PopUp = (props) => {

    const { darkMode } = useTheme();

    return (props.trigger) ? (
        <div className='popup'>
            <div className={`popup-inner ${darkMode ? 'popup-dark' : 'popup-light'}`}>
                <div className='popup-title'>
                    <h3>{props.title}</h3>
                    <button className='popup-close' onClick={() => props.setTrigger(false)}><IoMdClose className='popup-close-icon' /></button>
                </div>
                <div className='popup-content'>{props.children}</div>
            </div>
        </div>
    ) : "";
}

export default PopUp;