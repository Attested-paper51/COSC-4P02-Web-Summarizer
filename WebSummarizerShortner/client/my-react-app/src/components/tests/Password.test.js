import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import Password from '../Password.js';

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
        darkMode: false, // Set darkMode to false for testing
        setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
}));

describe('Password Component', () => {

    // Render Test
    it('renders without crashing', () => {
        render(<Router><Password /></Router>);
    });

    
});