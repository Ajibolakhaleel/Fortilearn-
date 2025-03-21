import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Resourcespage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Fetch resources from API when component mounts
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await fetch('http://localhost:3000/resource/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch resources');
                }
                const data = await response.json();
                setResources(data.result);
                setFilteredResources(data.result); // Set filtered resources to all resources by default
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchResources();
    }, []);
    
    // Handle search and filter whenever searchQuery or specialization changes
    useEffect(() => {
        if (resources.length > 0) {
            let results = [...resources];
            
            // Apply search filter
            if (searchQuery.trim() !== '') {
                results = results.filter(resource => 
                    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            
            // Apply specialization filter
            if (specialization !== '') {
                results = results.filter(resource => 
                    resource.type === specialization || 
                    resource.category === specialization
                );
            }
            
            setFilteredResources(results);
        }
    }, [searchQuery, specialization, resources]);
    
    const handleSearch = (e) => {
        e.preventDefault();
        // Filtering is already handled by the useEffect
    };

    // Function to get appropriate icon based on resource type
    const getIconClass = (type) => {
        const iconMap = {
            'Video Course': 'fas fa-video',
            'Article': 'fas fa-file-alt',
            'Interactive Lab': 'fas fa-flask',
            'Webinar': 'fas fa-laptop',
            'Podcast': 'fas fa-microphone',
            'eBook': 'fas fa-book',
            'Tool': 'fas fa-tools'
        };
        return iconMap[type] || 'fas fa-file';
    };

    // Function to get appropriate badge class based on level
    const getLevelClass = (level) => {
        const levelMap = {
            'Beginner': 'badge-beginner',
            'Intermediate': 'badge-intermediate',
            'Advanced': 'badge-advanced'
        };
        return levelMap[level] || 'badge-beginner';
    };

    // Display content based on loading/error state
    const renderContent = () => {
        if (loading) {
            return <div className="text-center py-5"><i className="fas fa-spinner fa-spin fa-2x"></i></div>;
        }
        
        if (error) {
            return (
                <div className="alert alert-danger" role="alert">
                    Error loading resources: {error}. Please try again later.
                </div>
            );
        }
        
        if (filteredResources.length === 0) {
            return <div className="alert alert-info">No resources match your search criteria.</div>;
        }

        return (
            <div className="row g-4">
                {filteredResources.map(resource => (
                    <div className="col-md-4" key={resource._id} onClick={() => window.open(resource.resourceLink || '#', '_blank')} style={{ cursor: 'pointer' }}>
                        <div className="card resource-card h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="d-flex align-items-center">
                                        <i className={`${resource.icon || getIconClass(resource.type)} text-primary me-2`}></i>
                                        <span className="text-muted small">{resource.type}</span>
                                    </div>
                                    <i className="far fa-bookmark bookmark-icon"></i>
                                </div>
                                <h5 className="card-title">{resource.title}</h5>
                                <p className="card-text text-muted">{resource.description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className={`badge ${resource.levelClass || getLevelClass(resource.level)} rounded-pill px-3 py-2`}>
                                        {resource.level}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

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
                                                <option value="Hacking">Hacking Materials</option>
                                                <option value="GRC">GRC <small>Governance, Risk, and Compliance</small></option>
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
    
            {/* Resources Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="fw-bold mb-4">
                        {searchQuery || specialization ? 'Search Results' : 'All Resources'}
                    </h2>
                    {renderContent()}
                </div>
            </section>
        </div>
    );
};

export default Resourcespage;