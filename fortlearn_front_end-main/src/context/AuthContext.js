import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Improved isAuthenticated function that checks both token existence and validity
  const isAuthenticated = () => {
    if (!token) return false;
    
    try {
      // Decode the token to check expiration
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      // If token is invalid, user is not authenticated
      return false;
    }
  };

  // This function now checks if token is valid rather than expired
  const checkTokenExpiration = () => {
    if (!token) return true; // No token means it's expired
    
    try {
      // Decode the token to check expiration
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime; // Return true if expired
    } catch (error) {
      // If token is invalid, consider it expired
      return true;
    }
  };

  const login = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    
    // Redirect to user profile after login
    window.location.href = '/user-profile';
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  // Effect to check for token in localStorage on initialization
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      setToken(storedToken);
      
      try {
        const decodedToken = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp > currentTime) {
          // Token is valid
          console.log("Valid token found, user is authenticated");
        } else {
          // Token is expired, remove it
          console.log("Expired token found, logging out");
          logout();
        }
      } catch (error) {
        // Invalid token
        console.log("Invalid token found, logging out");
        logout();
      }
    }
    
    setIsInitialized(true);
  }, []);

  return (
    <AuthContext.Provider value={{
      token,
      isAuthenticated,
      checkTokenExpiration,
      login,
      logout,
      isInitialized
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};