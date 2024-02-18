import React, { Component } from 'react';
import "./css/SummarizerStyle.css";
import "./css/SignUpStyle.css";

class Summarizer extends Component 
{
    componentDidMount()
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

    render() 
    {
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
                        <div className='buttonDiv'>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Summarizer;
