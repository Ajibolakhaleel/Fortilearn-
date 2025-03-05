import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // Note the change in import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);

  const isAuthenticated = () => {
    return !!token; // Returns true if token exists
  };

  const checkTokenExpiration = () => {
    if (!token) return true;

    try {
      // Decode the token to check expiration
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      // If token is invalid, consider it expired
      return true;
    }
  };

  const login = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      isAuthenticated, 
      checkTokenExpiration, 
      login, 
      logout 
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