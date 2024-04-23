import { render, fireEvent, screen } from '@testing-library/react';
import Feedback from '../Feedback';

// Mock the ThemeContext module
jest.mock('../ThemeContext.js', () => ({
  useTheme: () => ({
    darkMode: false, // Set darkMode to false for testing
  }),
}));

describe('Feedback component', () => {
  test('renders feedback form', () => {
    render(<Feedback />);
    
    expect(screen.getByText('Rate your experience')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell us about your experience')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  test('allows user to select rating and provide feedback', async () => {
    render(<Feedback />);
    
    // Select a rating
    // fireEvent.click(screen.getByLabelText('1'));

    // Enter feedback
    fireEvent.change(screen.getByPlaceholderText('Tell us about your experience'), { target: { value: 'Great experience!' } });

    // Click send button
    fireEvent.click(screen.getByText('Send'));

    // Wait for thank you message to appear
    await screen.findByText('Thank you for your feedback!');
  });
});
