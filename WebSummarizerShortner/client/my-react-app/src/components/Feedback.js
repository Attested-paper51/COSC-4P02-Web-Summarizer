import { FaStar } from 'react-icons/fa';
import "./css/FeedbackStyle.css";
import { useState } from 'react';

const Feedback = () => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleRating = (e) => {
        console.log(rating) //number of stars stored in rating
    }
    return (
        <div>
            {[...Array(5)].map((star,index) => {
                const currentRating = index + 1;
                return(
                    <label>
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
            <textarea
                id='input'
                placeholder='Type Feedback here'required>
            </textarea>
            <button onClick={handleRating}>Submit</button>
        </div>
    );
}

export default Feedback;