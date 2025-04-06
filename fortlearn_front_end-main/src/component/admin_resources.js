import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminCoursesDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [initialCourses, setInitialCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(7);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    category: '',
    levelClass: '',
    type: '',
    resourceLink: ''
  });
  const [updateResource, setUpdateResource] = useState({
    _id: '',
    title: '',
    description: '',
    category: '',
    levelClass: '',
    type: '',
    resourceLink: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [updateFormSubmitting, setUpdateFormSubmitting] = useState(false);
  const [updateFormError, setUpdateFormError] = useState(null);
  const [updateFormSuccess, setUpdateFormSuccess] = useState(false);
  
  // Fetch data from the API endpoint
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:3000/resource/all');
      
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
    fetchCourses();
  }, [formSuccess, updateFormSuccess]);

  // Delete course function
  const deleteCourse = async (id) => {
    try {
       await fetch(`http://localhost:3000/resource/${id}`, {
        method: 'DELETE',
      
      }).then((response) => {   
        fetchCourses()
          console.error('Error deleting resource:', response);
  
      })
    } catch (error) {
      console.error('Error deleting resource:', error);
      setError('Failed to delete resource. Please try again later.');
      }
  }

  // Update course function - opens the modal with resource data
  const openUpdateForm = (course) => {
    setUpdateResource({
      _id: course._id,
      title: course.title,
      description: course.description,
      category: course.category,
      levelClass: course.levelClass,
      type: course.type,
      resourceLink: course.resourceLink
    });
    setUpdateFormError(null);
    setUpdateFormSuccess(false);
    setShowUpdateForm(true);
  };

  // Get unique categories, types and levels for filters
  const categories = [...new Set(initialCourses.map(course => course.category))];
  const levels = [...new Set(initialCourses.map(course => course.levelClass))];
  const types = [...new Set(initialCourses.map(course => course.type).filter(Boolean))];

  // Handle search and filters
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
    applyFilters(event.target.value, filterCategory, filterLevel);
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
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewResource({
      ...newResource,
      [name]: value
    });
    // Clear form error when user changes input
    if (formError) setFormError(null);
  };

  // Handle update resource form input changes
  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateResource({
      ...updateResource,
      [name]: value
    });
    // Clear form error when user changes input
    if (updateFormError) setUpdateFormError(null);
  };

  // Set sample data for quick testing
  const setSampleData = () => {
    setNewResource({
      description: "Learn how to investigate cybersecurity incidents and enhance defense strategies.",
      levelClass: "beginner",
      category: "Hacking",
      title: "The Art of Investigation (Defense SOC Analyst)",
      type: "Video course",
      resourceLink: "https://lnkd.in/gFd8x57P"
    });
  };

  // Handle form submission for new resource
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:3000/resource/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResource)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server responded with status code: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Show success state
      setFormSuccess(true);
      
      // Reset form
      setNewResource({
        title: '',
        description: '',
        category: '',
        levelClass: '',
        type: '',
        resourceLink: ''
      });
      
      // Close form after short delay to show success message
      setTimeout(() => {
        setShowCreateForm(false);
        setFormSuccess(false);
      }, 1500);
      
    } catch (error) {
      setFormError(`Failed to create resource: ${error.message}`);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handle form submission for update resource
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateFormSubmitting(true);
    setUpdateFormError(null);
    
    try {
      const response = await fetch(`http://127.0.0.1:3000/resource/${updateResource._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateResource)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server responded with status code: ${response.status}`);
      }
      
      await response.json();
      
      // Show success state
      setUpdateFormSuccess(true);
      
      // Refresh the courses list
      fetchCourses();
      
      // Close form after short delay to show success message
      setTimeout(() => {
        setShowUpdateForm(false);
        setUpdateFormSuccess(false);
      }, 1500);
      
    } catch (error) {
      setUpdateFormError(`Failed to update resource: ${error.message}`);
    } finally {
      setUpdateFormSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-2">Loading courses...</span>
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
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">Course Resources</h5>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreateForm(true)}
                >
                  <i className="fas fa-plus me-2"></i>
                  Create Resource
                </button>
              </div>
              
              {/* Create Resource Form Modal */}
              {showCreateForm && (
                <div className="modal d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Create New Resource</h5>
                        <button 
                          type="button" 
                          className="btn-close" 
                          onClick={() => setShowCreateForm(false)}
                          disabled={formSubmitting}
                        ></button>
                      </div>
                      <div className="modal-body">
                        {formError && (
                          <div className="alert alert-danger" role="alert">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            {formError}
                          </div>
                        )}
                        
                        {formSuccess && (
                          <div className="alert alert-success" role="alert">
                            <i className="fas fa-check-circle me-2"></i>
                            Resource created successfully!
                          </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              id="title" 
                              name="title"
                              value={newResource.title}
                              onChange={handleFormChange}
                              required
                              disabled={formSubmitting}
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea 
                              className="form-control" 
                              id="description" 
                              name="description"
                              value={newResource.description}
                              onChange={handleFormChange}
                              rows="3"
                              required
                              disabled={formSubmitting}
                            ></textarea>
                          </div>
                          
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="category" className="form-label">Category</label>
                              <select 
                                className="form-select" 
                                id="category" 
                                name="category"
                                value={newResource.category}
                                onChange={handleFormChange}
                                required
                                disabled={formSubmitting}
                              >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                                <option value="Hacking">Hacking</option>
                                <option value="new">+ Add New Category</option>
                              </select>
                            </div>
                            
                            <div className="col-md-6">
                              <label htmlFor="levelClass" className="form-label">Level</label>
                              <select 
                                className="form-select" 
                                id="levelClass" 
                                name="levelClass"
                                value={newResource.levelClass}
                                onChange={handleFormChange}
                                required
                                disabled={formSubmitting}
                              >
                                <option value="">Select Level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <label htmlFor="type" className="form-label">Resource Type</label>
                            <select 
                              className="form-select" 
                              id="type" 
                              name="type"
                              value={newResource.type}
                              onChange={handleFormChange}
                              required
                              disabled={formSubmitting}
                            >
                              <option value="">Select Type</option>
                              {types.length > 0 && types.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                              <option value="Video course">Video course</option>
                              <option value="Tutorial">Tutorial</option>
                              <option value="Documentation">Documentation</option>
                              <option value="Article">Article</option>
                              <option value="Book">Book</option>
                              <option value="Tool">Tool</option>
                            </select>
                          </div>
                          
                          <div className="mb-3">
                            <label htmlFor="resourceLink" className="form-label">Resource URL</label>
                            <input 
                              type="url" 
                              className="form-control" 
                              id="resourceLink" 
                              name="resourceLink"
                              value={newResource.resourceLink}
                              onChange={handleFormChange}
                              placeholder="https://example.com"
                              required
                              disabled={formSubmitting}
                            />
                          </div>
                          
                          <div className="modal-footer d-flex justify-content-between">
                            <button 
                              type="button" 
                              className="btn btn-secondary" 
                              onClick={setSampleData}
                              disabled={formSubmitting}
                            >
                              <i className="fas fa-fill-drip me-1"></i>
                              Fill Sample Data
                            </button>
                            
                            <div>
                              <button 
                                type="button" 
                                className="btn btn-outline-secondary me-2" 
                                onClick={() => setShowCreateForm(false)}
                                disabled={formSubmitting}
                              >
                                Cancel
                              </button>
                              <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={formSubmitting}
                              >
                                {formSubmitting ? (
                                  <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Saving...
                                  </>
                                ) : (
                                  <>
                                    <i className="fas fa-save me-2"></i>
                                    Save Resource
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Update Resource Form Modal */}
              {showUpdateForm && (
                <div className="modal d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Update Resource</h5>
                        <button 
                          type="button" 
                          className="btn-close" 
                          onClick={() => setShowUpdateForm(false)}
                          disabled={updateFormSubmitting}
                        ></button>
                      </div>
                      <div className="modal-body">
                        {updateFormError && (
                          <div className="alert alert-danger" role="alert">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            {updateFormError}
                          </div>
                        )}
                        
                        {updateFormSuccess && (
                          <div className="alert alert-success" role="alert">
                            <i className="fas fa-check-circle me-2"></i>
                            Resource updated successfully!
                          </div>
                        )}
                        
                        <form onSubmit={handleUpdateSubmit}>
                          <div className="mb-3">
                            <label htmlFor="updateTitle" className="form-label">Title</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              id="updateTitle" 
                              name="title"
                              value={updateResource.title}
                              onChange={handleUpdateFormChange}
                              required
                              disabled={updateFormSubmitting}
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label htmlFor="updateDescription" className="form-label">Description</label>
                            <textarea 
                              className="form-control" 
                              id="updateDescription" 
                              name="description"
                              value={updateResource.description}
                              onChange={handleUpdateFormChange}
                              rows="3"
                              required
                              disabled={updateFormSubmitting}
                            ></textarea>
                          </div>
                          
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="updateCategory" className="form-label">Category</label>
                              <select 
                                className="form-select" 
                                id="updateCategory" 
                                name="category"
                                value={updateResource.category}
                                onChange={handleUpdateFormChange}
                                required
                                disabled={updateFormSubmitting}
                              >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                                <option value="Hacking">Hacking</option>
                                <option value="new">+ Add New Category</option>
                              </select>
                            </div>
                            
                            <div className="col-md-6">
                              <label htmlFor="updateLevelClass" className="form-label">Level</label>
                              <select 
                                className="form-select" 
                                id="updateLevelClass" 
                                name="levelClass"
                                value={updateResource.levelClass}
                                onChange={handleUpdateFormChange}
                                required
                                disabled={updateFormSubmitting}
                              >
                                <option value="">Select Level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <label htmlFor="updateType" className="form-label">Resource Type</label>
                            <select 
                              className="form-select" 
                              id="updateType" 
                              name="type"
                              value={updateResource.type}
                              onChange={handleUpdateFormChange}
                              required
                              disabled={updateFormSubmitting}
                            >
                              <option value="">Select Type</option>
                              {types.length > 0 && types.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                              <option value="Video course">Video course</option>
                              <option value="Tutorial">Tutorial</option>
                              <option value="Documentation">Documentation</option>
                              <option value="Article">Article</option>
                              <option value="Book">Book</option>
                              <option value="Tool">Tool</option>
                            </select>
                          </div>
                          
                          <div className="mb-3">
                            <label htmlFor="updateResourceLink" className="form-label">Resource URL</label>
                            <input 
                              type="url" 
                              className="form-control" 
                              id="updateResourceLink" 
                              name="resourceLink"
                              value={updateResource.resourceLink}
                              onChange={handleUpdateFormChange}
                              placeholder="https://example.com"
                              required
                              disabled={updateFormSubmitting}
                            />
                          </div>
                          
                          <div className="modal-footer">
                            <button 
                              type="button" 
                              className="btn btn-outline-secondary me-2" 
                              onClick={() => setShowUpdateForm(false)}
                              disabled={updateFormSubmitting}
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              className="btn btn-primary"
                              disabled={updateFormSubmitting}
                            >
                              {updateFormSubmitting ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                  Updating...
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-save me-2"></i>
                                  Update Resource
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Search and Filters */}
              <div className="row mb-4 g-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="d-flex g-2">
                    <select 
                      className="form-select me-2" 
                      value={filterCategory}
                      onChange={(e) => handleCategoryFilter(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    
                    <select 
                      className="form-select me-2" 
                      value={filterLevel}
                      onChange={(e) => handleLevelFilter(e.target.value)}
                    >
                      <option value="">All Levels</option>
                      {levels.map(level => (
                        <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                      ))}
                    </select>
                    
                    <button 
                      onClick={resetFilters}
                      className="btn btn-outline-secondary"
                    >
                      <i className="fas fa-sync-alt me-1"></i> Reset
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Courses Table */}
              <div className="table-responsive">
                <table className="table table-hover table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>Course</th>
                      <th>Category</th>
                      <th>Level</th>
                      <th>Type</th>
                      <th>Date Added</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.length > 0 ? (
                      currentRecords.map(course => (
                        <tr key={course._id}>
                          <td>
                            <div className="fw-bold">{course.title}</div>
                            <div className="text-muted small">{course.description}</div>
                          </td>
                          <td>
                            <span className="badge bg-secondary">
                              {course.category}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${levelBadgeClasses[course.levelClass] || "bg-secondary"}`}>
                              {course.levelClass ? (course.levelClass.charAt(0).toUpperCase() + course.levelClass.slice(1)) : "Unknown"}
                            </span>
                          </td>
                          <td>
                            {course.type ? (
                              <span className="badge bg-info text-dark">
                                {course.type}
                              </span>
                            ) : (
                              <span className="text-muted small">—</span>
                            )}
                          </td>
                          <td>
                            <div className="small">
                              <i className="far fa-calendar-alt me-1"></i>
                              {formatDate(course.date_created)}
                            </div>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <a 
                                href={course.resourceLink} 
                                className="btn btn-outline-primary" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                title="Open resource"
                              >
                                <i className="fas fa-external-link-alt"></i>
                              </a>
                              <button 
                                className="btn btn-outline-success"
                                title="Edit course"
                                onClick={() => openUpdateForm(course)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                className="btn btn-outline-danger"
                                title="Delete course"
                                onClick={()=> deleteCourse(course._id)}
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
                          No courses found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="small text-muted">
                  Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, courses.length)} of {courses.length} courses
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
                        className = "page-link" 
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

export default AdminCoursesDashboard;