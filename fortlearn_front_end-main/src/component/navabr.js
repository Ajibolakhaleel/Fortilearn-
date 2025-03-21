import React from 'react';
import {  Link  } from 'react-router-dom';

//import { useAuth } from '../context/AuthContext';
//import HomePage from './Home';
function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
    <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="/">
            <i class="fas fa-shield-alt text-primary me-2"></i>
            <span class="fw-bold text-primary">FortiLearn</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                <Link to="/" class="nav-link">Home</Link> 

                </li>
                <li class="nav-item"> 
                <Link to="/resources" class="nav-link">Resources</Link> 
                </li>
                {/* <li class="nav-item">
                <Link to="/user-profile" class="nav-link">Profile</Link> 
                </li> */}
                {/* <li class="nav-item">
                <Link to="/portal" class="nav-link">Portal</Link> 
                </li> */}
                <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
                <Link to="/login" class="nav-link">Login</Link> 
                </li>
                <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
                <Link to="/register" class="nav-link">Register</Link> 
                </li>
                {/* <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
                <Link to="/admin" class="nav-link">Portal</Link> 
                </li> */}
            </ul>
        </div> 
     
    </div>
</nav>
  );
}
export default Navbar;
