import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * ThemeContext provides the darkMode state and setDarkMode function using React's Context API.
 * The initial state of darkMode is retrieved from local storage.
 */
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Retrieve dark mode preference from local storage, default to false (light mode)
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    // Store dark mode preference in local storage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Provides the darkMode state and setDarkMode function to its children via Context
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};




// import React, { createContext, useState, useContext } from 'react';
// //

// const ThemeContext = createContext();

// export const useTheme = () => useContext(ThemeContext);

// export const ThemeProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     console.log("Dark mode toggled"); // Add this line
//     setDarkMode(prevDarkMode => !prevDarkMode);
//   };

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };