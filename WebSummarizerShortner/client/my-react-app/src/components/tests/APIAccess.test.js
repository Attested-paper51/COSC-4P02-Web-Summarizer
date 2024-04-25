import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import APIAccess from '../APIAccess.jsx';

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
        darkMode: false, // Set darkMode to false for testing
        setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
}));

describe('APIAccess Component', () => {

    // Render Test
    it('renders without crashing', () => {
        render(<Router><APIAccess /></Router>);
    });

    test('switches to Summarizer section on Summarizer button click', () => {
        render(
            <APIAccess />
        );
    
        const summarizerButton = screen.getByText('API Access for Web Summarizer');
        fireEvent.click(summarizerButton);
    
        expect(screen.getByText('Summarizer API Documentation')).toBeInTheDocument();
      });

    test('switches to URL Shortener section on URL Shortener button click', () => {
        render(
            <APIAccess />
        );
    
        const shortenerButton = screen.getByText('API Access for URL Shortener');
        fireEvent.click(shortenerButton);
    
        expect(screen.getByText('URL Shortener API Documentation')).toBeInTheDocument();
      });

    test('fetches API key and displays it in the popup', async () => {
        // Mock the fetch API
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ key: 'testApiKey' }),
        });
    
        render(
            <APIAccess />
        );
    
        const getAPIKeyButton = screen.getByText('Get API Key');
        fireEvent.click(getAPIKeyButton);
    
        await waitFor(() => {
          expect(screen.getByText('API key created')).toBeInTheDocument();
          expect(screen.getByText('Your API key')).toBeInTheDocument();
          expect(screen.getByDisplayValue('testApiKey')).toBeInTheDocument();
        });
      });


    
});