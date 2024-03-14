import { forwardRef } from "react";
import "./css/DropdownContent.css";

const DropdownContent = forwardRef((props, ref) => {
  const {children, open, top, toggle} = props

  return (
    <div 
      ref={ref}
      className={`dropdown-content ${open? "content-open":null}`}
      style={{top: top? `${top}px`: "100%"}}
      onClick={toggle}>
        {children}
    </div>  
  );
})

export default DropdownContent;