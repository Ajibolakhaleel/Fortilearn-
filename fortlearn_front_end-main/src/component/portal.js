import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PortalDashboard = () => {
  return (
    <div className="container-fluid p-0 mt-5">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <div className="rounded-circle border d-flex align-items-center justify-content-center me-2" style={{ width: '24px', height: '24px' }}>
              <small>P</small>
            </div>
            Portal Hub
          </a>
          <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Resources</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Support</a>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-bell me-3"></i>
            <div className="dropdown">
              <button className="btn btn-sm btn-light dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="bg-light py-4">
        <div className="container">
          {/* Welcome Section */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Welcome back, Alex</h5>
              <p className="card-text text-muted small">Here's what's happening in your portal today</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8">
              {/* Recent Documents */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-2 bg-light p-2 rounded">
                      <i className="bi bi-file-earmark"></i>
                    </div>
                    <h6 className="mb-0">Recent Documents</h6>
                  </div>
                  <a href="#" className="text-primary small">Access your latest files</a>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-2 bg-light p-2 rounded">
                      <i className="bi bi-calendar-event"></i>
                    </div>
                    <h6 className="mb-0">Upcoming Events</h6>
                  </div>
                  <a href="#" className="text-primary small">View your schedule</a>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card">
                <div className="card-body">
                  <h6 className="mb-3">Recent Activity</h6>
                  
                  <div className="d-flex align-items-start mb-3">
                    <div className="me-2 bg-light p-2 rounded">
                      <i className="bi bi-file-earmark-text"></i>
                    </div>
                    <div>
                      <div className="fw-bold small">Document Updated</div>
                      <div className="text-muted small">Project proposal v2.pdf</div>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start">
                    <div className="me-2 bg-light p-2 rounded">
                      <i className="bi bi-chat-dots"></i>
                    </div>
                    <div>
                      <div className="fw-bold small">New Message</div>
                      <div className="text-muted small">From: Sarah Johnson</div>
                      <div className="text-muted small">5 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              {/* Quick Stats */}
              <div className="card mb-4">
                <div className="card-body">
                  <h6 className="mb-3">Quick Stats</h6>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1 small">
                      <span>Storage Used</span>
                      <span>75%</span>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div className="progress-bar bg-dark" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2 small">
                    <span>Active Projects</span>
                    <span>12</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-3 small">
                    <span>Team Members</span>
                    <span>8</span>
                  </div>
                </div>
              </div>

              {/* Team Online */}
              <div className="card">
                <div className="card-body">
                  <h6 className="mb-3">Team Online</h6>
                  
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <div className="me-2 rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                        <small>MT</small>
                      </div>
                      <span className="small">Mike Thompson</span>
                    </div>
                    <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="me-2 rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                        <small>ED</small>
                      </div>
                      <span className="small">Emily Davis</span>
                    </div>
                    <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white p-3 border-top">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center small">
            <div>© 2023 Portal Hub. All rights reserved.</div>
            <div>
              <a href="#" className="text-decoration-none text-secondary me-3">Privacy Policy</a>
              <a href="#" className="text-decoration-none text-secondary me-3">Terms of Service</a>
              <a href="#" className="text-decoration-none text-secondary">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortalDashboard;