import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import Password from '../Password.js';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
        darkMode: false, // Set darkMode to false for testing
        setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
}));

describe('Password Component', () => {

    // Render Test
    it('renders without crashing', () => {
        render(<Router><Password /></Router>);
    });

    test('password validation works correctly for incorrect passwords', async () => {
        render(<MemoryRouter><Password /></MemoryRouter>); // Wrap Password component with MemoryRouter
        const passwordInput = screen.getByTestId('password-input');
        const confirmInput = screen.getByTestId('repassword-input');
        fireEvent.change(passwordInput, { target: { value: 'Abcdefg123' } });
        fireEvent.change(confirmInput, { target: { value: 'Abcdefgh123' } });
        fireEvent.click(screen.getByText('Reset password'));
        await waitFor(() => {
          expect(screen.getByText('Passwords do not match!')).toBeInTheDocument();
        });
      });


      test('password validation works correctly for correct passwords', async () => {
        render(<MemoryRouter><Password /></MemoryRouter>); // Wrap Password component with MemoryRouter
        const passwordInput = screen.getByTestId('password-input');
        const confirmInput = screen.getByTestId('repassword-input');
        fireEvent.change(passwordInput, { target: { value: 'Malli123456' } });
        fireEvent.change(confirmInput, { target: { value: 'Malli123456' } });
        fireEvent.click(screen.getByText('Reset password'));
        await waitFor(() => {
            expect(screen.queryByText('Passwords do not match!')).toBeNull();
          });
      });

});