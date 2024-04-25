import React from 'react';
import { render, screen, rerender, fireEvent, waitFor, act } from '@testing-library/react';
//import { clipboard } from 'jest-clipboard';
import { BrowserRouter as Router } from 'react-router-dom';
import Summarizer from '../Summarizer'; // Update the path

// Mocking the useTheme hook
jest.mock('../../context/ThemeContext.js', () => ({
    useTheme: () => ({
      darkMode: false, // Set darkMode to false for testing
      setDarkMode: jest.fn(), // Mock setDarkMode function
    }),
}));



describe('Summarizer component', () => {
    test('renders Summarizer content with light mode', () => {
        render(
            <Router>
            <Summarizer />
            </Router>
        );  
        //expect(screen).toBeTruthy()
    });

    // Mode Tests
    test('selects "Text" button and deselects others when clicked', () => {
        const { getByText } = render(<Router><Summarizer /></Router>);
    
        // Click the "Text" button
        fireEvent.click(getByText('Text'));
    
        // Test if the "Text" button is selected and others are not
        expect(getByText('Text')).toHaveClass('customSumBtn clicked-light disabled-hover-light btn-text-dark');
        expect(getByText('Website URL')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
        expect(getByText('Youtube URL')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
    });
    
    test('selects "Website URL" button and deselects others when clicked', () => {
        const { getByText } = render(<Summarizer />);

        // Click the "Website URL" button
        fireEvent.click(getByText('Website URL'));

        // Test if the "Website URL" button is selected and others are not
        expect(getByText('Text')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
        expect(getByText('Website URL')).toHaveClass('customSumBtn clicked-light disabled-hover-light btn-text-dark');
        expect(getByText('Youtube URL')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
    });
    
    test('selects "Youtube URL" button and deselects others when clicked', () => {
        const { getByText } = render(<Summarizer />);

        // Click the "Youtube URL" button
        fireEvent.click(getByText('Youtube URL'));

        // Test if the "Youtube URL" button is selected and others are not
        expect(getByText('Text')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
        expect(getByText('Website URL')).toHaveClass('customSumBtn not-clicked-light btn-text-dark');
        expect(getByText('Youtube URL')).toHaveClass('customSumBtn clicked-light disabled-hover-light btn-text-dark');
    });


    // URL Linking Tests
    //test('clicking the shorten URL button navigates to the URL Shortener page', () => {
        // const transferLinkMock = jest.fn();
        // // Render the component
        // const { getbyID } =  render(<Summarizer transferLink={transferLinkMock} />);
        // // console.log("************************")
        // // console.log(container.innerHTML)
        // const urlButton = container.querySelector('#website-url')
        // const OutputTextArea = container.querySelector('#output')
        // OutputTextArea.value = '%%%%%%%%'
        // // fireEvent.change(OutputTextArea)
        // // // console.log("************************")
        // // // console.log(urlButton)
        // // fireEvent.click(urlButton)
        // // //waitFor(() => {
        //     //Summarizer.defaultProps.transferLink = transferLinkMock;
        //     const shortenButton = Summarizer.getByID('#shorten-button')
        //     console.log("************************")
        //     console.log(shortenButton)
        //     fireEvent.click(shortenButton);
        
        //     expect(transferLinkMock).toHaveBeenCalledTimes(1);
        //     expect(transferLinkMock).toHaveBeenCalledWith('/Shortener');


        // Mock the transferLink function
    // const transferLinkMock = jest.fn();

    // // Render the component with transferLinkMock as a prop
    // const { getByText } = render(<Summarizer transferLink={transferLinkMock} />);

    // // Find the button by regex matching
    // const shortenButton = getByText(/Shorten your URL/i); // Using regex with /.../i to match case-insensitive

    // // Click the "Shorten your URL" button
    // fireEvent.click(shortenButton);

    // // Assert that the transferLink function was called
    // expect(transferLinkMock).toHaveBeenCalledTimes(1);

    // // Assert that the transferLink function was called with the correct URL
    // expect(transferLinkMock).toHaveBeenCalledWith('/Shortener');
   // });
});
