import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import Templates from '../Templates.jsx';

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
        darkMode: false, // Set darkMode to false for testing
        setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
}));

describe('Templates Component', () => {

    // Render Test
    it('renders without crashing', () => {
        render(<Router><Templates /></Router>);
    });

    test('renders templates content', () => {
        render(
          <Router>
            <Templates />
          </Router>
        );
    
        expect(screen.getByText('Template 1')).toBeInTheDocument();
        expect(screen.getByText('Template 2')).toBeInTheDocument();
        expect(screen.getByText('Template 3')).toBeInTheDocument();

        const heroContainer = screen.getByTestId('summarize-btn-container');
        expect(heroContainer).toHaveClass('btn-light');

    });

    
});