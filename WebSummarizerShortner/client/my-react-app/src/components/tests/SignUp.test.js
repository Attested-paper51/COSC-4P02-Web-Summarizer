import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import SignUp from '../SignUp.js';
import { MemoryRouter } from 'react-router-dom';


// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
        darkMode: false, // Set darkMode to false for testing
        setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
}));

describe('SignUp Component', () => {

    // Render Test
    it('renders without crashing', () => {
        render(<Router><SignUp /></Router>);
    });

    test('validates password match correctly', async () => {
        render(<MemoryRouter><SignUp /></MemoryRouter>);
        const passwordInput = screen.getByTestId('password-input');
        const confirmInput = screen.getByTestId('repassword-input');

        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmInput, { target: { value: 'password123' } });
    
        fireEvent.click(screen.getByTestId('create-account'));
    
        await waitFor(() => {
          expect(screen.queryByText('Passwords do not match!')).toBeNull();
        });
      });

      test('displays check icon when password length requirement is met', async () => {
        render(<MemoryRouter><SignUp /></MemoryRouter>);
        const passwordInput = screen.getByTestId('password-input');
        
        // Set password length to meet the requirement
        fireEvent.change(passwordInput, { target: { value: 'Abcdefg1' } });
      
        await waitFor(() => {
          expect(screen.getByTestId('length')).toContainElement(screen.getByTestId('fa-check-length'));
        });
      });

      test('displays check icon when password contains at least one uppercase letter', async () => {
        render(<MemoryRouter><SignUp /></MemoryRouter>);
        const passwordInput = screen.getByTestId('password-input');
        
        // Set password to contain at least one uppercase letter
        fireEvent.change(passwordInput, { target: { value: 'abcdefG1' } });
      
        await waitFor(() => {
          expect(screen.getByTestId('uppercase')).toContainElement(screen.getByTestId('fa-check-uppercase'));
        });
      });

      test('displays check icon when password contains at least one number', async () => {
        render(<MemoryRouter><SignUp /></MemoryRouter>);
        const passwordInput = screen.getByTestId('password-input');
        
        // Set password to contain at least one number
        fireEvent.change(passwordInput, { target: { value: 'Abcdefg1' } });
      
        await waitFor(() => {
          expect(screen.getByTestId('number')).toContainElement(screen.getByTestId('fa-check-number'));
        });
      });
    
});