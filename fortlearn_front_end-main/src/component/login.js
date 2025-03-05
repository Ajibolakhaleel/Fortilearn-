import React, { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
          }),
    })
    .then((res) => res.json())
    .then((response) =>{
      const token  = response.token
      console.log('response after login', response)
      if(token){
        if(rememberMe){
            localStorage.setItem('authToken', token);
            return navigate('/user-profile')
        }else{
            sessionStorage.setItem('authToken',token);
            return navigate('/user-profile')
        }
    }
    })
    }catch(err){
      console.log('login error')
      return err
    }



  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-1 fw-bold">Welcome Back</h3>
          <p className="text-center text-muted small mb-4">Please sign in to continue</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label small">Email or Username</label>
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
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="password" className="form-label small">Password</label>
                <a href="#" className="text-decoration-none small text-primary">Forgot Password?</a>
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
            
            <div className="mb-4 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label small" htmlFor="rememberMe">Remember me</label>
            </div>
            
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-success">Sign In</button>
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
             Don't have an account? <Link to="/register" class="nav-link"><small>Sign up now</small></Link> 
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;