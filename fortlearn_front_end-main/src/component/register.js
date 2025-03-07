import React, { useState } from 'react';
import {  Link, useNavigate  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration submitted:', { 
      email, 
      username, 
      password, 
      specialization 
    });

    e.preventDefault();
    try {
      fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            username,
            specialization
          }),
    })
    .then(res => res.json())
    .then((response) =>{
      const token  = response.token
      console.log('token on login',response.token)
      if(token){
        localStorage.setItem('authToken', token);
        navigate('/user-profile')

      }else {
        return navigate('/login')
      }
    })
    }catch(err){
      console.log('login error', err)
      return err
    }

    // Add your authentication/registration logic here
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <select className="form-select"   value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
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