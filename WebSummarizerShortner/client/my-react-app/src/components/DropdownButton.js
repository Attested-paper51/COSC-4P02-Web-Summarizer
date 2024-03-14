import "./css/DropdownButton.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { forwardRef } from "react";

const DropdownButton = forwardRef((props, ref) => {
  const {children, open, toggle} = props

  return (
    <div 
      className={`dropdown-btn ${open? "button-open": null}`}
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