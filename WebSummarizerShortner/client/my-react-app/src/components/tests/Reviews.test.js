import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Reviews from '../Reviews';


// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
        darkMode: false, // Set darkMode to false for testing
        setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
}));

describe('<Reviews />', () => {
  test('renders without crashing', () => {
    render(<Reviews />);
  });

//   test('at least one feedback from data is rendered in the document', () => {
//     render(<Reviews />);
//     let isFeedbackRendered = false;
//     data.forEach(({ feedback }) => {
//         if (!isFeedbackRendered) {
//         const feedbackElement = screen.queryByText(feedback);
//       console.log('Feedback:', feedback);
//       console.log('Feedback Element:', feedbackElement);
//         if (feedbackElement) {
//             isFeedbackRendered = true;
//         }
//         }
//     });
//     expect(isFeedbackRendered).toBe(true);
//    });

});


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
