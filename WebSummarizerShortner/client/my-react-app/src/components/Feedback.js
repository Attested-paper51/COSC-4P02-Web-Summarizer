import { FaStar } from 'react-icons/fa';
import "./css/FeedbackStyle.css";
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext.js'

const Feedback = () => {

    const { darkMode } = useTheme();

    const [rating, setRating] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [hover, setHover] = useState(null);

    const [thankyou, showThankyou] = useState(false);

    const handleRating = async () => {
        //console.log(rating) //number of stars stored in rating
        //const Feedback = {feedback}
        //console.log(Feedback)

        
        try {
    
            // Make a POST request to the Flask backend
            //const response = await fetch('http://4p02shortify.com:5001/addfeedback', { //Server use only
            const response = await fetch('http://localhost:5001/addfeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating, feedback}),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
                
                

            }
        } catch (error) {
            console.error('Error:', error.message);
        }

        setRating(null)
        setFeedback('')

        setTimeout(() => {
            showThankyou('');
        }, 5000); // Reverts back to 'Submit' after 5 seconds
    }
    
    return (
        <div className={`feedback ${darkMode ? "feedback-dark" : "feedback-light"}`}>
            <div className='feedback-wrapper'>
                <h2 className='feedback-title'>Rate your experience</h2>
                <p className='feedback-para'>
                    We highly value your feedback! Kindly take a moment to
                    rate your experience and provide us with your valuable feedback.
                </p>
                <div className='star-section'> 
                {[...Array(5)].map((star,index) => {
                    const currentRating = index + 1;
                    return(
                        <label className='five-stars' key={currentRating}>
                            <input className='rating-input'
                                type="radio" 
                                name="rating" 
                                value={currentRating}
                                onClick={() => setRating(currentRating)}
                            />
                            <FaStar 
                                className='star'
                                color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    ); 
                    
                })}
                </div>
                <textarea
                    className={`feedback-input ${darkMode ? "feedback-input-dark" : "feedback-input-light"}`}
                    id='input'
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder='Tell us about your experience'
                    required>
                </textarea>
                <button 
                    className={`send-feedback ${darkMode ? "btn-dark" : "btn-light"}`} 
                    onClick={()=> { handleRating(); showThankyou(true); }} >
                    <div className={`send ${darkMode ? "btn-text-dark" : "btn-text-light"}`}>Send</div>
                </button>

                { thankyou &&  
                    <div className='thank you'>Thank you for your feedback!</div>
                }
            </div>
            
        </div>
    );
}

export default Feedback;