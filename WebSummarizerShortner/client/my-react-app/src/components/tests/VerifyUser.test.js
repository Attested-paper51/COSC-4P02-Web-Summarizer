import React from 'react';
import { render, screen, rerender } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import VerifyUser from '../VerifyUser'; // Update the path

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
      darkMode: false, // Set darkMode to false for testing
      setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
  }));

describe('VerifyUser component', () => {
  test('renders user verification content with light mode', () => {
    render(
      <Router>
        <VerifyUser />
      </Router>
    );

    expect(screen.getByText('Verifying User')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email here')).toBeInTheDocument();
    expect(screen.getByText("Forgot your password? Don't worry, it happens! Enter your email below to reset your password")).toBeInTheDocument();

    const container = screen.getByTestId('verify-box-container');
    expect(container).toHaveClass('login-light');
  });

});
