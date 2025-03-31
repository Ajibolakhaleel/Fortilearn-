import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResourceSpecializationModal from './resourceModal';
import { useNavigate } from 'react-router-dom';
import {  Link  } from 'react-router-dom';



const FortiLearnProfilePage = () => {
  const [userdata, setUserData] = useState({
    username: '',
    email: '',
    specialisation: ''
  });
  const [resources, setResources] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchUserProfile = async () => {
    const token = localStorage.getItem('authToken');
    if(token){
      try {
        await fetch('http://localhost:3000/userResources/get', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then(res => res.json())
        .then((res) =>{
          setUserData(res.user)
          console.log("user data enrolled resources", res.user.enrolledResources)
          setResources(res.user.enrolledResources)
        })
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    }else {
      navigate("/login")
    }

    
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="py-2 px-3 border-bottom shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <i className="bi bi-shield-lock-fill text-primary me-2"></i>
            <Link to="/" class="nav-link">FortiLearn</Link> 
          </div>
          <div>
            <i className="bi bi-bell me-3"></i>
            <i className="bi bi-question-circle"></i>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-4 flex-grow-1">
        {/* User Info */}
        <div className="d-flex align-items-center mb-4">
          <div className="position-relative me-3">
            <div className="rounded-circle overflow-hidden" style={{ width: 64, height: 64, backgroundColor: '#f8f9fa' }}>
              <img 
                src="https://ctmirror-images.s3.amazonaws.com/wp-content/uploads/2021/01/dummy-man-570x570-1.png" 
                alt="User profile" 
                className="img-fluid"
              />
            </div>
            <span className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                  style={{ width: 24, height: 24 }}>
              <i className="bi bi-shield-fill-check small"></i>
            </span>
          </div>
          <div>
            <h5 className="mb-0">{userdata.username}</h5>
            <p className="text-muted mb-0 small">Senior Security Analyst</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="card mb-4">
          <div className="card-body">
            <h6 className="mb-3">Personal Information</h6>
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label small">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={userdata.username} 
                      readOnly 
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label small">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={userdata.email} 
                      readOnly 
                    />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label small">My Specialization</label>
                <div className="d-flex align-items-center">
                  <i className="bi bi-key me-2 text-primary">{userdata.specialisation}</i>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Skills & Certifications */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0" style={{color:'green'}}>Enrolled Resources</h4>
              <ResourceSpecializationModal 
                trigger={
                  <button className="btn btn-success btn-sm d-flex align-items-center">
                    <i className="bi bi-plus me-1"></i> Add Resource Specialization
                  </button>
                }
                onSave={(selectedResources) => {
                  setResources(prev => [...prev, ...selectedResources]);
                }}
              />
            </div>
            <div className="row">
              {resources.map((resource, index) => (
           
                <div   key={index} 
                className="col-md-4 mb-4"
                onClick={() => window.open(resource.resourceLink || '#', '_blank')}
                style={{ cursor: 'pointer' }} >
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center mb-3">
                        <small className="text-muted">Tutorial</small>
                      </div>
                      <h5 className="card-title fw-bold">{resource.title || 'Ethical Hacking Guide'}</h5>
                      <p className="card-text">
                        {resource.description || 'Comprehensive guide to ethical hacking and penetration testing.'}
                      </p>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <span className="badge bg-warning text-dark">
                          {resource.level || 'Intermediate'}
                        </span>
                    
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {resources.length === 0 && (
                <div className="col-12 text-center text-muted py-4">
                  No resources added yet. Click "Add Resource Specialization" to get started.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 border-top mt-auto">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <a href="#" className="text-decoration-none text-muted small me-3">Privacy Settings</a>
              <a href="#" className="text-decoration-none text-muted small me-3">Terms of Service</a>
              <a href="#" className="text-decoration-none text-muted small">Help & Support</a>
            </div>
            <div className="text-muted small">
              © 2025 FortiLearn. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Pagination */}
      <div className="d-flex justify-content-center py-3 border-top">
        <div className="d-flex align-items-center">
          <button className="btn btn-link text-decoration-none text-muted">
            <i className="bi bi-chevron-left"></i>
          </button>
          <span className="mx-3 text-muted small">2 / 9</span>
          <button className="btn btn-link text-decoration-none text-muted">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FortiLearnProfilePage;