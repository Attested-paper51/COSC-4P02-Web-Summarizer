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
