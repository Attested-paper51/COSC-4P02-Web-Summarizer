import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import "./css/DashboardStyle.css";

const PopUp = (props) => {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <div className='popup-title'>
                    <h3>{props.title}</h3>
                    <button className='popup-close' onClick={() => props.setTrigger(false)}><IoMdClose /></button>
                </div>
                <div className='popup-content'>{props.children}</div>
            </div>
        </div>
    ) : "";
}

export default PopUp;