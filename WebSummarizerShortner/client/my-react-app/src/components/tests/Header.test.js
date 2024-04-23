import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa'; // Import FaMoon and FaSun components
import Header from '../Header';

// Mock the ThemeContext module
// const setDarkMode = jest.fn();
jest.mock('../ThemeContext.js', () => ({
  useTheme: () => ({
    darkMode: false, // Set darkMode to false for testing
    setDarkMode: jest.fn(), // Mock setDarkMode function
  }),
}));

describe('Header component', () => {
  test('renders header with navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText('shortify')).toBeInTheDocument();
    expect(screen.getByText('SUMMARIZER')).toBeInTheDocument();
    expect(screen.getByText('URL SHORTENER')).toBeInTheDocument();
  });

  // test('changes icon on button click', () => {
  //   render(
  //     <BrowserRouter>
  //       <Header />
  //     </BrowserRouter>
  //   );
  //   // Find the button by its data-testid attribute
  //   const modeButton = screen.getByTestId('mode-button');

  //  // Assert that the initial icon is FaMoon
  //  expect(modeButton).toContainElement(screen.getByTestId('moon-icon'));

  //  // Simulate a click event on the button
  //  fireEvent.click(modeButton);
  //  setDarkMode(true) // Set darkMode to false for testing

  // // Assert that the updated icon is FaSun
  // //  expect(modeButton).toContainElement(screen.getByTestId('sun-icon'));
  // // Wait for the icon update to complete
  // expect(modeButton).toContainElement(screen.getByTestId('sun-icon'));

  // });

});
