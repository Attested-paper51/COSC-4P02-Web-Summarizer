import React from 'react';
import { render, screen, rerender } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Hero from '../Hero'; // Update the path

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
      darkMode: false, // Set darkMode to false for testing
      setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
  }));

describe('Hero component', () => {
  test('renders hero content with light mode', () => {
    render(
      <Router>
        <Hero />
      </Router>
    );

    // Check if hero content is rendered
    expect(screen.getByText('Your shortcut to simplicity.')).toBeInTheDocument();
    expect(screen.getByText('Say goodbye to lengthy URLs and information overload — discover the power of simplicity with our intuitive platform.')).toBeInTheDocument();
    expect(screen.getByText('Try it now!')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    // Assert that the background color is light in light mode
    const heroContainer = screen.getByTestId('hero-container');
    expect(heroContainer).toHaveClass('hero-light');
  });

});
