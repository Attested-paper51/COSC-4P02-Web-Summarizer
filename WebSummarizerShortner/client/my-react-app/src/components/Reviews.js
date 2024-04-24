import { FaQuoteRight, FaStar } from 'react-icons/fa';
import "./css/ReviewsStyle.css";
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';
import { useTheme } from '../context/ThemeContext.js';

const Reviews = () => {

    const { darkMode } = useTheme();

    const responsive = {
        desktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 650 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 650, min: 0 },
            items: 1
        } 
    }

      return (
        <div className={`reviews ${darkMode ? 'reviews-dark' : 'reviews-light'}`}>
            
            <Carousel 
                className="carousel" 
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={600}
                swipeable={true}
                focusOnSelect={true}>
                {data.map((d) => (
                <div className={`review-container ${darkMode ? 'review-cont-dark' : 'review-cont-light'}`}>
                    <div className='review-wrapper'> 
                        <div className='review-div'>
                            <p className='review-text'>
                                {d.feedback}
                            </p>
                            { /*<FaQuoteRight className='right-quote' /> */}
                        </div>
                        <div className='review-star-section'> 
                            {[...Array(5)].map((star,index) => {
                                const currentRating = index + 1;
                                return(
                                    <label className='five-stars'>
                                        <FaStar 
                                            className='review-star'  
                                            color={currentRating <= d.rating ? "#ffc107" : "#e4e5e9"}
                                        />
                                    </label>
                                );   
                            })}   
                        </div>
                    </div>
                </div> 
                ))}
            </Carousel>
            
        </div>
      );
    
  }

const data = [
    {
        feedback: 'This summarization tool is an absolute lifesaver!',
        rating: '5'
    },
    {
        feedback: 'This website streamlines text summarization with precision.',
        rating: '4'
    },
    {
        feedback: 'Brilliantly effective! This website nails the art of summarization with finesse.',
        rating: '5'
    },
    {
        feedback: 'Time-saving gem! Say goodbye to long hours of reading',
        rating: '5'
    },
    {
        feedback: 'Effortless URL shortening! Saves space and looks clean.',
        rating: '4'
    },
    {
        feedback: 'Simple and effective. Perfect for sharing long links.',
        rating: '5'
    },
    {
        feedback: 'Instant results! Makes sharing links a breeze.',
        rating: '5'
    },
    {
        feedback: 'Love the simplicity! ',
        rating: '4'
    },
    {
        feedback: 'Quick and accurate summaries! Perfect for YouTube videos.',
        rating: '5'
    },
    {
        feedback: 'Instant understanding! Makes YouTube videos digestible.',
        rating: '5'
    }
]
  
export default Reviews;
