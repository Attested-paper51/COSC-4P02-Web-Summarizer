import React, { Component } from 'react';
import "./css/SummarizerStyle.css";

// const TextboxWithButton = () => {
//   const [text, setText] = useState('');
class Summarizer extends Component {
    componentDidMount()
    {
        // This is called after the component has been mounted to the DOM
        const inputArea = document.querySelector("textarea");
        const outputArea = document.getElementById("output") 
        // Now you can work with the textarea
        inputArea.addEventListener("input", e =>{
            inputArea.style.height = "60.5vh";
            //alert(inputArea.style.height)
            outputArea.style.height = inputArea.style.height;
            let height = e.target.scrollHeight;
            //alert(height)
            inputArea.style.height = `${(height / window.innerHeight) * 100}vh`;
            outputArea.style.height = inputArea.style.height;
        })

        // //Add an additional check for the window resize event
        // window.addEventListener("resize", () => {
        //     // Reset the height when the window is resized
        //     inputArea.style.height = "60.5vh";
        //     outputArea.style.height = inputArea.style.height;
        // });
    }

    render() 
    {
        let handleChange = (event) => {
        //setText(event.target.value);
        // event.target.style.height = "auto";
        // let scHeight = event.target.scrollHeight;
        // event.target.style.height = scHeight;
        };

        return (
            // <div style={{ display: 'flex', flexDirection: 'column', height: '400px', maxWidth: '400px', position: 'relative' }}>
            //   <textarea
            //     style={{
            //       resize: 'none',
            //       overflowY: 'auto',
                
            //       height: '50vh',
            //       border: '0',
            //       marginBottom: '0px', // Height of the button container
            //     }}
            //     value={text}
            //     onChange={handleChange}
            //   />
            //   <div style={{ position: 'absolute', bottom: '0', right: '0' }}>
            //     <button onClick={() => console.log('Summarize')}>Summarize</button>
            //   </div>
            // </div>
            <div class="wrapper">
                <h2>Summarizer</h2>
                <div class="text">
                    <textarea
                        id='input' 
                        onChange={handleChange} 
                        placeholder='Paste your text here...' required>    
                    </textarea>
                    <textarea 
                        id='output'
                        onChange={handleChange} 
                        placeholder='Get output here...' required>    
                    </textarea>
                </div>
            </div>
        );
    }
}

export default Summarizer;
