import { FaQuoteRight, FaStar } from 'react-icons/fa';
import "./css/ReviewsStyle.css";
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';


const Reviews = () => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
          },
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
          }
    }

      return (
        <div className='reviews'>
            
            <Carousel className="carousel" responsive={responsive}>
                {data.map((d) => (
                <div className='review-container'>
                    <p className='review-text'>
                        {d.feedback}
                        <FaQuoteRight className='right-quote' size={20}/>
                    </p>

                    <div className='star-section'> 
                        {[...Array(5)].map((star,index) => {
                            const currentRating = index + 1;
                            return(
                                <label className='five-stars'>
                                    <FaStar 
                                        className='star' 
                                        size={25} 
                                        color={currentRating <= d.rating ? "#ffc107" : "#e4e5e9"}
                                    />
                                </label>
                            );   
                        })}   

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
        feedback: 'Simplify with style! This website streamlines text summarization with elegance and precision.',
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
