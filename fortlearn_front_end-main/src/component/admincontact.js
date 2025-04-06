import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminUsersDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [initialCourses, setInitialCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(7);

  
  // Fetch data from the API endpoint
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/resource/allcontacts');
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const data = await response.json();
      setInitialCourses(data.result);
      setCourses(data.result);
      setLoading(false);
    } catch (err) {
      setError(`Failed to fetch courses: ${err.message}`);
      setLoading(false);
    }
  };
  useEffect(() => {
  

    fetchUsers();
  }, []);


const deleteuser = async (id) => {
  try {
     await fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
    
    }).then((response) => {   
      fetchUsers()
        console.error('Error deleting resource:', response);

    })
  } catch (error) {
    console.error('Error deleting resource:', error);
    setError('Failed to delete resource. Please try again later.');
    }
}

  // Handle search and filters
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
    applyFilters(event.target.value);
  };

  const handleCategoryFilter = (category) => {
    setFilterCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
    applyFilters(searchTerm, category, filterLevel);
  };

  const handleLevelFilter = (level) => {
    setFilterLevel(level);
    setCurrentPage(1); // Reset to first page when filtering
    applyFilters(searchTerm, filterCategory, level);
  };

  const applyFilters = (search, category, level) => {
    let filtered = initialCourses;
    
    if (search) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(course => course.category === category);
    }
    
    if (level) {
      filtered = filtered.filter(course => course.levelClass === level);
    }
    
    setCourses(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilterLevel("");
    setCurrentPage(1); // Reset to first page when clearing filters
    setCourses(initialCourses);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Level badge class mapping - Bootstrap classes
  const levelBadgeClasses = {
    beginner: "bg-success",
    intermediate: "bg-primary",
    advanced: "bg-danger"
  };

  // Get current records for pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = courses.slice(indexOfFirstRecord, indexOfLastRecord);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Calculate total pages
  const totalPages = Math.ceil(courses.length / recordsPerPage);

  // Handle new resource form input changes


  // Set sample data for quick testing


  // Handle form submission
 
  if (loading) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-2">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 bg-light w-100vw">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-12">
          <div className="card shadow-sm">
            <div className="card-body">
              {/* Header with Create Button */}
         
              
              {/* Create Resource Form Modal */}
          
              
              {/* Search and Filters */}
              <div className="row mb-4 g-3">
                <div className="col-md-6">
               
                </div>
                
                <div className="col-md-6">
              
                </div>
              </div>
              
              {/* Courses Table */}
              <div className="table-responsive">
                <table className="table table-hover table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>User Name</th>
                      <th>Specialization</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.length > 0 ? (
                      currentRecords.map(course => (
                        <tr key={course._id}>
                          <td>
                            <div className="fw-bold">{course.username}</div>
                            <div className="text-muted small">{course.email}</div>
                          </td>
                          <td>
                            <span className="badge bg-secondary">
                              {course.specialisation}
                            </span>
                          </td>
                        
                         
                          
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-danger"
                                title="Delete course"
                                onClick={() => deleteuser(course._id)} 
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          <i className="fas fa-info-circle me-2"></i>
                          No Users found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="small text-muted">
                  Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, courses.length)} of {courses.length} users
                </div>
                <nav>
                  <ul className="pagination pagination-sm">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <a 
                        className="page-link" 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) paginate(currentPage - 1);
                        }}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </a>
                    </li>
                    
                    {Array.from({ length: totalPages }, (_, i) => {
                      // Show limited page numbers with ellipsis
                      if (
                        i === 0 || // First page
                        i === totalPages - 1 || // Last page
                        (i >= currentPage - 2 && i <= currentPage + 0) // Pages around current
                      ) {
                        return (
                          <li 
                            key={i} 
                            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                          >
                            <a 
                              className="page-link" 
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                paginate(i + 1);
                              }}
                            >
                              {i + 1}
                            </a>
                          </li>
                        );
                      }
                      return null;
                    }).filter(Boolean)}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <a 
                        className="page-link" 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) paginate(currentPage + 1);
                        }}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersDashboard;