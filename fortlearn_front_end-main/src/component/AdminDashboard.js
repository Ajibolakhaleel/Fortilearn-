import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';

const UserDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('resources');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  useEffect(() => {
      try {
        setLoading(true);
        
        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then((json) => {
          setUserData(json.result)}
        ).catch(error => console.error(error));

        // fetch user resources
        fetch('http://localhost:3000/resource/all')
        .then(response => response.json())
        .then((json) => {
          console.log('data from the db',json)
          setResources(json.result)}
        ).catch(error => console.error(error));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
 
  }, []);


  // Chart data transformations
  const getCategoryDistribution = () => {
    if (!resources.length) return [];
    
    const categories = {};
    resources.forEach(resource => {
      if (categories[resource.category]) {
        categories[resource.category]++;
      } else {
        categories[resource.category] = 1;
      }
    });
    
    return Object.keys(categories).map(category => ({
      name: category,
      value: categories[category]
    }));
  };

  const getResourcesByType = () => {
    if (!resources.length) return [];
    
    const types = {};
    resources.forEach(resource => {
      if (types[resource.type]) {
        types[resource.type]++;
      } else {
        types[resource.type] = 1;
      }
    });
    
    return Object.keys(types).map(type => ({
      name: type,
      count: types[type]
    }));
  };

  const getResourcesByLevel = () => {
    if (!resources.length) return [];
    
    const levels = {};
    resources.forEach(resource => {
      if (levels[resource.levelClass]) {
        levels[resource.levelClass]++;
      } else {
        levels[resource.levelClass] = 1;
      }
    });
    
    return Object.keys(levels).map(level => ({
      name: level,
      count: levels[level]
    }));
  };

  const getResourceCreationTimeline = () => {
    if (!resources.length) return [];
    
    // Group resources by month
    const monthlyData = {};
    resources.forEach(resource => {
      const date = new Date(resource.date_created);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (monthlyData[monthYear]) {
        monthlyData[monthYear]++;
      } else {
        monthlyData[monthYear] = 1;
      }
    });
    
    // Convert to array sorted by date
    return Object.keys(monthlyData)
      .map(key => {
        const [month, year] = key.split('/');
        return {
          date: key,
          count: monthlyData[key],
          // For sorting
          sortValue: new Date(parseInt(year), parseInt(month) - 1)
        };
      })
      .sort((a, b) => a.sortValue - b.sortValue)
      .map(({ date, count }) => ({ date, count }));
  };

  const getEnrolledVsAvailableResources = () => {
    if (!userData || !resources.length) return [];
    
    const enrolledCount = userData.enrolledResources.length;
    const totalCount = resources.length;
    
    return [
      { name: "Enrolled", value: enrolledCount },
      { name: "Not Enrolled", value: totalCount - enrolledCount }
    ];
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3 fs-5">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="container-fluid p-5 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="m-0">Welcome back, Professor { userData.username }</h3>
          <div className="d-flex align-items-center">
            {/* <button className="btn btn-outline-secondary btn-sm me-3">
              <i className="fas fa-download me-1"></i> Download Report
            </button> */}
            {/* <div className="user-avatar">
              <img src="/api/placeholder/40/40" alt="User" className="rounded-circle" />
            </div> */}
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
                <h3 className="mb-1">{userData?.length}</h3>
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
                <h3 className="mb-1">+{resources?.length}</h3>
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
                <h3 className="mb-1">+{userData?.length}</h3>
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
                <h3 className="mb-1">+{userData?.length}</h3>
                <span className="badge bg-success small">+11 since last hour</span>
              </div>
            </div>
          </div>
        </div>
  

      

      {/* Tabs Navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
        </li>
      </ul>

      {/* Dashboard Content */}
      <div className="row g-4">
        {activeTab === 'resources' && (
          <>
            {/* Resources by Category */}
            <div className="col-12 col-md-6">
              <div className="card shadow h-100">
                <div className="card-body">
                  <h2 className="card-title h5 mb-3">Resources by Category</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                    <Pie
                    data={getCategoryDistribution()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {getCategoryDistribution().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Resources by Type */}
            <div className="col-12 col-md-6">
              <div className="card shadow h-100">
                <div className="card-body">
                  <h2 className="card-title h5 mb-3">Resources by Type</h2>
                  <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getResourcesByType()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Resources by Level */}
            <div className="col-12">
              <div className="card shadow h-100">
                <div className="card-body">
                  <h2 className="card-title h5 mb-3">Resources by Level</h2>
                  <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getResourcesByLevel()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;