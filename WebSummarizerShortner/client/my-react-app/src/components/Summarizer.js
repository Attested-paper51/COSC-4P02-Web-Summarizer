import { useState, useEffect } from "react";
import "./css/SummarizerStyle.css";
import "./css/SignUpStyle.css";
// import { FaTrashCan } from "react-icons/fa6";
import { GoThumbsdown } from "react-icons/go";
import { GoThumbsup } from "react-icons/go";
import { IoClipboardOutline } from "react-icons/io5";
import { IoClipboard } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import DialogBox from '../components/DialogBox.js';

const Summarizer = () => {
    const [inputContent, setInputContent] = useState('');
    const [outputContent, setOutputContent] = useState('');
    const [open, setOpen] = useState(false);

    // for opening Dialog Box
    const handleOpen = () => {
        setOpen(true);
    }

    // for closing Dialog Box
    const handleClose = () => {
        setOpen(false);
    }

    // detecting input text change
    const handleInputChange = (event) => {
        setInputContent(event.target.value);
    }

    // detecting output text change
    const handleOutputChange = (event) => {
        setOutputContent(event.target.value);
    }

    /** every render: checks if output has text
     *  if it does, then makes output editable
     *  else, keeps it readOnly*/
    useEffect(() => {
        // runs after every render
        const output = document.getElementById("output");
        if(outputContent !== '') {
            output.readOnly = false;
        }
        else {
            output.readOnly = true;
        }
    });

    const componentDidMount = () =>
    {
        // // This is called after the component has been mounted to the DOM
        // const inputArea = document.querySelector("textarea");
        // const outputArea = document.getElementById("output"); 
        // // Now you can work with the textarea
        // inputArea.addEventListener("input", e =>
        // {
        //     inputArea.style.height = "60.5vh";
        //     //alert(inputArea.style.height)
        //     outputArea.style.height = inputArea.style.height;
        //     let height = e.target.scrollHeight;
        //     //alert(height)
        //     inputArea.style.height = `${(height / window.innerHeight) * 100}vh`;
        //     outputArea.style.height = inputArea.style.height;
        // })

        // //Add an additional check for the window resize event
        // window.addEventListener("resize", () => {
        //     // Reset the height when the window is resized
        //     inputArea.style.height = "60.5vh";
        //     outputArea.style.height = inputArea.style.height;
        // });
    }

    // empties input and output
    const emptyTextContent = () => {
        setInputContent('');
        setOutputContent('');
    }

    // empties content and closes Dialog Box
    const handleConfirm = () => {
        emptyTextContent();
        handleClose();
    }

    // functions can be changed accordingly
    const thumbsUp = () => {
        console.log("Output summary is good!")
    }
    const thumbsDown = () => {
        console.log("Output summary is bad.")
    }

    const [isCopied, setCopy] = useState(false);
    const copySummary = () => {
        navigator.clipboard.writeText(outputContent)
        setCopy(!isCopied);
    }

    return (
        <div className="wrapper">
            <h2>Summarizer</h2>
            <div className="text">
                <div className="inputArea">
                    <textarea
                        id='input' 
                        placeholder='Paste your text here...' 
                        value={inputContent} 
                        onChange={handleInputChange} 
                        required>    
                    </textarea>
                    { inputContent &&
                        (<button className='delete-button' onClick={handleOpen}><FaRegTrashCan size={18} /></button>)
                    }
                    <div className='buttonDiv'>
                        <button className="signup-btn">
                            <div className="summarize-overlap">
                                <div className="summarize">Summarize</div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="inputArea">
                    <textarea 
                        id='output'
                        placeholder='Get output here...' 
                        value={outputContent} 
                        onChange={handleOutputChange} 
                        required
                        readOnly>   
                    </textarea>
                    <div className='buttonDiv'></div>
                    <button className='feedback-up' onClick={thumbsUp}><GoThumbsup size={19}/></button>
                    <button className='feedback-down' onClick={thumbsDown}><GoThumbsdown size={19}/></button>
                    <button className='copy-button' onClick={copySummary}>{isCopied ? <IoClipboard size={17}/> : <IoClipboardOutline size={17}/>}</button>
                    
                </div>
            </div>
            <DialogBox 
            open={open} 
            onClose={handleClose}
            title={"Delete Text"}
            content={"You're about to delete the Original and Summarized text."}
            confirmText={"Continue"}
            onConfirm={handleConfirm}
            />
        </div>
    );
}

export default Summarizer;
