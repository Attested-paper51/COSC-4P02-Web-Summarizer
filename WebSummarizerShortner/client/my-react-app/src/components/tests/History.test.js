import React from 'react';
import { render } from '@testing-library/react';
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

    
});