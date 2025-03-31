
import React, { useState, useEffect }  from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch,FaGraduationCap, FaUsers, FaRobot, FaVideo, FaBook, FaNewspaper, FaBookmark } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
function HomePage() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetch('http://localhost:3000/resource/all')
      .then(response => response.json())
      .then((json) => {
        console.log('data from the db',json)
        setResources(json.result)}
      )
      .catch(error => console.error(error));
  }, []);

  // const fetchResources = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Replace with your actual API endpoint
  //     const response = await axios.get('http://127.0.0.1:3000/resource/all');
  //     console.log('resources ', resources)
  //     setResources(response.result);
  //     // setError(null);
  //   } catch (err) {
  //     console.error('Error fetching resources:', err);
  //     // setError('Failed to load resources. Please try again later.');
      
  //     // Fallback data for demo purposes
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <div className="cyblearn-app">


      {/* Header Section */}
      <header className="bg-light py-5 mt-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">Master Cybersecurity with<br />Expert Resources</h1>
          <p className="lead mb-4">
            Your comprehensive platform for learning cybersecurity skills through curated<br />
            resources, expert guidance, and practical experience.
          </p>
          
          {/* Search Box */}
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card shadow-sm">
                <div className="card-body p-2">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-0">
                      <FaSearch className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 shadow-none"
                      placeholder="Search resources, topics, or skills..."
                    />
                    <button className="btn btn-success px-4">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Resources Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold mb-4">Featured Resources</h2>
          <div className="row">
            {/* Resource Card 1 */}
            {resources.map(resource => (
            <div className="col-md-4 mb-4"  onClick={() => window.location.href=`/resource/${resource._id}`}
            style={{ cursor: 'pointer' }} >
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <FaVideo className="text-primary me-2" />
                    <small className="text-muted">{resource.type}</small>
                  </div>
                  <h5 className="card-title fw-bold">{resource.title}</h5>
                  <p className="card-text">{resource.description}</p>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <span className="badge bg-success px-2 py-1">Beginner</span>
                    <button className="btn btn-outline-primary btn-sm border-0">
                      <FaBookmark />
                    </button>
                  </div>
                </div>
              </div>
            </div>
              ))}

            {/* Resource Card 2 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <FaBook className="text-primary me-2" />
                    <small className="text-muted">Tutorial</small>
                  </div>
                  <h5 className="card-title fw-bold">Ethical Hacking Guide</h5>
                  <p className="card-text">Comprehensive guide to ethical hacking and penetration testing.</p>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <span className="badge bg-warning text-dark px-2 py-1">Intermediate</span>
                    <button className="btn btn-outline-primary btn-sm border-0">
                      <FaBookmark />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Resource Card 3 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <FaNewspaper className="text-primary me-2" />
                    <small className="text-muted">Article</small>
                  </div>
                  <h5 className="card-title fw-bold">Cloud Security Best Practices</h5>
                  <p className="card-text">Essential security practices for cloud infrastructure protection.</p>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <span className="badge bg-info text-dark px-2 py-1">Advanced</span>
                    <button className="btn btn-outline-primary btn-sm border-0">
                      <FaBookmark />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center">
            {/* Feature 1 */}
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="p-4">
                <div className="bg-white rounded-circle shadow d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                  <FaGraduationCap className="text-success" size={32} />
                </div>
                <h4 className="fw-bold mb-2">Structured Learning</h4>
                <p className="text-muted">Follow curated learning paths designed by industry experts</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="p-4">
                <div className="bg-white rounded-circle shadow d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                  <FaUsers className="text-success" size={32} />
                </div>
                <h4 className="fw-bold mb-2">Community Support</h4>
                <p className="text-muted">Connect with peers and experts in the cybersecurity field</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-4">
              <div className="p-4">
                <div className="bg-white rounded-circle shadow d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
                  <FaRobot className="text-success" size={32} />
                </div>
                <h4 className="fw-bold mb-2">AI-Powered Assistance</h4>
                <p className="text-muted">Get instant help and guidance from our AI chatbot</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;