import "./css/DropdownButton.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { forwardRef } from "react";
import { useTheme } from './ThemeContext.js'

const DropdownButton = forwardRef((props, ref) => {

  const { darkMode } = useTheme();

  const {children, open, toggle} = props

  return (
    <div 
      className={`dropdown-btn ${open? `${darkMode? 'button-open-dark' : 'button-open-light'}`: null} ${darkMode? 'ddm-dark': 'ddm-light'}`}
      onClick={toggle}
      ref={ref}
    >
      {children}
      <span className="toggle-icon"> 
          {open? <FaChevronUp/>: <FaChevronDown/>} 
      </span>
    </div>  
  );
})
  
export default DropdownButton;