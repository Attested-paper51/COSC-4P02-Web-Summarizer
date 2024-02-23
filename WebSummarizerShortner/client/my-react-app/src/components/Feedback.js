import { FaStar } from 'react-icons/fa';
import "./css/FeedbackStyle.css";
import { useState } from 'react';

const Feedback = () => {

    const [rating, setRating] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [hover, setHover] = useState(null);

    

    const [thankyou, showThankyou] = useState(false);

    const handleRating = (e) => {
        console.log(rating) //number of stars stored in rating
        const Feedback = {feedback}
        console.log(Feedback)
        setRating(null)
        setFeedback('')

        setTimeout(() => {
            showThankyou('');
        }, 5000); // Reverts back to 'Submit' after 5 seconds
    }
    
    return (
        <div className='feedback'>
            <h2 className='feedback-title'>Rate your experience</h2>
            <p className='feedback-para'>
                We highly value your feedback! Kindly take a moment to
                rate your experience and provide us with your valuable feedback.
            </p>
            <div className='star-section'> 
            {[...Array(5)].map((star,index) => {
                const currentRating = index + 1;
                return(
                    <label className='five-stars'>
                        <input className='rating-input'
                            type="radio" 
                            name="rating" 
                            value={currentRating}
                            onClick={() => setRating(currentRating)}
                        />
                        <FaStar 
                            className='star' 
                            size={50} 
                            color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                ); 
                
            })}
            </div>
            <textarea
                className='feedback-input'
                id='input'
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder='Tell us about your experience'required>
            </textarea>
            <button 
                className='send-feedback' 
                onClick={()=> { handleRating(); showThankyou(true); }} >
                <div className='send'>Send</div>
            </button>

            { thankyou &&  
                <div className='thank you'>Thank you for your feedback!</div>
            }
        </div>
    );
}

export default Feedback;