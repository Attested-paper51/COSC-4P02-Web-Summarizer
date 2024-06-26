import React from 'react';
import { render, screen, rerender, fireEvent, waitFor, act, getByTestId } from '@testing-library/react';
//import { clipboard } from 'jest-clipboard';
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
        const screen = render(
            <Router>
            <Summarizer />
            </Router>
        );  
        expect(screen).toBeTruthy()
    });

    // Mode Tests
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
        const { getByText } = render(<Summarizer />);

        // Click the "Website URL" button
        fireEvent.click(getByText('Website URL'));

        // Test if the "Website URL" button is selected and others are not
        expect(getByText('Text')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
        expect(getByText('Website URL')).toHaveClass('customSumBtn clicked-light disabled-hover-light btn-text-dark');
        expect(getByText('Youtube URL')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
    });
    
    test('selects "Youtube URL" button and deselects others when clicked', () => {
        const { getByText } = render(<Summarizer />);

        // Click the "Youtube URL" button
        fireEvent.click(getByText('Youtube URL'));

        // Test if the "Youtube URL" button is selected and others are not
        expect(getByText('Text')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
        expect(getByText('Website URL')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
        expect(getByText('Youtube URL')).toHaveClass('customSumBtn clicked-light disabled-hover-light btn-text-dark');
    });

    test('typing into the input field updates the value', () => {
        // Render the component
        const { container  } = render(<Summarizer />);

        const inputField = container.querySelector('#inputText');
        fireEvent.change(inputField, { target: { value: 'Test input' } });

        expect(inputField).toHaveValue('Test input');
    });
});
