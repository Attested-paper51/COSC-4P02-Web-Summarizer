import React, { createContext, useContext, useReducer } from 'react';

// Define the initial state
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Create the context
const AuthContext = createContext();

// Create a reducer function to handle actions
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};