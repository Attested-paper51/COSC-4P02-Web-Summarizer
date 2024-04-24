import { forwardRef } from "react";
import "./css/DropdownContent.css";
import { useTheme } from '../context/ThemeContext.js'

const DropdownContent = forwardRef((props, ref) => {

  const { darkMode } = useTheme();
  const {children, open, top, toggle} = props

  return (
    <div 
      ref={ref}
      className={`dropdown-content ${open? "content-open":"content-close"} ${darkMode? "ddc-dark":"ddc-light"}`}
      style={{top: top? `${top}px`: "100%"}}
      onClick={toggle}>
        {children}
    </div>  
  );
})

export default DropdownContent;