import "./css/DropdownItem.css";
import { useTheme } from '../context/ThemeContext.js'

const DropdownContent = ({children, onClick}) => {

    const { darkMode } = useTheme();
    return (
      <div 
        className={`dropdown-item ${darkMode ? 'ddi-dark' : 'ddi-light'}`}
        onClick={onClick}>
        {children}
      </div>  
    );
}

export default DropdownContent;