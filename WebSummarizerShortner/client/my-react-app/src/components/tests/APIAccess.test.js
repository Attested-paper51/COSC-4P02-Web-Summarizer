import React from 'react';
import { render, screen, rerender } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import APIAccess from '../APIAccess'; // Update the path

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
      darkMode: false, // Set darkMode to false for testing
      setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
  }));

describe('APIAccess component', () => {
  test('renders api access content with light mode', () => {
    render(
      <Router>
        <APIAccess />
      </Router>
    );

    expect(screen.getByText('Setting up the Environment Variable')).toBeInTheDocument();
    expect(screen.getByText('Endpoints')).toBeInTheDocument();

    const container = screen.getByTestId('btn-overlap-container');
    expect(container).toHaveClass('btn-light');
  });

});
