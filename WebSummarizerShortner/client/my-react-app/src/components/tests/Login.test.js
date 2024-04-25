import React from 'react';
import { render, fireEvent, waitFor, getByTestId, screen } from '@testing-library/react';
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

    expect(screen.getByText('Upgrade to Pro for FREE and unlock Tailored Summaries, Analytics and API Integration!')).toBeInTheDocument();
    expect(screen.getByText('Your email')).toBeInTheDocument();
    expect(screen.getByText('Your password')).toBeInTheDocument();
    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    const container = screen.getByTestId('account-container');
    expect(container).toHaveClass('account-light');
    
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

  test('styling changes on forgot password link on hover', () => {
    const { getByText } = render(
      <Router>
        <AuthProvider> 
        <LogIn />
        </AuthProvider>
      </Router>
    );

    const option = getByText('Forgot your password?'); 
    const initialStyle = window.getComputedStyle(option);
    fireEvent.mouseEnter(option);
    const newStyle = window.getComputedStyle(option);
    expect(newStyle).not.toEqual(initialStyle);
      
  });

  test('styling changes on create account button on hover', () => {
    const { getByText } = render(
      <Router>
        <AuthProvider> 
        <LogIn />
        </AuthProvider>
      </Router>
    );
      
    const option = getByText('Create an account'); 
    const initialStyle = window.getComputedStyle(option);
    fireEvent.mouseEnter(option);
    const newStyle = window.getComputedStyle(option);
    expect(newStyle).not.toEqual(initialStyle);

  });

  test('styling changes on facebook login button on hover', () => {
    const { getByText } = render(
      <Router>
        <AuthProvider> 
        <LogIn />
        </AuthProvider>
      </Router>
    );

    const option = getByText('Log in with Facebook'); 
    const initialStyle = window.getComputedStyle(option);
    fireEvent.mouseEnter(option);
    const newStyle = window.getComputedStyle(option);
    expect(newStyle).not.toEqual(initialStyle);
  });
  
});