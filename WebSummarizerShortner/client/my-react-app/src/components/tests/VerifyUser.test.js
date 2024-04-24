import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import VerifyUser from '../VerifyUser.js';

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
        darkMode: false, // Set darkMode to false for testing
        setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
}));

describe('VerifyUser Component', () => {

    // Render Test
    it('renders without crashing', () => {
        render(<Router><VerifyUser /></Router>);
    });

    
});