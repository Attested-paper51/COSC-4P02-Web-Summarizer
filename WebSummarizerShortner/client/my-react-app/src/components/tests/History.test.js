import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import History from '../History.jsx';

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
        darkMode: false, // Set darkMode to false for testing
        setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
}));

describe('History Component', () => {

    // Render Test
    it('renders without crashing', () => {
        render(<Router><History /></Router>);
    });

    test('renders history content', () => {
        render(
          <Router>
            <History />
          </Router>
        );
    
        expect(screen.getByText('History')).toBeInTheDocument();
        expect(screen.getByText('Web Summarizer History')).toBeInTheDocument();
        expect(screen.getByText('URL Shortener History')).toBeInTheDocument();
    
    });

    test('switches to Summarizer section on Summarizer button click', () => {
        render(
            <History />
        );
    
        const summarizerButton = screen.getByText('Web Summarizer History');
        fireEvent.click(summarizerButton);
    
        expect(screen.getByText('Summarized Prompt')).toBeInTheDocument();
    });
    
    test('switches to URL Shortener section on URL Shortener button click', () => {
        render(
            <History />
        );
    
        const shortenerButton = screen.getByText('URL Shortener History');
        fireEvent.click(shortenerButton);
    
        expect(screen.getByText('Shortened Link')).toBeInTheDocument();
    });

    // test('selects all rows in Summarizer section', async () => {
    //   render(<History />);

    //   fireEvent.click(screen.getByText('Web Summarizer History'));

    //   await waitFor(() => {
    //     fireEvent.click(screen.getByTestId('select-all-button'));
    //     const checkboxes = screen.getAllByTestId('checkbox');
    //     checkboxes.forEach((checkbox) => {
    //       expect(checkbox).toBeChecked();
    //     });
    //   });
    // });
});