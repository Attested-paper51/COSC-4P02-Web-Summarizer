import "./css/SummarizerStyle.css";
import "./css/SignUpStyle.css";
// import { FaTrashCan } from "react-icons/fa6";
import { GoThumbsdown } from "react-icons/go";
import { GoThumbsup } from "react-icons/go";
import { IoClipboardOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";

const Summarizer = () => {
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

    const emptyInput = () => {
        const textarea = document.getElementById('input');
        textarea.value = '';
    }

    // functions can be changed accordingly
    const thumbsUp = () => {
        console.log("Output summary is good!")
    }
    const thumbsDown = () => {
        console.log("Output summary is bad.")
    }
    const copySummary = () => {
        console.log("Output summary is copied!")
    }

    return (
        <div className="wrapper">
            <h2>Summarizer</h2>
            <div className="text">
                <div className="inputArea">
                    <textarea
                        id='input' 
                        placeholder='Paste your text here...' 
                        required>    
                    </textarea>
                    <button className='delete-button' onClick={emptyInput}><FaRegTrashCan size={18}/></button>
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
                        required
                        readOnly>   
                    </textarea>
                    <div className='buttonDiv'></div>
                    <button className='feedback-up' onClick={thumbsUp}><GoThumbsup size={19}/></button>
                    <button className='feedback-down' onClick={thumbsDown}><GoThumbsdown size={19}/></button>
                    <button className='copy-button' onClick={copySummary}><IoClipboardOutline size={17}/></button>
                </div>
            </div>
        </div>
    );
}

export default Summarizer;
