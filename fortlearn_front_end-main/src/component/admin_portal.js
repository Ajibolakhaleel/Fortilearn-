import React, { useState } from 'react';
import AdminCoursesDashboard from './admin_resources';
import UserDashboard from './AdminDashboard';

// Main Portal Component
function AdminPortal() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Handler for navigation clicks
  const handleNavClick = (view) => {
    setActiveView(view);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };
  
  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Mobile Navbar */}
        <div className="d-md-none w-100 bg-white shadow-sm p-3 position-fixed top-0 start-0 z-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <i className="fas fa-globe me-2 text-primary"></i>
              <h5 className="mb-0">Admin Portal</h5>
            </div>
            <button 
              className="btn btn-sm btn-outline-primary" 
              onClick={toggleSidebar}
            >
              <i className={`fas fa-${sidebarOpen ? 'times' : 'bars'}`}></i>
            </button>
          </div>
        </div>
        
        {/* Sidebar - with responsive behavior */}
        <div className={`col-md-2 bg-white shadow-sm p-0 min-vh-100 position-fixed start-0 top-0 z-2 ${sidebarOpen ? 'd-block' : 'd-none'} d-md-block transition-all`} 
             style={{transition: 'all 0.3s ease-in-out'}}>
          <div className="p-3 border-bottom d-flex align-items-center d-none d-md-flex">
            <i className="fas fa-globe me-2 text-primary"></i>
            <h5 className="mb-0">Fortlearn Admin</h5>
          </div>
          {/* Add padding on mobile to account for top navbar */}
          <div className="d-md-none" style={{paddingTop: '60px'}}></div>
          <div className="list-group list-group-flush">
            <a href="#" className={`list-group-item list-group-item-action ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavClick('dashboard')}>
              <i className="fas fa-home me-2"></i> Dashboard
            </a>
            <a href="#" className={`list-group-item list-group-item-action ${activeView === 'resources' ? 'active' : ''}`} onClick={() => handleNavClick('resources')}>
              <i className="fas fa-boxes me-2"></i> Resources
            </a>
            <a href="#" className={`list-group-item list-group-item-action ${activeView === 'admins' ? 'active' : ''}`} onClick={() => handleNavClick('admins')}>
              <i className="fas fa-boxes me-2"></i> analytics
            </a>
            {/* <a href="#" className={`list-group-item list-group-item-action ${activeView === 'analytics' ? 'active' : ''}`} onClick={() => handleNavClick('analytics')}>
              <i className="fas fa-chart-bar me-2"></i> Analytics
            </a>
            <a href="#" className={`list-group-item list-group-item-action ${activeView === 'settings' ? 'active' : ''}`} onClick={() => handleNavClick('settings')}>
              <i className="fas fa-cog me-2"></i> Settings
            </a> */}
          </div>
        </div>
        
        {/* Overlay for sidebar when open on mobile */}
        {sidebarOpen && (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark d-md-none" 
            style={{opacity: '0.5', zIndex: 1}}
            onClick={toggleSidebar}
          ></div>
        )}
        
        {/* Main Content - with responsive behavior */}
        <div className="col-12 col-md-10 bg-light offset-md-2 px-0">
          {/* Add padding on mobile to account for top navbar */}
          <div className="d-md-none" style={{paddingTop: '60px'}}></div>
          
          {/* Top Navigation */}
          <div className="row border-bottom bg-white shadow-sm p-3 mx-0">
            <div className="col">
              <h4 className="mb-0">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h4>
              <small className="text-muted">
                {activeView === 'analytics' ? 'Performance metrics and insights' : 
                 activeView === 'dashboard' ? 'Overview of key metrics' :
                 activeView === 'users' ? 'Manage user accounts' :
                 activeView === 'products' ? 'Product inventory and management' :
                 'System configuration and preferences'}
              </small>
            </div>
            <div className="col-auto">
              <div className="d-flex">
                <button className="btn btn-link d-none d-sm-block">
                  <i className="fas fa-bell"></i>
                </button>
                {/* <button className="btn btn-link d-none d-sm-block">
                  <i className="fas fa-moon"></i>
                </button> */}
                {/* <button className="btn btn-link">
                  <img src="https://via.placeholder.com/30" alt="Profile" className="rounded-circle" />
                </button> */}
              </div>
            </div>
          </div>
          
          {/* Render the appropriate view based on state */}
          <div className="p-2 p-md-4">
            {activeView === 'dashboard' && <DashboardView />}
            {activeView === 'resources' && <AdminCoursesDashboard />}
            {activeView === 'admins' && <UserDashboard />}

            {activeView === 'products' && <div>Products content goes here</div>}
            {activeView === 'settings' && <div>Settings content goes here</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
function DashboardView() {
    return (
      <div className="dashboard-container p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="m-0">Welcome back, Professor Smith</h3>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-secondary btn-sm me-3">
              <i className="fas fa-download me-1"></i> Download Report
            </button>
            <div className="user-avatar">
              <img src="/api/placeholder/40/40" alt="User" className="rounded-circle" />
            </div>
          </div>
        </div>
  
        {/* Key Metrics */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Total Enrollments</span>
                  <i className="fas fa-users text-primary"></i>
                </div>
                <h3 className="mb-1">$45,231.89</h3>
                <span className="badge bg-success small">+201% from last month</span>
              </div>
            </div>
          </div>
  
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Course Completions</span>
                  <i className="fas fa-graduation-cap text-info"></i>
                </div>
                <h3 className="mb-1">+2350</h3>
                <span className="badge bg-success small">+180.1% from last month</span>
              </div>
            </div>
          </div>
  
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">New Students</span>
                  <i className="fas fa-user-plus text-warning"></i>
                </div>
                <h3 className="mb-1">+12,234</h3>
                <span className="badge bg-success small">+19% from last month</span>
              </div>
            </div>
          </div>
  
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Active Now</span>
                  <i className="fas fa-circle text-success"></i>
                </div>
                <h3 className="mb-1">+573</h3>
                <span className="badge bg-success small">+201 since last hour</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Charts */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <h6 className="m-0">Enrollment Over Time</h6>
                <div className="dropdown">
                  <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                    Last 7 days <i className="fas fa-chevron-down ms-1"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                {/* Placeholder for chart */}
                <div style={{ height: "200px", background: "#f9f9f9" }}></div>
              </div>
            </div>
          </div>
  
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                <h6 className="m-0">Courses by Category</h6>
                <div className="dropdown">
                  <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                    This Month <i className="fas fa-chevron-down ms-1"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                {/* Placeholder for chart */}
                <div style={{ height: "200px", background: "#f9f9f9" }}></div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Recent Student Activity */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
            <h6 className="m-0">Recent Course Completions</h6>
            <a href="#" className="text-decoration-none">View All</a>
          </div>
          <div className="card-body p-0">
            <ul className="list-group list-group-flush">
              <li className="list-group-item px-4 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <img src="/api/placeholder/40/40" alt="Student" className="rounded-circle" />
                    </div>
                    <div>
                      <h6 className="mb-0">John Cooper</h6>
                      <small className="text-muted">johncooper@example.com</small>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-success fw-bold">+$1,999.00</div>
                    <small className="text-muted">Mar 14, 2025</small>
                  </div>
                </div>
              </li>
  
              <li className="list-group-item px-4 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <img src="/api/placeholder/40/40" alt="Student" className="rounded-circle" />
                    </div>
                    <div>
                      <h6 className="mb-0">Sarah Miller</h6>
                      <small className="text-muted">sarah@example.com</small>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-success fw-bold">+$39.00</div>
                    <small className="text-muted">Mar 12, 2025</small>
                  </div>
                </div>
              </li>
  
              <li className="list-group-item px-4 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <img src="/api/placeholder/40/40" alt="Student" className="rounded-circle" />
                    </div>
                    <div>
                      <h6 className="mb-0">Alex Johnson</h6>
                      <small className="text-muted">alex@example.com</small>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-success fw-bold">+$299.00</div>
                    <small className="text-muted">Mar 11, 2025</small>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }



export default AdminPortal;