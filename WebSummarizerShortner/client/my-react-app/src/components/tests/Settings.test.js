import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import Settings from '../Settings.jsx';

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
        darkMode: false, // Set darkMode to false for testing
        setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
}));

describe('Settings Component', () => {

    // Render Test
    it('renders without crashing', () => {
        render(<Router><Settings /></Router>);
    });

    test('renders settings content', () => {
        render(
          <Router>
            <Settings />
          </Router>
        );
    
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Subscription Plan')).toBeInTheDocument();
    
    });

    test('delete account popup appears on button click', () => {
        render(
            <Router>
                <Settings />
            </Router>
        );
    
        const deleteButton = screen.getByText('Delete Account');
        fireEvent.click(deleteButton);
        expect(screen.getByText('Are you sure you want to delete your account permanently?')).toBeInTheDocument();
    });

});