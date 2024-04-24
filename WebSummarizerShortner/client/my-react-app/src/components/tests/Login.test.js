import React from 'react';
import { render, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from '../../context/AuthContext.js'; // Import the AuthProvider
import LogIn from '../LogIn.js'; 

// Mocking the google object
global.google = {
    accounts: {
      id: {
        initialize: jest.fn(),
        renderButton: jest.fn()
      }
    }
}; 

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
      darkMode: false, // Set darkMode to false for testing
      setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
}));

describe('Login component', () => {

    test('renders login content with light mode', () => {
      render(
        <Router>
          <AuthProvider> {/* Wrap LogIn with AuthProvider */}
            <LogIn />
          </AuthProvider>
        </Router>
      );
    });


    test('toggles password visibility on click', () => {
        const { getByTestId, getByPlaceholderText } = render(
        <Router>
            <AuthProvider> 
            <LogIn />
            </AuthProvider>
        </Router>
        );
        const passwordInput = getByPlaceholderText('Enter password here');
        const visibilityButton = getByTestId('hide-pass');

        fireEvent.click(visibilityButton);
        expect(passwordInput).toHaveAttribute('type', 'text');

        fireEvent.click(visibilityButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

  
});