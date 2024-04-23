import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header component', () => {
  it('renders without crashing', () => {
    render(<Header />);
    // Check if the component renders without crashing
    expect(screen.getByText('shortify')).toBeInTheDocument();
  });

//   it('toggles dark mode when mode button is clicked', () => {
//     render(<Header />);
//     const modeButton = screen.getByRole('button', { name: /mode/i });

//     // Initially, dark mode is off
//     expect(document.body).toHaveClass('header-light');

//     // Click the mode button to toggle dark mode
//     fireEvent.click(modeButton);

//     // Check if dark mode is toggled
//     expect(document.body).toHaveClass('header-dark');

//     // Click the mode button again to toggle back to light mode
//     fireEvent.click(modeButton);

//     // Check if light mode is toggled back
//     expect(document.body).toHaveClass('header-light');
//   });

//   it('displays user profile and email when logged in', () => {
//     // Mock localStorage values
//     const mockEmail = 'test@example.com';
//     const mockName = 'Test User';
//     localStorage.setItem('email', mockEmail);
//     localStorage.setItem('name', mockName);

//     render(<Header />);

//     // Check if profile icon and email are displayed
//     expect(screen.getByText(mockName)).toBeInTheDocument();
//     expect(screen.getByTestId('profile-icon')).toBeInTheDocument();
//   });

//   it('displays login button when not logged in', () => {
//     // Clear localStorage values
//     localStorage.removeItem('email');
//     localStorage.removeItem('name');

//     render(<Header />);

//     // Check if login button is displayed
//     expect(screen.getByRole('button', { name: /person/i })).toBeInTheDocument();
//   });
});
