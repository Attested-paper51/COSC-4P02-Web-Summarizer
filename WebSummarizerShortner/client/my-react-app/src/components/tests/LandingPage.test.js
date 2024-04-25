import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from '../LandingPage'; 

// Mock the ThemeContext module
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
      darkMode: false, // Set darkMode to false for testing
    }),
  }));

test('changes style on link hover', () => {
  render(
    <Router>
      <LandingPage />
    </Router>
  ); // Render the component

  const summarizerLink = screen.getByText('Summarizer'); // Find the Summarizer link
  const shortenerLink = screen.getByText('URL Shortener'); // Find the URL Shortener link

  // Get the initial style of the Summarizer link
  const initialSummarizerStyle = window.getComputedStyle(summarizerLink);
  // Get the initial style of the URL Shortener link
  const initialShortenerStyle = window.getComputedStyle(shortenerLink);

  // Simulate mouse enter event on Summarizer link
  fireEvent.mouseEnter(summarizerLink);

  // Get the style of the Summarizer link after mouse enter event
  const newSummarizerStyle = window.getComputedStyle(summarizerLink);

  // Assert that the style has changed after mouse enter event
  expect(newSummarizerStyle).not.toEqual(initialSummarizerStyle);

  // Simulate mouse enter event on URL Shortener link
  fireEvent.mouseEnter(shortenerLink);

  // Get the style of the URL Shortener link after mouse enter event
  const newShortenerStyle = window.getComputedStyle(shortenerLink);

  // Assert that the style has changed after mouse enter event
  expect(newShortenerStyle).not.toEqual(initialShortenerStyle);
});
