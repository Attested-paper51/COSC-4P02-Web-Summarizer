import React from 'react';
import { render, screen, rerender, fireEvent } from '@testing-library/react';
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

    test('selects "Text" button and deselects others when clicked', () => {
        const { getByText } = render(<Router><Summarizer /></Router>);
    
        // Click the "Text" button
        fireEvent.click(getByText('Text'));
    
        // Test if the "Text" button is selected and others are not
        expect(getByText('Text')).toHaveClass('customSumBtn clicked-light disabled-hover-light btn-text-dark');
        expect(getByText('Website URL')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
        expect(getByText('Youtube URL')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
    });
    
    test('selects "Website URL" button and deselects others when clicked', () => {
        const { getByText } = render(<Router><Summarizer /></Router>);

        // Click the "Website URL" button
        fireEvent.click(getByText('Website URL'));

        // Test if the "Website URL" button is selected and others are not
        expect(getByText('Text')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
        expect(getByText('Website URL')).toHaveClass('customSumBtn clicked-light disabled-hover-light btn-text-dark');
        expect(getByText('Youtube URL')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
    });
    
    test('selects "Youtube URL" button and deselects others when clicked', () => {
        const { getByText } = render(<Router><Summarizer /></Router>);

        // Click the "Youtube URL" button
        fireEvent.click(getByText('Youtube URL'));

        // Test if the "Youtube URL" button is selected and others are not
        expect(getByText('Text')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
        expect(getByText('Website URL')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
        expect(getByText('Youtube URL')).toHaveClass('customSumBtn clicked-light disabled-hover-light btn-text-dark');
    });
});
