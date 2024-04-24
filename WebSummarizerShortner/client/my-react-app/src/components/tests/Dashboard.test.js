import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom';
import Dashboard from '../Dashboard.js'; 
import LandingPage from '../../pages/HomePage.js'; 
import Header from '../Header.js';


// Mocking the useTheme hook
jest.mock('../ThemeContext.js', () => ({
  useTheme: () => ({
    darkMode: false, // Set darkMode to false for testing
    setDarkMode: jest.fn(), // Mock setDarkMode function
  }),
}));

describe('Dashboard component', () => {

  test('renders dashboard content', () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    );
  });

  test('renders Templates component when Templates option is clicked', () => {
    const { getByRole, getByTestId } = render(<Router><Dashboard/></Router>);
    const templatesButton = getByRole('button', { name: /templates/i }); // Find button by text "Templates" (case-insensitive)

    fireEvent.click(templatesButton);

    // Assert that the Templates component is rendered
    expect(screen.getByText('Template 1')).toBeInTheDocument();
    expect(screen.getByText('Template 2')).toBeInTheDocument();
    expect(screen.getByText('Template 3')).toBeInTheDocument();
    
  });

  test('renders History component when History option is clicked', () => {
    const { getByRole, getByTestId } = render(<Router><Dashboard/></Router>);
    const historyButton = getByRole('button', { name: /history/i });

    fireEvent.click(historyButton);

    expect(screen.getByText('Web Summarizer')).toBeInTheDocument();
    expect(screen.getByText('URL Shortener')).toBeInTheDocument();
    
  });

  test('renders API Access component when API Access option is clicked', () => {
    const { getByRole, getByTestId } = render(<Router><Dashboard/></Router>);
    const apiButton = getByRole('button', { name: /api access/i });

    fireEvent.click(apiButton);

    expect(screen.getByText('Summarizer API Documentation')).toBeInTheDocument();
    
  });
  
  test('renders Settings component when Settings option is clicked', () => {
    const { getByRole, getByTestId } = render(<Router><Dashboard/></Router>);
    const setButton = getByRole('button', { name: /settings/i });

    fireEvent.click(setButton);

    expect(screen.getByText('Subscription Plan')).toBeInTheDocument();
    
  });

  test('toggles sidebar on collapse button click', () => {
    const { getByTestId, queryByTestId } = render(<Router><Dashboard /></Router>);
  
    // Initially, the large sidebar should be visible, and the small sidebar should be hidden
    const largeSidebar = getByTestId('side-panel');
    const smallSidebar = queryByTestId('small-side-panel-container');
    expect(largeSidebar).toBeInTheDocument();
    expect(smallSidebar).toBeNull();

    const collapseButton = getByTestId('collapse-sidebar-button');
    fireEvent.click(collapseButton);
  
    // After clicking the collapse button, the large sidebar should be hidden, and the small sidebar should be visible
    expect(largeSidebar).not.toBeInTheDocument();
    expect(queryByTestId('small-side-panel-container')).toBeInTheDocument();

  });

  test('styling changes on hover', () => {
      const { getByText } = render(<Router><Dashboard /></Router>);
      const option = getByText('Settings'); 
    
      const initialStyle = window.getComputedStyle(option);

      fireEvent.mouseEnter(option);

      const newStyle = window.getComputedStyle(option);
    
      expect(newStyle).not.toEqual(initialStyle);
      
  });

});


  // test('logs out user and redirects to HomePage on logout button click', () => {
  //     // Create a memory history object
  //     const history = createMemoryHistory();
      
  //     // Render the Dashboard inside a MemoryRouter with the history
  //     const { getByText } = render(
  //       <MemoryRouter>
  //         <Router history={history}>
  //           <Dashboard />
  //         </Router>
  //       </MemoryRouter>
  //     );
    
  //     const logoutButton = getByText('Logout');
    
  //     fireEvent.click(logoutButton);
    
  //     // Check if the user is redirected to the HomePage component
  //     expect(history.location.pathname).toBe('/'); 
  // });


    
