import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import RegisterForm from './register';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

// Mock fetch API
global.fetch = jest.fn();

const mockNavigate = jest.fn();

// Setup before each test
beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(window, 'fetch').mockImplementation(() => 
    Promise.resolve({
      json: () => Promise.resolve({ token: 'fake-token-123' }),
    })
  );
  
  // Mock localStorage
  Storage.prototype.setItem = jest.fn();
  
  // Mock useNavigate
  require('react-router-dom').useNavigate.mockImplementation(() => mockNavigate);
});

// Helper function to render the component within Router context
const renderComponent = () => {
  return render(
    <BrowserRouter>
      <RegisterForm />
    </BrowserRouter>
  );
};

describe('RegisterForm Component', () => {
  test('renders RegisterForm with all input fields', () => {
    renderComponent();
    
    // Check if all elements are present
    expect(screen.getByText('Welcome to Fortlearn')).toBeInTheDocument();
    expect(screen.getByText('Please sign up to continue')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select your specialization/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByText(/Have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in now/i)).toBeInTheDocument();
  });

  test('allows input in all form fields', () => {
    renderComponent();
    
    // Get all input fields
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const usernameInput = screen.getByPlaceholderText('Enter your Username');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const specializationSelect = screen.getByRole('combobox');
    
    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(specializationSelect, { target: { value: 'network-security' } });
    
    // Check if the inputs have the correct values
    expect(emailInput.value).toBe('test@example.com');
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
    expect(specializationSelect.value).toBe('network-security');
  });

  test('submits form with correct data', async () => {
    renderComponent();
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your Username'), { 
      target: { value: 'testuser' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { 
      target: { value: 'password123' } 
    });
    fireEvent.change(screen.getByRole('combobox'), { 
      target: { value: 'network-security' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    
    // Check if fetch was called with the right arguments
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
          username: 'testuser',
          specialization: 'network-security'
        }),
      });
    });
    
    // Check if token was stored in localStorage
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'fake-token-123');
    });
    
    // Check if navigation occurred
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/user-profile');
    });
  });
  
  test('handles required field validation', () => {
    renderComponent();
    
    // Try to submit form without filling any fields
    const form = screen.getByRole('button', { name: /Sign Up/i }).closest('form');
    fireEvent.submit(form);
    
    // We're not expecting fetch to be called because the browser's built-in form validation should prevent submission
    expect(fetch).not.toHaveBeenCalled();
  });
  
  test('link navigates to login page', () => {
    renderComponent();
    
    // Find the login link
    const loginLink = screen.getByText(/Sign in now/i);
    
    // Check if it has the right destination
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
  });
  
  test('handles fetch error', async () => {
    // Mock console.log to check for error logging
    console.log = jest.fn();
    
    // Mock fetch to reject
    window.fetch.mockImplementationOnce(() => Promise.reject('Network error'));
    
    renderComponent();
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your Username'), { 
      target: { value: 'testuser' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { 
      target: { value: 'password123' } 
    });
    fireEvent.change(screen.getByRole('combobox'), { 
      target: { value: 'network-security' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    
    // Check if error was logged
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('login error', 'Network error');
    });
    
    // Verify localStorage and navigation weren't called
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});