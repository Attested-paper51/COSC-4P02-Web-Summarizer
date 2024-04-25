import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import URLShortener from '../URLShortener';

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
      darkMode: false, // Set darkMode to false for testing
      setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
  }));

describe('URLShortener Component', () => {
  // Render Test
  it('renders without crashing', () => {
    render(<URLShortener />);
  });

  // Test for handling input change
  it('updates URL input value on change', async () => {
    render(<URLShortener />);
    const input = screen.getByPlaceholderText('Enter URL here');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    expect(input.value).toBe('https://example.com');
  });

  // Test for submitting empty URL 
  it('displays error message when submitting empty URL', async () => {
    render(<URLShortener />);
    const input = screen.getByPlaceholderText('Enter URL here');
    const button = screen.getByText('Shorten URL');
    fireEvent.change(input, { target: { value: '' } }); // Empty input
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText('Please enter a URL to be shortened.')).toBeInTheDocument();
    });
  });




  
});
