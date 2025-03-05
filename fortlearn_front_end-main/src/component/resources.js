import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Resourcespage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [specialization, setSpecialization] = useState('');
    
    const handleSearch = (e) => {e.preventDefault();};

    const trendingResources = [
        {
          id: 1,
          type: 'Video Course',
          icon: 'fas fa-video',
          title: 'Introduction to Network Security',
          description: 'Learn the fundamentals of network security and protection mechanisms.',
          level: 'Beginner',
          levelClass: 'badge-beginner'
        },
        {
          id: 2,
          type: 'Article',
          icon: 'fas fa-file-alt',
          title: 'Advanced Penetration Testing',
          description: 'Deep dive into advanced penetration testing methodologies.',
          level: 'Advanced',
          levelClass: 'badge-advanced'
        },
        {
          id: 3,
          type: 'Interactive Lab',
          icon: 'fas fa-flask',
          title: 'Hands-on Cryptography',
          description: 'Practice cryptographic concepts with interactive exercises.',
          level: 'Intermediate',
          levelClass: 'badge-intermediate'
        },
        {
            id: 3,
            type: 'Interactive Lab',
            icon: 'fas fa-flask',
            title: 'Hands-on Cryptography',
            description: 'Practice cryptographic concepts with interactive exercises.',
            level: 'Intermediate',
            levelClass: 'badge-intermediate'
          }
      ];
      return (
        <div className="cyberhub-app">         
          <section className="py-5 mt-5 bg-white">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                  <h1 className="fw-bold mb-3">Your Gateway to Cybersecurity Excellence</h1>
                  <p className="text-muted mb-4">
                    Empowering cybersecurity professionals with comprehensive resources,
                    expert guidance, and cutting-edge learning materials for every skill level.
                  </p>
                  
                  {/* Search Box */}
                  <div className="card shadow-sm p-4 mb-5">
                    <form onSubmit={handleSearch}>
                      <div className="row g-2">
                        <div className="col-md-6 mb-2 mb-md-0">
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search resources..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="col-md-4 mb-2 mb-md-0">
                          <select 
                            className="form-select"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                          >
                            <option value="">Select Specialization</option>
                            <option value="network-security">Network Security</option>
                            <option value="penetration-testing">Penetration Testing</option>
                            <option value="cryptography">Cryptography</option>
                            <option value="cloud-security">Cloud Security</option>
                          </select>
                        </div>
                        <div className="col-md-2">
                          <button type="submit" className="btn btn-primary w-100">Search</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
    
          {/* Trending Resources */}
          <section className="py-5 bg-light">
            <div className="container">
              <h2 className="fw-bold mb-4">Trending Resources</h2>
              <div className="row g-4">
                {trendingResources.map(resource => (
                  <div className="col-md-4" key={resource.id}>
                    <div className="card resource-card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <i className={`${resource.icon} text-primary me-2`}></i>
                            <span className="text-muted small">{resource.type}</span>
                          </div>
                          <i className="far fa-bookmark bookmark-icon"></i>
                        </div>
                        <h5 className="card-title">{resource.title}</h5>
                        <p className="card-text text-muted">{resource.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className={`badge ${resource.levelClass} rounded-pill px-3 py-2`}>
                            {resource.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
    
          {/* Footer */}
        
        </div>
      );
    };
    export default Resourcespage;