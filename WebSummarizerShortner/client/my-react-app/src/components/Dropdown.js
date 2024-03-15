// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownButton from "./DropdownButton";
import DropdownContent from "./DropdownContent";
import { useState, useEffect, useRef } from "react";
import "./css/Dropdown.css";

const Dropdown = ({buttonText, content}) => {
    const [open, setOpen] = useState(false)
    const [dropdownTop, setDropdownTop] = useState(0)
    const dropdownRef = useRef()
    const buttonRef = useRef()
    const contentRef = useRef()

    const toggleDropdown = () => {
        if(!open) {
            const spaceRemaining = window.innerHeight - buttonRef.current.getBoundingClientRect().bottom  
            const contentHeight = contentRef.current.clientHeight
            const topPosition = spaceRemaining > contentHeight? null: spaceRemaining - contentHeight
            setDropdownTop(topPosition)
        }
        setOpen((open) => !open)
    }

    useEffect(() => {
        // if a click did happen but it's not on the actual dropdown
        const handler = (event) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("click", handler)

        // cleanup function run when component is not on the page
        return () => {
            document.removeEventListener("click", handler)
        }
    }, [])

    return (
        // <DropdownButton id="dropdown-item-button" title="Dropdown button">
        //   <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
        //   <Dropdown.Item as="button">Action</Dropdown.Item>
        //   <Dropdown.Item as="button">Another action</Dropdown.Item>
        //   <Dropdown.Item as="button">Something else</Dropdown.Item>
        // </DropdownButton>
        <div className="dropdown" ref={dropdownRef}>
            <DropdownButton ref={buttonRef} toggle={toggleDropdown} open={open}>
                {buttonText}
            </DropdownButton>

            <DropdownContent top={dropdownTop} toggle={toggleDropdown} ref={contentRef} open={open}>
                {content}
            </DropdownContent>
        </div>
    );
}

export default Dropdown;