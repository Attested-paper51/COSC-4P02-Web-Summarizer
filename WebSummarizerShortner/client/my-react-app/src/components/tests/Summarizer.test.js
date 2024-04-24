import React from 'react';
import { render, screen, rerender } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Summarizer from '../Summarizer'; // Update the path

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
      darkMode: false, // Set darkMode to false for testing
      setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
}));

describe('Summarizer component', () => {
    test('renders Summarizer content with light mode', () => {
        render(
            <Router>
            <Summarizer />
            </Router>
        );

        // Check if Summarizer content is rendered
    });
});
