import "./css/DropdownItem.css";

const DropdownContent = ({children, onClick}) => {
    return (
      <div 
        className="dropdown-item"
        onClick={onClick}>
        {children}
      </div>  
    );
}

export default DropdownContent;