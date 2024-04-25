import React from 'react';
import { render, screen, rerender } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from '../SignUp'; // Update the path

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
      darkMode: false, // Set darkMode to false for testing
      setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
  }));

describe('SignUp component', () => {
  test('renders sign up content with light mode', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    expect(screen.getByText('Join us to access to Tailored Summaries, Analytics, API Integration and more!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter name here')).toBeInTheDocument();
    expect(screen.getByText("8 to 20 characters long")).toBeInTheDocument();

    const container = screen.getByTestId('box-container');
    expect(container).toHaveClass('login-light');
    const textfield = screen.getByTestId('textfield-container');
    expect(textfield).toHaveClass('input-url-light');

  });

});
