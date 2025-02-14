import React from 'react';
import { Search, BookOpen, Users, Bot } from 'lucide-react';

const App = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand text-success fw-bold" href="#">FortiLearn</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Resources</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Profile</a>
              </li>
            </ul>
            <button className="btn btn-primary">Login/Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container py-5 text-center">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold mb-4">Master Cybersecurity with Expert Resources</h1>
            <p className="lead text-muted mb-5">
              Your comprehensive platform for learning cybersecurity skills through curated resources,
              expert guidance, and practical experience.
            </p>
            <div className="input-group mb-3">
              <input type="text" className="form-control form-control-lg" 
                placeholder="Search resources, topics, or skills..." />
              <button className="btn btn-success px-4">Search</button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      <div className="container py-5">
        <h2 className="mb-4">Featured Resources</h2>
        <div className="row g-4">
          {/* Resource Card 1 */}
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <BookOpen className="text-primary me-2" size={24} />
                  <span className="text-primary">Video Course</span>
                </div>
                <h3 className="h5 card-title">Network Security Fundamentals</h3>
                <p className="card-text text-muted">
                  Learn the basics of network security and protection mechanisms.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-success">Beginner</span>
                  <button className="btn btn-link text-decoration-none">Learn More →</button>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Card 2 */}
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <BookOpen className="text-primary me-2" size={24} />
                  <span className="text-primary">Tutorial</span>
                </div>
                <h3 className="h5 card-title">Ethical Hacking Guide</h3>
                <p className="card-text text-muted">
                  Comprehensive guide to ethical hacking and penetration testing.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-warning">Intermediate</span>
                  <button className="btn btn-link text-decoration-none">Learn More →</button>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Card 3 */}
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <BookOpen className="text-primary me-2" size={24} />
                  <span className="text-primary">Article</span>
                </div>
                <h3 className="h5 card-title">Cloud Security Best Practices</h3>
                <p className="card-text text-muted">
                  Essential security practices for cloud computing environments.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-danger">Advanced</span>
                  <button className="btn btn-link text-decoration-none">Learn More →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <BookOpen className="text-success mb-3" size={48} />
              <h3 className="h4">Structured Learning</h3>
              <p className="text-muted">
                Follow curated learning paths designed by industry experts
              </p>
            </div>
            <div className="col-md-4">
              <Users className="text-success mb-3" size={48} />
              <h3 className="h4">Community Support</h3>
              <p className="text-muted">
                Connect with peers and experts in the cybersecurity field
              </p>
            </div>
            <div className="col-md-4">
              <Bot className="text-success mb-3" size={48} />
              <h3 className="h4">AI-Powered Assistance</h3>
              <p className="text-muted">
                Get instant help and guidance from our AI chatbot
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light py-5 mt-auto">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <h4 className="h5 mb-3">Quick Links</h4>
              <ul className="list-unstyled">
                <li><a href="#" className="text-decoration-none text-secondary">About Us</a></li>
                <li><a href="#" className="text-decoration-none text-secondary">Resources</a></li>
                <li><a href="#" className="text-decoration-none text-secondary">Community</a></li>
                <li><a href="#" className="text-decoration-none text-secondary">Contact</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4 className="h5 mb-3">Follow Us</h4>
              <div className="d-flex gap-3">
                <a href="#" className="text-secondary">Twitter</a>
                <a href="#" className="text-secondary">LinkedIn</a>
                <a href="#" className="text-secondary">GitHub</a>
              </div>
            </div>
            <div className="col-md-6">
              <h4 className="h5 mb-3">Newsletter</h4>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <button className="btn btn-success">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="border-top border-secondary mt-4 pt-4 text-center text-secondary">
            © 2025 FortiLearn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;