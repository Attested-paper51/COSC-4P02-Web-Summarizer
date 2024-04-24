import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './context/ThemeContext.js'; // Import the ThemeProvider

test('renders learn react link', () => {
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
  const linkElement = screen.getByText(/shortify/i);
  expect(linkElement).toBeInTheDocument();
});
