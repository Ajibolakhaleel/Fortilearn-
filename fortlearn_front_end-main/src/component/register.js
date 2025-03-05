import React, { useState } from 'react';
import {  Link  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password, rememberMe });
    // Add your authentication logic here
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-1 fw-bold">Welcome to Fortlearn</h3>
          <p className="text-center text-muted small mb-4">Please sign up to continue</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label small">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label small"> Username</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter your Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="password" className="form-label small">Password</label>
              </div>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-3">
            <label className="form-check-label small" htmlFor="rememberMe">Select your specialization</label>

            <select className="form-select">
                            <option value="">Select Specialization</option>
                            <option value="network-security">Network Security</option>
                            <option value="penetration-testing">Penetration Testing</option>
                            <option value="cryptography">Cryptography</option>
                            <option value="cloud-security">Cloud Security</option>
                          </select>
            </div>
            
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-success">Sign Up</button>
            </div>
            
            
            {/* <div className="row mb-3 gx-2">
              <div className="col">
                <button type="button" className="btn btn-outline-secondary w-100">
                  <i className="bi bi-google me-2"></i>Google
                </button>
              </div>
              <div className="col">
                <button type="button" className="btn btn-outline-secondary w-100">
                  <i className="bi bi-linkedin me-2"></i>LinkedIn
                </button>
              </div>
            </div> */}
            
            <div className="text-center small">
              Have an account? <Link to="/login" class="nav-link"><small>Sign in now</small></Link> 

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;