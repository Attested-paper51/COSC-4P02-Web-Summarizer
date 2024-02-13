import React, { Component } from 'react';
import "./css/SummarizerStyle.css";

// const TextboxWithButton = () => {
//   const [text, setText] = useState('');
class Summarizer extends Component {
    // constructor(props) 
    // {
    //     super(props);
    //     this.state = 
    //     {
    //         visible: this.props
    //     }
    //     console.log(this.state.visible.visible)
    // }

    componentDidMount()
    {
        // const SummVisible = this.state.visible.visible;
        const { visible } = this.props;

        if(!visible)
        {
            // This is called after the component has been mounted to the DOM
            const inputArea = document.querySelector("textarea");
            const outputArea = document.getElementById("output"); 
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
    }

    render() 
    {
        //const { visible } = this.props;
        return (
            // <div>
            //     {!visible && (
                    <div className="wrapper">
                        <h2>Summarizer</h2>
                        <div className="text">
                            <textarea
                                id='input' 
                                placeholder='Paste your text here...' required>    
                            </textarea>
                            <textarea 
                                id='output'
                                placeholder='Get output here...' required>    
                            </textarea>
                        </div>
                    </div>
            //     )}
            // </div>
        );
    }
}

export default Summarizer;
