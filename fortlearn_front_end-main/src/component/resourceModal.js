import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ResourceSpecializationModal = ({ trigger, onSave }) => {
  const [modalInstance, setModalInstance] = useState(null);
  const [resources, setResources] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create modal reference
  const modalRef = React.useRef(null);

  // Initialize modal
  useEffect(() => {
    if (modalRef.current) {
      const modal = new Modal(modalRef.current);
      setModalInstance(modal);
    }
  }, []);

  // Handle modal open
  const handleShow = () => {
    setIsLoading(true);
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3000/resource/all', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log('data from the user', data)
        setResources(data.result);
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  };

  // Toggle resource selection
  const toggleResourceSelection = (resource) => {
    setSelectedResources(prev => 
      prev.some(r => r._id === resource._id)
        ? prev.filter(r => r._id !== resource._id)
        : [...prev, resource]
    );
  };

  // Save selected resources
  const handleSave = async () => {
    try {
        const token = localStorage.getItem('authToken');

      const response = await fetch('http://localhost:3000/userResources/assignResource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ resources: selectedResources })
      });
  
      const data = await response.json();
  
      if (data.assignedResources.length > 0) {
        // Successfully added resources
        onSave(data.assignedResources);
      }
  
      if (data.failedResources.length > 0) {
        // Show which resources were not added
        const failedResourceNames = data.failedResources
          .map(failed => failed.reason)
          .join(', ');
        
        // Optional: show a toast or alert about failed resources
        alert(`please add new resources`);
      }
    } catch (error) {
      console.error('Error saving resources:', error);
    }
  };

  // Render trigger with click handler
  const renderTrigger = () => {
    return React.cloneElement(trigger, { 
      'data-bs-toggle': 'modal',
      'data-bs-target': '#resourceModal',
      onClick: handleShow
    });
  };

  return (
    <>
      {renderTrigger()}

      <div 
        ref={modalRef} 
        className="modal fade" 
        id="resourceModal" 
        tabIndex="-1" 
        aria-labelledby="resourceModalLabel" 
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="resourceModalLabel">
                Add Resource Specialization
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {isLoading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="row g-3">
                  {resources.map((resource) => (
                    <div key={resource._id} className="col-md-4">
                      <div 
                        className={`card cursor-pointer ${
                          selectedResources.some(r => r._id === resource._id) 
                            ? 'border-primary' 
                            : ''
                        }`}
                        onClick={() => toggleResourceSelection(resource)}
                      >
                        <div className="card-body">
                          <h5 className="card-title">{resource.name}</h5>
                          <p className="card-text text-muted">{resource.description}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="badge bg-warning">{resource.level}</span>
                            <div className="form-check">
                              <input 
                                type="checkbox" 
                                className="form-check-input" 
                                checked={selectedResources.some(r => r._id === resource._id)}
                                onChange={() => toggleResourceSelection(resource)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleSave}
                disabled={selectedResources.length === 0}
              >
                Save ({selectedResources.length} selected)
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourceSpecializationModal;