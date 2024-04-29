import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Reviews from '../Reviews';


// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
        darkMode: false, // Set darkMode to false for testing
        setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
}));

describe('<Reviews />', () => {
  test('renders without crashing', () => {
    render(<Reviews />);
  });

});

